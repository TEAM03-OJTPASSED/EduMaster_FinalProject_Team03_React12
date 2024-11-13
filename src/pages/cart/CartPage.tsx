import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";

import { useCustomNavigate } from "../../hooks/customNavigate";
import DynamicBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import MyCart from "../../components/cartTabs/MyCart";
import PurchasedOrders from "../../components/cartTabs/PurchasedCart";
import CancelledOrders from "../../components/cartTabs/CancelledCart";
import { Cart, CartItem, CartStatusEnum, SearchCartByStatus } from "../../models/Cart.model";
import CartService from "../../services/cart.service";
import CheckoutPage from "../checkout/CheckoutPage";
import { handleNotify } from "../../utils/handleNotify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { fetchCartCount } from "../../redux/slices/cartSlice";

const CartPage: React.FC = () => {
  const navigate = useCustomNavigate();
  const routerNavigate = useNavigate();  
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [cartStatus, setCartStatus] = useState<string>(location.pathname.replace('/cart/',''));
  const [selectedCarts, setSelectedCarts] = useState<CartItem[]>([]); 
  const [carts, setCarts] = useState<Cart[]>([]);

  const initialCartSearchParams = (cartStatus: CartStatusEnum): SearchCartByStatus => ({
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
    searchCondition: {
      keyword: "",
      category_id: "",
      status: cartStatus,
      is_deleted: false,
    }
  });

  const fetchCart = async (refetch?: boolean) => {
    setIsLoading(!refetch && true);
    try {
      const status = cartStatus as CartStatusEnum;
      const response = await CartService.getCartsByStatus(initialCartSearchParams(status));
      setCarts(response.data?.pageData || []);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCheckout = async () => {
    if (selectedCarts.length > 0) {
      const response = await CartService.updateStatusCart({
        status: CartStatusEnum.WAITING_PAID,
        items: selectedCarts.map(cartItem => ({ _id: cartItem._id, cart_no: cartItem.cart_no } as CartItem))
      });
      if (response) {
        handleNotify("Added To Awaiting", "Your cart item(s) are awaiting payment.");
        fetchCart();
        dispatch(fetchCartCount());
      }
    }
  };

  const handleRemoveCart = async (cartItem: CartItem) => {    
    setCarts(carts.filter((cart) => cart._id !== cartItem._id)) 
    handleNotify("Course Removed", "Check out some others.");
    const response = await CartService.deleteCart(cartItem._id);
    if (response) dispatch(fetchCartCount());
  };

  const handleRepurchaseCart = async (cartItem: CartItem) => {     
    const response = await CartService.updateStatusCart({
      status: CartStatusEnum.WAITING_PAID,
      items: [cartItem]
    });    
    if (response) handleNotify("Added To Awaiting", "Your cart item(s) are awaiting payment.");
    fetchCart();
  };

  const handleCheckout = async () => {     
    const response = await CartService.updateStatusCart({
      status: CartStatusEnum.COMPLETED,
      items: carts
    });    
    if (response) {
      handleNotify("Your order was placed successfully", "Happy studying! A copy of the receipt will be sent to your email shortly.");
      fetchCart();
      navigate('/cart/completed');
    }
  };

  const handleCancelCart = async (cartItem: CartItem) => {     
    const response = await CartService.updateStatusCart({
      status: CartStatusEnum.CANCEL,
      items: [cartItem]
    });
    if (response) handleNotify("Cancelled Payment for selected course", "You can still find this course in the cancelled payment tab.");
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, [cartStatus]);

  useEffect(() => {
    // Update URL with cart status after `/cart/`
    routerNavigate(`/cart/${cartStatus.toLowerCase()}`);
  }, [cartStatus, routerNavigate]);

  const toggleSelectCart = (cartItem: CartItem) => {
    if (selectedCarts.some((selectedCart) => selectedCart._id === cartItem._id)) {
      setSelectedCarts(selectedCarts.filter((selectedCart) => selectedCart._id !== cartItem._id));
    } else {
      setSelectedCarts([...selectedCarts, cartItem]);
    }
  };

  const total = carts
    .filter((cart) => selectedCarts.some((selectedCart) => selectedCart._id === cart._id))
    .reduce((sum, cart) => sum + cart.price * (1 - (cart.discount / 100)), 0);
  
  return (
    <div className="container mx-auto px-4 py-8 font-jost min-h-screen">
      <DynamicBreadcrumb />
      <Tabs 
        defaultActiveKey={cartStatus}
        className="custom-tabs font-jost"
        onChange={(e) => {
          setCarts([]);
          setCartStatus(e);
        }}
        items={[
          {
            key: CartStatusEnum.NEW,
            label: 'My Cart',
            children: (
              <MyCart
                isLoading={isLoading} 
                carts={carts} 
                navigate={navigate} 
                removeCart={handleRemoveCart} 
                selectedCarts={selectedCarts} 
                toggleSelectCart={toggleSelectCart} 
                total={total}
                onCheckOut={handleAddToCheckout}
              />
            ),
          },
          {
            key: CartStatusEnum.WAITING_PAID,
            label: 'Awaiting Payment',
            children: (
              <CheckoutPage 
                carts={carts} 
                cancelCart={handleCancelCart}
                checkout={handleCheckout}
              />
            ),
          },
          {
            key: CartStatusEnum.COMPLETED,
            label: 'Purchased',
            children: (
              <PurchasedOrders 
                carts={carts} 
                navigate={navigate} 
                total={total} 
              />
            ),
          },
          {
            key: CartStatusEnum.CANCEL,
            label: 'Cancelled',
            children: (
              <CancelledOrders 
                removeCart={handleRemoveCart}
                repurchaseCart={handleRepurchaseCart}
                carts={carts} 
                navigate={navigate} 
                total={total} 
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default CartPage;

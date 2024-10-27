import CART_API from "../constants/api/cart"
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model"
import { Cart, CartStatusUpdate, SearchCartByStatus } from "../models/Cart.model"
import { deleteRequest, postRequest, putRequest } from "./httpsMethod"

const CartService = {
    createCart(cartId: string):  Promise<ApiResponse>{
        return postRequest(CART_API.CREATE_CART, cartId)
    },
    getCartByStatus(params: SearchCartByStatus):  Promise<ApiResponse<APIResponseData<Cart>>> {
        return postRequest(CART_API.SEARCH_CART, params)
    },
    updateStatusCart(params: CartStatusUpdate):  Promise<ApiResponse> {
        return putRequest(CART_API.UPDATE_CART_STATUS, params)
    },
    deleteCart(cartId: string):  Promise<ApiResponse> {
        return deleteRequest(CART_API.DELETE_CART(cartId))
    }   
}
     



export default CartService
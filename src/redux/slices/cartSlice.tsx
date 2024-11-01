// cartSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message, notification } from 'antd';
import { Course } from '../../models/Course.model';
import CartService from '../../services/cart.service';
import { CartStatusEnum, SearchCartByStatus } from '../../models/Cart.model';

interface CartState {
  cartCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartCount: 0,
  loading: false,
  error: null,
};

// Async thunk for adding to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ course, userRole, navigate }: { course: Course; userRole: string; navigate: any }, { rejectWithValue }) => {
      if (!userRole) {
        message.destroy();
        message.error(
          <span className="text-lg font-jost">
            You must be logged in to do this action.{' '}
            <a className="text-orange-500 underline" onClick={() => navigate('/login')}>
              Login
            </a>
          </span>
        );
        return rejectWithValue('User not logged in');
      }

      const response = await CartService.createCart(course._id);
      if (response) {
        notification.success({
          message: 'Course Added to Cart',
          description: `You have added "${course.name}" to your cart.`,
        });
        return response.data;
      }
    
  }
);

// Async thunk for fetching cart count
export const fetchCartCount = createAsyncThunk(
  'cart/fetchCartCount',
  async () => {
      const initialCartSearchParams: SearchCartByStatus = {
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
        searchCondition: {
          keyword: '',
          category_id: '',
          status: CartStatusEnum.NEW,
          is_deleted: false,
        },
      };

      const response = await CartService.getCartsAmount(initialCartSearchParams);
      return response.data?.pageData.length || 0;
    
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
        state.cartCount += 1;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch cart count
      .addCase(fetchCartCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartCount.fulfilled, (state, action) => {
        state.loading = false;
        state.cartCount = action.payload;
      })
      .addCase(fetchCartCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
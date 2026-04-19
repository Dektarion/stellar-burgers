import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import type { TOrder } from '../../utils/types';

type TOrderState = {
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null | undefined;
};

export const initialState: TOrderState = {
  orderModalData: null,
  isLoading: false,
  error: null
};

const THUNK_NAME = {
  postBurgerOrder: 'order/postOrder'
};

export const postOrder = createAsyncThunk(
  `${THUNK_NAME.postBurgerOrder}`,
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);

    return {
      ...response.order,
      ingredients
    };
  }
);

const SLICE_NAME = 'postOrderOnServer';

export const orderSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getStatus: (state) => state.isLoading,
    getModalDataOrder: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload;
      });
  }
});

export const { resetOrder } = orderSlice.actions;
export const { getStatus, getModalDataOrder } = orderSlice.selectors;

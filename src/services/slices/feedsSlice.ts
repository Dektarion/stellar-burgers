import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import type { TOrder, TOrdersData } from '../../utils/types';

type TFeedsState = {
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
  loading: boolean;
  error: string | null | undefined;
  titleNumber: number;
};

const initialState: TFeedsState = {
  orders: [],
  total: null,
  totalToday: null,
  loading: false,
  error: null,
  titleNumber: 0
};

export const getFeeds = createAsyncThunk('feeds/getAll', async () =>
  getFeedsApi()
);

const SLICE_NAME = 'feeds';

export const feedsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addTitleNumber: (state, action: PayloadAction<number>) => {
      state.titleNumber = action.payload;
    }
  },
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getTotalOrders: (state) => state.total,
    getTotalTodayOrders: (state) => state.totalToday,
    getTitleNumber: (state) => state.titleNumber,
    selectFeedLoading: (state) => state.loading,
    selectError: (state) => state.error,
    selectOrderByNumber: (state, number: number) =>
      state.orders.find((order) => order.number === number)
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const {
  getOrdersSelector,
  getTotalOrders,
  getTotalTodayOrders,
  selectFeedLoading,
  selectError,
  selectOrderByNumber,
  getTitleNumber
} = feedsSlice.selectors;

export const { addTitleNumber } = feedsSlice.actions;

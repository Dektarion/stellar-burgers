import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';
import type { TOrder } from '../../utils/types';

type TFeedsState = {
  publicOrders: TOrder[];
  userOrders: TOrder[];
  total: number | null;
  totalToday: number | null;
  isPublicOrdersloading: boolean;
  isUserOrdersloading: boolean;
  error: string | null | undefined;
  titleNumber: number;
};

export const initialState: TFeedsState = {
  publicOrders: [],
  userOrders: [],
  total: null,
  totalToday: null,
  isPublicOrdersloading: false,
  isUserOrdersloading: false,
  error: null,
  titleNumber: 0
};

const THUNK_NAME = {
  getAllFeeds: 'feeds/getAll',
  getUserFeeds: 'feeds/getUserFeeds'
};

export const getFeeds = createAsyncThunk(
  `${THUNK_NAME.getAllFeeds}`,
  async () => getFeedsApi()
);

export const getUserFeeds = createAsyncThunk(
  `${THUNK_NAME.getUserFeeds}`,
  async () => getOrdersApi()
);

const SLICE_NAME = 'feeds';

export const feedsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getPublicOrdersSelector: (state) => state.publicOrders,
    getUserOrdersSelector: (state) => state.userOrders,
    getTotalOrders: (state) => state.total,
    getTotalTodayOrders: (state) => state.totalToday,
    selectPublicFeedLoading: (state) => state.isPublicOrdersloading,
    selectError: (state) => state.error,
    selectOrderByNumber: (state, number: number) =>
      state.publicOrders.find((order) => order.number === number) ||
      state.userOrders.find((order) => order.number === number)
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isPublicOrdersloading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isPublicOrdersloading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isPublicOrdersloading = false;
        state.publicOrders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getUserFeeds.pending, (state) => {
        state.isUserOrdersloading = true;
        state.error = null;
      })
      .addCase(getUserFeeds.rejected, (state, action) => {
        state.isUserOrdersloading = false;
        state.error = action.error.message;
      })
      .addCase(getUserFeeds.fulfilled, (state, action) => {
        state.isUserOrdersloading = false;
        state.userOrders = action.payload;
      });
  }
});

export const {
  getPublicOrdersSelector,
  getUserOrdersSelector,
  getTotalOrders,
  getTotalTodayOrders,
  selectPublicFeedLoading,
  selectError,
  selectOrderByNumber
} = feedsSlice.selectors;

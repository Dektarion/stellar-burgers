import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserApi } from '../../utils/burger-api';
import type { TUser } from '../../utils/types';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null | undefined;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

const THUNK_NAME = {
  checkUser: 'user/checkUser'
};

export const getUser = createAsyncThunk(`${THUNK_NAME.checkUser}`, async () =>
  getUserApi()
);

const SLICE_NAME = 'user';

export const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getUserSelector: (state) => state.user,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    selectLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.user = action.payload.user;
      });
  }
});

export const {
  getUserSelector,
  isAuthCheckedSelector,
  selectLoading,
  selectError
} = userSlice.selectors;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';
import type { TUser } from '../../utils/types';
import type { TRegisterData, TLoginData } from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';

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
  checkUser: 'user/checkUser',
  registerUser: 'user/registerUser',
  loginUser: 'user/loginUser',
  updateUser: 'user/updateUser',
  logoutUser: 'user/logout'
};

export const getUser = createAsyncThunk(`${THUNK_NAME.checkUser}`, async () =>
  getUserApi()
);

export const registerUser = createAsyncThunk(
  `${THUNK_NAME.registerUser}`,
  async (data: TRegisterData) => {
    const userData = await registerUserApi(data);
    setCookie('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);

    return userData;
  }
);

export const loginUser = createAsyncThunk(
  `${THUNK_NAME.loginUser}`,
  async (data: TLoginData) => {
    const userData = await loginUserApi(data);
    setCookie('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);

    return userData;
  }
);

export const updateUser = createAsyncThunk(
  `${THUNK_NAME.updateUser}`,
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

const SLICE_NAME = 'user';

export const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user = null;
    }
  },
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
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      });
  }
});

const { userLogout } = userSlice.actions;

export const logoutUser = createAsyncThunk(
  `${THUNK_NAME.logoutUser}`,
  async (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear(); // очищаем refreshToken
        deleteCookie('accessToken'); // очищаем accessToken
        dispatch(userLogout()); // удаляем пользователя из хранилища
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

export const {
  getUserSelector,
  isAuthCheckedSelector,
  selectLoading,
  selectError
} = userSlice.selectors;

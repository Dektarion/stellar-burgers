import { expect, describe } from '@jest/globals';
import {
  userSlice,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  initialState
} from '../services/slices/userSlice';

const userSliceReducer = userSlice.reducer;

const expectedGetUserResult = {
  success: true,
  user: {
    email: 'moked@mokedtest.com',
    name: 'Моковое Имя'
  }
};

const expectedRegisterLoginUserResult = {
  success: true,
  accessToken: 'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV',
  refreshToken: '30d4d48a3675a0d93c75e2da35d81f3251c7feabe4c3d8',
  user: {
    email: 'moked@mokedtest.com',
    name: 'Моковое Имя'
  }
};

const expectedUpdateUserResult = {
  success: true,
  user: {
    email: 'moked23@mokedtest.com',
    name: 'Моковое Имя Три'
  }
};

describe('test userSlice async getUser actions', () => {
  it('should set loading=true on pending', () => {
    const state = userSliceReducer(undefined, getUser.pending('', undefined));

    expect(state.isLoading).toBe(true);
  });

  it('should set error and loading=false on rejected', () => {
    const error = 'somthing wrong';

    const state = userSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      getUser.rejected(new Error(error), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should store data and set loading=false on fulfilled', () => {
    const state = userSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      getUser.fulfilled(expectedGetUserResult, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(expectedGetUserResult.user);
  });
});

describe('test userSlice async registerUser actions', () => {
  it('should set loading=true on pending', () => {
    const state = userSliceReducer(
      undefined,
      registerUser.pending('', {
        email: '',
        password: '',
        name: ''
      })
    );

    expect(state.isLoading).toBe(true);
  });

  it('should set error and loading=false on rejected', () => {
    const error = 'somthing wrong';

    const state = userSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      registerUser.rejected(new Error(error), '', {
        email: '',
        password: '',
        name: ''
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should store data and set loading=false on fulfilled', () => {
    const state = userSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      registerUser.fulfilled(expectedRegisterLoginUserResult, '', {
        email: '',
        password: '',
        name: ''
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(expectedRegisterLoginUserResult.user);
  });
});

describe('test userSlice async loginUser actions', () => {
  it('should set loading=true on pending', () => {
    const state = userSliceReducer(
      undefined,
      loginUser.pending('', { email: '', password: '' })
    );

    expect(state.isLoading).toBe(true);
  });

  it('should set error and loading=false on rejected', () => {
    const error = 'somthing wrong';

    const state = userSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      loginUser.rejected(new Error(error), '', {
        email: '',
        password: ''
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should store data and set loading=false on fulfilled', () => {
    const state = userSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      loginUser.fulfilled(expectedRegisterLoginUserResult, '', {
        email: '',
        password: ''
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(expectedRegisterLoginUserResult.user);
  });
});

describe('test userSlice async updateUser actions', () => {
  it('should set loading=true on pending', () => {
    const state = userSliceReducer(
      undefined,
      updateUser.pending('', {
        email: '',
        password: '',
        name: ''
      })
    );

    expect(state.isLoading).toBe(true);
  });

  it('should set error and loading=false on rejected', () => {
    const error = 'somthing wrong';

    const state = userSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      updateUser.rejected(new Error(error), '', {
        email: '',
        password: '',
        name: ''
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should store data and set loading=false on fulfilled', () => {
    const state = userSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      updateUser.fulfilled(expectedUpdateUserResult, '', {
        email: '',
        password: ''
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(expectedUpdateUserResult.user);
  });
});

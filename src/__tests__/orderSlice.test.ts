import { expect, describe } from '@jest/globals';
import {
  orderSlice,
  postOrder,
  initialState
} from '../services/slices/orderSlice';

const orderSliceReducer = orderSlice.reducer;

const expectedOrdersResult = {
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0942',
    '643d69a5c3f7b9001cfa093c'
  ],
  _id: '69e4fbc3a641',
  status: 'done',
  name: 'Био-марсианский spicy краторный бургер',
  owner: {
    name: 'Моковое Имя',
    email: 'moked@mokedtest.com',
    createdAt: '2026-04-19T15:58:59.453Z',
    updatedAt: '2026-04-19T15:58:59.668Z'
  },
  createdAt: '2026-04-19T15:58:59.453Z',
  updatedAt: '2026-04-19T15:58:59.668Z',
  number: 666,
  price: 3024
};

describe('test orderSlice async actions', () => {
  it('should set loading=true on pending', () => {
    const state = orderSliceReducer(undefined, postOrder.pending('', []));

    expect(state.isLoading).toBe(true);
  });

  it('should set error and loading=false on rejected', () => {
    const error = 'somthing wrong';

    const state = orderSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      postOrder.rejected(new Error(error), '', [])
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should store data and set loading=false on fulfilled', () => {
    const state = orderSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      postOrder.fulfilled(expectedOrdersResult, '', [])
    );

    expect(state.isLoading).toBe(false);
    expect(state.orderModalData).toEqual(expectedOrdersResult);
  });
});

import { expect, describe } from '@jest/globals';
import {
  feedsSlice,
  getFeeds,
  getUserFeeds,
  initialState
} from '../services/slices/feedsSlice';

const feedsSliceReducer = feedsSlice.reducer;

const expectedFeedsResult = {
  success: true,
  orders: [
    {
      _id: '69e534cca64177001b333161',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2026-04-19T20:02:20.544Z',
      updatedAt: '2026-04-19T20:02:20.775Z',
      number: 104303
    },
    {
      _id: '69e5334da64177001b33315f',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Био-марсианский space флюоресцентный люминесцентный бургер',
      createdAt: '2026-04-19T19:55:57.056Z',
      updatedAt: '2026-04-19T19:55:57.329Z',
      number: 104302
    }
  ],
  total: 28297,
  totalToday: 30
};

const expectedUserFeedsResult = [
  {
    _id: '69e534cca64177001b333161',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2026-04-19T20:02:20.544Z',
    updatedAt: '2026-04-19T20:02:20.775Z',
    number: 104303
  },
  {
    _id: '69e5334da64177001b33315f',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Био-марсианский space флюоресцентный люминесцентный бургер',
    createdAt: '2026-04-19T19:55:57.056Z',
    updatedAt: '2026-04-19T19:55:57.329Z',
    number: 104302
  }
];

describe('test feedsSlice async actions', () => {
  it('should set loading=true on pending', () => {
    const state = feedsSliceReducer(undefined, getFeeds.pending('', undefined));

    expect(state.isPublicOrdersloading).toBe(true);
  });

  it('should set error and loading=false on rejected', () => {
    const error = 'somthing wrong';

    const state = feedsSliceReducer(
      {
        ...initialState,
        isPublicOrdersloading: true
      },
      getFeeds.rejected(new Error(error), '', undefined)
    );

    expect(state.isPublicOrdersloading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should store data and set loading=false on fulfilled', () => {
    const state = feedsSliceReducer(
      {
        ...initialState,
        isPublicOrdersloading: true
      },
      getFeeds.fulfilled(expectedFeedsResult, '', undefined)
    );

    expect(state.isPublicOrdersloading).toBe(false);
    expect(state.publicOrders).toEqual(expectedFeedsResult.orders);
    expect(state.total).toBe(expectedFeedsResult.total);
    expect(state.totalToday).toBe(expectedFeedsResult.totalToday);
  });
});

describe('test userFeedsSlice async actions', () => {
  it('should set loading=true on pending', () => {
    const state = feedsSliceReducer(
      undefined,
      getUserFeeds.pending('', undefined)
    );

    expect(state.isUserOrdersloading).toBe(true);
  });

  it('should set error and loading=false on rejected', () => {
    const error = 'somthing wrong';

    const state = feedsSliceReducer(
      {
        ...initialState,
        isUserOrdersloading: true
      },
      getUserFeeds.rejected(new Error(error), '', undefined)
    );

    expect(state.isUserOrdersloading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should store data and set loading=false on fulfilled', () => {
    const state = feedsSliceReducer(
      {
        ...initialState,
        isUserOrdersloading: true
      },
      getUserFeeds.fulfilled(expectedUserFeedsResult, '', undefined)
    );

    expect(state.isUserOrdersloading).toBe(false);
    expect(state.userOrders).toEqual(expectedUserFeedsResult);
  });
});

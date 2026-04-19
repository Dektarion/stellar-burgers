import { expect, describe } from '@jest/globals';
import {
  addIngredient,
  removeIngredient,
  moveDownIngredient,
  moveUpIngredient,
  initialState,
  constructorBurgerSlice,
  resetConstructor
} from '../services/slices/constructorBurgerSlice';
import { nanoid } from '@reduxjs/toolkit';

jest.mock('@reduxjs/toolkit', () => {
  const actual = jest.requireActual('@reduxjs/toolkit');

  return {
    ...actual,
    nanoid: jest.fn()
  };
});

const constructorBurgerReducer = constructorBurgerSlice.reducer;

const bun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

const main = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магноли',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

const sauce = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0
};

const addIngredientTestState = {
  bun: { ...bun, id: 'id-1' },
  ingredients: [
    { ...sauce, id: 'id-2' },
    { ...main, id: 'id-3' }
  ]
};

describe('test constructorBurgerSlice', () => {
  beforeEach(() => {
    (nanoid as jest.Mock)
      .mockReturnValueOnce('id-1')
      .mockReturnValueOnce('id-2')
      .mockReturnValueOnce('id-3');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('add ingredients', () => {
    let state = constructorBurgerReducer(undefined, { type: 'INIT' });

    state = constructorBurgerReducer(state, addIngredient(bun));
    state = constructorBurgerReducer(state, addIngredient(sauce));
    state = constructorBurgerReducer(state, addIngredient(main));

    expect(state).toEqual({
      ...initialState,
      bun: { ...bun, id: 'id-1' },
      ingredients: [
        { ...sauce, id: 'id-2' },
        { ...main, id: 'id-3' }
      ]
    });
  });

  it('remove ingredients', () => {
    let state = constructorBurgerReducer(addIngredientTestState, {
      type: 'INIT'
    });

    state = constructorBurgerReducer(state, removeIngredient('id-2'));
    state = constructorBurgerReducer(state, removeIngredient('id-3'));

    expect(state).toEqual({
      ...initialState,
      bun: { ...bun, id: 'id-1' },
      ingredients: []
    });
  });

  it('move up ingredients', () => {
    let state = constructorBurgerReducer(addIngredientTestState, {
      type: 'INIT'
    });

    state = constructorBurgerReducer(state, moveUpIngredient(1));

    expect(state).toEqual({
      ...initialState,
      bun: { ...bun, id: 'id-1' },
      ingredients: [
        { ...main, id: 'id-3' },
        { ...sauce, id: 'id-2' }
      ]
    });
  });

  it('move down ingredients', () => {
    let state = constructorBurgerReducer(addIngredientTestState, {
      type: 'INIT'
    });

    state = constructorBurgerReducer(state, moveDownIngredient(0));

    expect(state).toEqual({
      ...initialState,
      bun: { ...bun, id: 'id-1' },
      ingredients: [
        { ...main, id: 'id-3' },
        { ...sauce, id: 'id-2' }
      ]
    });
  });

  it('reset constructor', () => {
    let state = constructorBurgerReducer(addIngredientTestState, {
      type: 'INIT'
    });

    state = constructorBurgerReducer(state, resetConstructor());

    expect(state).toEqual({ ...initialState });
  });
});

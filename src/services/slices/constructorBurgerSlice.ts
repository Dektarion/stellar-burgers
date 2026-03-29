import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient, TConstructorIngredient } from '../../utils/types';

type TBun = Pick<
  TIngredient,
  '_id' | 'name' | 'price' | 'image' | 'image_large' | 'image_mobile'
>;

type TConstractBurgerState = {
  bun: TBun;
  ingredients: TIngredient[];
};

const initialState: TConstractBurgerState = {
  bun: {
    _id: '',
    name: '',
    price: 0,
    image: '',
    image_large: '',
    image_mobile: ''
  },
  ingredients: []
};

export const constructorBurgerSlice = createSlice({
  name: 'constructBurger',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = { ...state.bun, ...action.payload };
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removerIngredient: (state, action: PayloadAction<string>) => {
      if (action.payload === state.bun._id) {
        state.bun = { ...state.bun, ...initialState };
      } else {
        state.ingredients = state.ingredients.filter(
          (ing) => ing._id !== action.payload
        );
      }
    }
  },
  selectors: {
    getBun: (state) => state.bun,
    getBurgerIngredients: (state) => state.ingredients
  }
});

export const { getBun, getBurgerIngredients } =
  constructorBurgerSlice.selectors;

export const { addIngredient, removerIngredient } =
  constructorBurgerSlice.actions;

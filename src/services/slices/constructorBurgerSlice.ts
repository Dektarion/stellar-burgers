import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import type { TIngredient, TConstructorIngredient } from '../../utils/types';

type TConstractBurgerState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstractBurgerState = {
  bun: null,
  ingredients: []
};

const SLICE_NAME = 'constructBurger';

export const constructorBurgerSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = { ...state.bun, ...action.payload };
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removerIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ing) => ing.id !== action.payload
      );
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

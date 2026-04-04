import {
  createSlice,
  PayloadAction,
  nanoid,
  createSelector
} from '@reduxjs/toolkit';
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
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getBun: (state) => state.bun,
    getBurgerIngredients: (state) => state.ingredients,
    getIngredientsIDArr: createSelector(
      (state: TConstractBurgerState) => state.bun,
      (state: TConstractBurgerState) => state.ingredients,
      (bun, ingredients) => {
        if (!bun) return [];
        return [bun._id, ...ingredients.map((ing) => ing._id), bun._id];
      }
    )
  }
});

export const { getBun, getBurgerIngredients, getIngredientsIDArr } =
  constructorBurgerSlice.selectors;

export const { addIngredient, removerIngredient, resetConstructor } =
  constructorBurgerSlice.actions;

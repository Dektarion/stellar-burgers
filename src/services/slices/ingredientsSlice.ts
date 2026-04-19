import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import type { TIngredient } from '../../utils/types';

type TIngredientState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

const THUNK_NAME = {
  getAllIngredients: 'ingredients/getAll'
};

export const getIngredients = createAsyncThunk(
  `${THUNK_NAME.getAllIngredients}`,
  async () => getIngredientsApi()
);

const SLICE_NAME = 'ingredients';

export const ingredientsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
    selectIngredientById: (state, id: string) =>
      state.ingredients.find((ing) => ing._id === id)
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const {
  getIngredientsSelector,
  selectLoading,
  selectError,
  selectIngredientById
} = ingredientsSlice.selectors;

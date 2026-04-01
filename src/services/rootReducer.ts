import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { constructorBurgerSlice } from './slices/constructorBurgerSlice';
import { feedsSlice } from './slices/feedsSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  constructorBurgerSlice,
  feedsSlice
);

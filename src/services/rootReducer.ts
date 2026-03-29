import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../services/slices/ingredientsSlice';
import { constructorBurgerSlice } from './slices/constructorBurgerSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  constructorBurgerSlice
);

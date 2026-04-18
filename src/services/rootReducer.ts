import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { constructorBurgerSlice } from './slices/constructorBurgerSlice';
import { feedsSlice } from './slices/feedsSlice';
import { userSlice } from './slices/userSlice';
import { orderSlice } from './slices/orderSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  constructorBurgerSlice,
  feedsSlice,
  userSlice,
  orderSlice
);

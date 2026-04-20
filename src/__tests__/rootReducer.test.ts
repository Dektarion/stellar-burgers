import { rootReducer } from '../services/rootReducer';
import { initialState as constructorBurgerInitialState } from '../services/slices/constructorBurgerSlice';
import { initialState as feedsInitialState } from '../services/slices/feedsSlice';
import { initialState as ingredientsInitialState } from '../services/slices/ingredientsSlice';
import { initialState as orderInitialState } from '../services/slices/orderSlice';
import { initialState as userInitialState } from '../services/slices/userSlice';

describe('initial state of rootReducer', () => {
  it('should return full initial state', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      constructBurger: constructorBurgerInitialState,
      feeds: feedsInitialState,
      ingredients: ingredientsInitialState,
      postOrderOnServer: orderInitialState,
      user: userInitialState
    });
  });
});

import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getBun,
  getBurgerIngredients,
  getIngredientsIDArr,
  resetConstructor
} from '../../services/slices/constructorBurgerSlice';
import { getUserSelector } from '../../services/slices/userSlice';
import {
  postOrder,
  getStatus,
  getModalDataOrder,
  resetOrder
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = {
    bun: useSelector(getBun),
    ingredients: useSelector(getBurgerIngredients)
  };

  const user = useSelector(getUserSelector);
  const orderRequest = useSelector(getStatus);
  const ingredintsIDArr = useSelector(getIngredientsIDArr);
  const orderModalData = useSelector(getModalDataOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (user) {
      dispatch(postOrder(ingredintsIDArr as string[]));
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getUserOrdersSelector,
  getUserFeeds
} from '../../services/slices/feedsSlice';
import { Outlet } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFeeds());
  }, []);

  const orders: TOrder[] = useSelector(getUserOrdersSelector);

  return (
    <>
      <ProfileOrdersUI orders={orders} />;
      <Outlet />
    </>
  );
};

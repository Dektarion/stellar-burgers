import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getOrdersSelector,
  getFeeds,
  selectFeedLoading
} from '../../services/slices/feedsSlice';
import { Outlet } from 'react-router-dom';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  // const isFeedLoading = useSelector(selectFeedLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const orders: TOrder[] = useSelector(getOrdersSelector);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <>
      <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
      <Outlet />
    </>
  );
};

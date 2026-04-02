import { useParams, useNavigate } from 'react-router-dom';
import { Modal, OrderInfo } from '@components';
import { FC } from 'react';

export const ModalOrderWrapper: FC = () => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();

  const onClose = () => navigate(-1);

  return (
    <Modal title={`#${number}`} onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
};

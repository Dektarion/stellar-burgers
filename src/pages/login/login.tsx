import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { loginUser } from '../../services/slices/userSlice';
import { useForm } from '../../hooks/useForm';
import type { TLoginData } from '../../utils/burger-api';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const { values, setField } = useForm<TLoginData>({
    email: '',
    password: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(values));
  };

  return (
    <LoginUI
      errorText=''
      email={values.email}
      setEmail={setField('email')}
      password={values.password}
      setPassword={setField('password')}
      handleSubmit={handleSubmit}
    />
  );
};

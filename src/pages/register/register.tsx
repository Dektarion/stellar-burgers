import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { registerUser } from '../../services/slices/userSlice';
import { useForm } from '../../hooks/useForm';
import { TRegisterData } from '@api';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const { values, setField } = useForm<TRegisterData>({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser(values));
  };

  return (
    <RegisterUI
      errorText=''
      email={values.email}
      userName={values.name}
      password={values.password}
      setEmail={setField('email')}
      setPassword={setField('password')}
      setUserName={setField('name')}
      handleSubmit={handleSubmit}
    />
  );
};

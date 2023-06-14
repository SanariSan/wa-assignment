import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import type { FC } from 'react';
import { useState, useCallback } from 'react';
import { LoginComponent } from '../../components/login';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginUserAsync, userAuthLoadingStatusSelector } from '../../store';
import { FormControlContainerMemo } from '../form-control';
import type { TLoginFormValues } from './login.const';
import { VALIDATION_SCHEMA } from './login.const';

const LoginContainer: FC = () => {
  const userAuthLoadingState = useAppSelector(userAuthLoadingStatusSelector);
  const dispatch = useAppDispatch();

  const [formValues] = useState<TLoginFormValues>({
    username: '',
    password: '',
  });

  const onSubmit = useCallback(
    (values: TLoginFormValues, actions: FormikHelpers<TLoginFormValues>) => {
      void dispatch(loginUserAsync({ username: values.username, password: values.password }));
    },
    [dispatch],
  );

  return (
    <Formik initialValues={formValues} validationSchema={VALIDATION_SCHEMA} onSubmit={onSubmit}>
      {(formikConfig) => (
        <>
          <LoginComponent isLoading={userAuthLoadingState === 'loading'} {...formikConfig} />
          <FormControlContainerMemo isLoading={userAuthLoadingState === 'loading'} />
        </>
      )}
    </Formik>
  );
};

export { LoginContainer };

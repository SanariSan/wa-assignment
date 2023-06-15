import { Button, Flex, Input } from '@chakra-ui/react';
import { useState, useRef, useEffect, useMemo, memo, useCallback } from 'react';
import type { FC } from 'react';
import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import { useAppDispatch } from '../../../hooks/redux';
import { ChatboxComponentMemo } from '../../../components/chat';
import { FormControlContainerMemo } from '../../form-control';
import type { TChatboxFormValues } from './chatbox.chat.const';
import { VALIDATION_SCHEMA } from './chatbox.chat.const';
import { sendMessageAsync } from '../../../store';

type TChatboxContainer = {
  [key: string]: unknown;
};

const ChatboxContainer: FC<TChatboxContainer> = () => {
  const d = useAppDispatch();

  const [formValues] = useState<TChatboxFormValues>({
    message: '',
  });

  const [forceResetForm, setForceResetForm] = useState<boolean>(false);

  const onSubmit = useCallback(
    (values: TChatboxFormValues, actions: FormikHelpers<TChatboxFormValues>) => {
      const { message } = values;
      if (message === undefined || message.length <= 0) return;

      void d(sendMessageAsync({ message }));
      setForceResetForm((s) => !s);
    },
    [d],
  );

  return (
    <Formik initialValues={formValues} validationSchema={VALIDATION_SCHEMA} onSubmit={onSubmit}>
      {(formikConfig) => (
        <>
          <ChatboxComponentMemo {...formikConfig} />
          <FormControlContainerMemo isLoading={false} forceResetForm={forceResetForm} />
        </>
      )}
    </Formik>
  );
};

const ChatboxContainerMemo = memo(ChatboxContainer);

export { ChatboxContainerMemo };

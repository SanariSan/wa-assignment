import { useFormikContext } from 'formik';
import type { FC } from 'react';
import { memo, useEffect } from 'react';

const FormControlContainer: FC<{ isLoading: boolean; formValues?: Record<string, string> }> = ({
  isLoading,
  formValues,
}) => {
  const { resetForm, setSubmitting, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (isLoading) {
      resetForm();
      setSubmitting(false);
    }
  }, [isLoading, resetForm, setSubmitting]);

  useEffect(() => {
    if (formValues === undefined) return;

    Object.entries(formValues).forEach(([key, value]) => {
      setFieldValue(key, value);
    });
  }, [formValues, setFieldValue]);

  return null;
};

export const FormControlContainerMemo = memo(FormControlContainer);

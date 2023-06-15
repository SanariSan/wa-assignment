import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import type { FC } from 'react';
import { memo, useCallback, useState } from 'react';
import { SidebarSearchComponentMemo } from '../../../components/sidebar';
import { useAppDispatch } from '../../../hooks/redux';
import { pushContact } from '../../../store';
import { FormControlContainerMemo } from '../../form-control';
import type { TSidebarSearchFormValues } from './search.sidebar.const';
import { VALIDATION_SCHEMA } from './search.sidebar.const';

type TSidebarSearchContainer = {
  [key: string]: unknown;
};
const SidebarSearchContainer: FC<TSidebarSearchContainer> = () => {
  const d = useAppDispatch();

  const [formValues] = useState<TSidebarSearchFormValues>({
    contact: '',
  });

  const onSubmit = useCallback(
    (values: TSidebarSearchFormValues, actions: FormikHelpers<TSidebarSearchFormValues>) => {
      const { contact } = values;
      if (contact === undefined) return;

      // just extract phone since already validated
      const phoneRegexp = new RegExp('^\\+?(?<phone>\\d+)$');
      const match = phoneRegexp.exec(contact)?.groups?.phone;

      // not possible because of yup validation, but for type safety and consistency here it is
      if (match === undefined) return;

      const wid = `${match}@c.us`;
      void d(
        pushContact({
          contact: { wid },
        }),
      );
    },
    [d],
  );

  return (
    <Formik initialValues={formValues} validationSchema={VALIDATION_SCHEMA} onSubmit={onSubmit}>
      {(formikConfig) => (
        <>
          <SidebarSearchComponentMemo {...formikConfig} />
          <FormControlContainerMemo isLoading={false} />
        </>
      )}
    </Formik>
  );
};

const SidebarSearchContainerMemo = memo(SidebarSearchContainer);

export { SidebarSearchContainerMemo };

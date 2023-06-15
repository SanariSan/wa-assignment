import type { InferType } from 'yup';
import { object, string } from 'yup';

const VALIDATION_SCHEMA = object({
  contact: string().matches(/^\+?(?<phone>\d+)$/, 'Wrong format, phone only'),
});

type TSidebarSearchFormValues = InferType<typeof VALIDATION_SCHEMA>;

export type { TSidebarSearchFormValues };
export { VALIDATION_SCHEMA };

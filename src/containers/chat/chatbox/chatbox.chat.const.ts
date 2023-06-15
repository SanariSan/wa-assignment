import type { InferType } from 'yup';
import { object, string } from 'yup';

const VALIDATION_SCHEMA = object({
  message: string().max(10_000, 'Message too long'),
});

type TChatboxFormValues = InferType<typeof VALIDATION_SCHEMA>;

export type { TChatboxFormValues };
export { VALIDATION_SCHEMA };

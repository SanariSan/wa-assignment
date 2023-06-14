import type { InferType } from 'yup';
import { object, string } from 'yup';

// more on strong typing https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29412
// type TA = InferType<typeof VALIDATION_SCHEMA>;

const VALIDATION_SCHEMA = object({
  username: string()
    .required('Username required')
    .min(6, 'Username too short')
    .max(28, 'Username too long!'),
  password: string()
    .required('Password required')
    .min(6, 'Password too short')
    .max(28, 'Password too long!'),
});

type TLoginFormValues = InferType<typeof VALIDATION_SCHEMA>;

// const INITIAL_VALUES: TLoginFormValues = { username: '0a8046d4d', password: 'pwd123456' };

export type { TLoginFormValues };
export { VALIDATION_SCHEMA };

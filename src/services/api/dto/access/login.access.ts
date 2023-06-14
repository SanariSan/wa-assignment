import type { InferType } from 'yup';
import { boolean, object, string } from 'yup';
import { DEFAULT_FAILURE_DTO, MISCELLANEOUS } from '../dto.const';

const AccessLoginOutgoingDTO = object({
  username: string().required(),
  password: string().required(),
});

const AccessLoginIncomingSuccessDTO = object({
  data: object({
    username: string().optional(),
    email: string().optional(),
    isAuthenticated: boolean().required(),
  }),
})
  .noUnknown(true)
  .strict(true);

const AccessLoginIncomingFailureDTO = DEFAULT_FAILURE_DTO.shape({
  miscellaneous: MISCELLANEOUS.shape({
    isAuthenticated: boolean().required(),
  }),
}).strict(true);

type TAccessLoginOutgoingFields = InferType<typeof AccessLoginOutgoingDTO>;
type TAccessLoginIncomingSuccessFields = InferType<typeof AccessLoginIncomingSuccessDTO>;
type TAccessLoginIncomingFailureFields = InferType<typeof AccessLoginIncomingFailureDTO>;

export { AccessLoginOutgoingDTO, AccessLoginIncomingSuccessDTO, AccessLoginIncomingFailureDTO };
export type {
  TAccessLoginOutgoingFields,
  TAccessLoginIncomingSuccessFields,
  TAccessLoginIncomingFailureFields,
};

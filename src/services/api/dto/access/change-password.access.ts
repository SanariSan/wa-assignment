import type { InferType } from 'yup';
import { array, boolean, object, string } from 'yup';
import { DEFAULT_FAILURE_DTO, MISCELLANEOUS } from '../dto.const';

const AccessChangePasswordOutgoingDTO = object({
  oldPassword: string().required(),
  newPassword: string().required(),
});

const AccessChangePasswordIncomingSuccessDTO = object({
  data: object({
    username: string().optional(),
    email: string().optional(),
    isAuthenticated: boolean().required(),
  }),
})
  .noUnknown(true)
  .strict(true);

const AccessChangePasswordIncomingFailureDTO = DEFAULT_FAILURE_DTO.shape({
  miscellaneous: MISCELLANEOUS.shape({
    isAuthenticated: boolean().required(),
    invalidParams: array()
      .of(
        object({
          name: string().required(),
          reason: string().required(),
        }),
      )
      .required(),
  }),
}).strict(true);

type TAccessChangePasswordOutgoingFields = InferType<typeof AccessChangePasswordOutgoingDTO>;
type TAccessChangePasswordIncomingSuccessFields = InferType<
  typeof AccessChangePasswordIncomingSuccessDTO
>;
type TAccessChangePasswordIncomingFailureFields = InferType<
  typeof AccessChangePasswordIncomingFailureDTO
>;

export {
  AccessChangePasswordOutgoingDTO,
  AccessChangePasswordIncomingSuccessDTO,
  AccessChangePasswordIncomingFailureDTO,
};
export type {
  TAccessChangePasswordOutgoingFields,
  TAccessChangePasswordIncomingSuccessFields,
  TAccessChangePasswordIncomingFailureFields,
};

import { ELOG_LEVEL } from '../../../general.type';
import { publishError } from '../../../modules/access-layer/events/pubsub';
import { request } from '../../request-base.services';
import type { TAccessRegisterOutgoingFields } from '../dto';
import {
  AccessRegisterIncomingFailureDTO,
  AccessRegisterIncomingSuccessDTO,
  validateDTO,
} from '../dto';
import { ROUTES } from '../routes.api.const';

export async function registerUser({
  dto,
  abortSignal,
}: {
  dto: TAccessRegisterOutgoingFields;
  abortSignal: AbortSignal;
}) {
  try {
    const response: Response = await request({
      url: ROUTES.ACCESS.REGISTER,
      method: 'POST',
      body: JSON.stringify(dto),
      abortSignal,
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    if (response.status > 100 && response.status < 400) {
      return {
        success: await validateDTO({
          schema: AccessRegisterIncomingSuccessDTO,
          value: parsedJsonResponse,
        }),
      };
    }

    return {
      failure: await validateDTO({
        schema: AccessRegisterIncomingFailureDTO,
        value: parsedJsonResponse,
      }),
    };
  } catch (error) {
    publishError(ELOG_LEVEL.DEBUG, error as Error);
    throw new Error('Internal error');
  }
}

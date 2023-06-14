import { ELOG_LEVEL } from '../../../general.type';
import { publishError } from '../../../modules/access-layer/events/pubsub';
import { request } from '../../request-base.services';
import type { TAccessLoginOutgoingFields } from '../dto';
import { AccessLoginIncomingFailureDTO, AccessLoginIncomingSuccessDTO, validateDTO } from '../dto';
import { ROUTES } from '../routes.api.const';

export async function loginUser({
  dto,
  abortSignal,
}: {
  dto: TAccessLoginOutgoingFields;
  abortSignal: AbortSignal;
}) {
  try {
    const response: Response = await request({
      url: ROUTES.ACCESS.LOGIN,
      method: 'POST',
      body: JSON.stringify(dto),
      abortSignal,
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    if (response.status > 100 && response.status < 400) {
      return {
        success: await validateDTO({
          schema: AccessLoginIncomingSuccessDTO,
          value: parsedJsonResponse,
        }),
      };
    }

    return {
      failure: await validateDTO({
        schema: AccessLoginIncomingFailureDTO,
        value: parsedJsonResponse,
      }),
    };
  } catch (error) {
    publishError(ELOG_LEVEL.DEBUG, error as Error);
    throw new Error('Internal error');
  }
}

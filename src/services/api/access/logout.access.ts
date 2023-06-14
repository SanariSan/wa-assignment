import { ELOG_LEVEL } from '../../../general.type';
import { publishError } from '../../../modules/access-layer/events/pubsub';
import { request } from '../../request-base.services';
import {
  AccessLogoutIncomingFailureDTO,
  AccessLogoutIncomingSuccessDTO,
  validateDTO,
} from '../dto';
import { ROUTES } from '../routes.api.const';

export async function logoutUser({ abortSignal }: { abortSignal: AbortSignal }) {
  try {
    const response: Response = await request({
      url: ROUTES.ACCESS.LOGOUT,
      method: 'DELETE',
      abortSignal,
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    if (response.status > 100 && response.status < 400) {
      return {
        success: await validateDTO({
          schema: AccessLogoutIncomingSuccessDTO,
          value: parsedJsonResponse,
        }),
      };
    }

    return {
      failure: await validateDTO({
        schema: AccessLogoutIncomingFailureDTO,
        value: parsedJsonResponse,
      }),
    };
  } catch (error) {
    publishError(ELOG_LEVEL.DEBUG, error as Error);
    throw new Error('Internal error');
  }
}

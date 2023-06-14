import qs from 'query-string';
import { ELOG_LEVEL } from '../../../general.type';
import { publishError } from '../../../modules/access-layer/events/pubsub';
import { request } from '../../request-base.services';
import type { TAccessCheckSessionOutgoingFields } from '../dto';
import { AccessCheckSessionIncomingSuccessDTO, validateDTO } from '../dto';

export async function checkUserAuthStatus({
  dto,
  abortSignal,
}: {
  dto: TAccessCheckSessionOutgoingFields;
  abortSignal: AbortSignal;
}) {
  try {
    const response: Response = await request({
      url: qs.stringifyUrl({
        url: `${process.env.REACT_APP_API_URL}/waInstance${dto.idInstance}/getSettings/${dto.apiTokenInstance}`,
      }),
      abortSignal,
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    if (response.status > 100 && response.status < 400) {
      return {
        success: await validateDTO({
          schema: AccessCheckSessionIncomingSuccessDTO,
          value: parsedJsonResponse,
        }),
      };
    }

    return {
      failure: {
        detail: 'Invalid credentials',
      },
    };
    // return {
    //   failure: await validateDTO({
    //     schema: AccessCheckSessionIncomingFailureDTO,
    //     value: parsedJsonResponse,
    //   }),
    // };
  } catch (error) {
    publishError(ELOG_LEVEL.DEBUG, error as Error);
    throw new Error('Internal error');
  }
}

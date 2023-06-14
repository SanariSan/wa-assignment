import qs from 'query-string';
import { ELOG_LEVEL } from '../../../general.type';
import { publishError } from '../../../modules/access-layer/events/pubsub';
import { request } from '../../request-base.services';
import type { TGoodsEntitiesOutgoingFields } from '../dto';
import {
  GoodsEntitiesIncomingFailureDTO,
  GoodsEntitiesIncomingSuccessDTO,
  validateDTO,
} from '../dto';
import { ROUTES } from '../routes.api.const';

export async function getEntities({
  params,
  abortSignal,
}: {
  params: TGoodsEntitiesOutgoingFields;
  abortSignal: AbortSignal;
}) {
  try {
    const response: Response = await request({
      url: qs.stringifyUrl({ url: ROUTES.GOODS.ENTITIES, query: params }),
      abortSignal,
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    if (response.status > 100 && response.status < 400) {
      return {
        success: await validateDTO({
          schema: GoodsEntitiesIncomingSuccessDTO,
          value: parsedJsonResponse,
        }),
      };
    }

    return {
      failure: await validateDTO({
        schema: GoodsEntitiesIncomingFailureDTO,
        value: parsedJsonResponse,
      }),
    };
  } catch (error) {
    publishError(ELOG_LEVEL.DEBUG, error as Error);
    throw new Error('Internal error');
  }
}

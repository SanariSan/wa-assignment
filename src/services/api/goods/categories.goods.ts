import { ELOG_LEVEL } from '../../../general.type';
import { publishError } from '../../../modules/access-layer/events/pubsub';
import { request } from '../../request-base.services';
import {
  GoodsCategoriesIncomingFailureDTO,
  GoodsCategoriesIncomingSuccessDTO,
  validateDTO,
} from '../dto';
import { ROUTES } from '../routes.api.const';

export async function getCategories({ abortSignal }: { abortSignal: AbortSignal }) {
  try {
    const response: Response = await request({
      url: ROUTES.GOODS.CATEGORIES,
      abortSignal,
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    if (response.status > 100 && response.status < 400) {
      return {
        success: await validateDTO({
          schema: GoodsCategoriesIncomingSuccessDTO,
          value: parsedJsonResponse,
        }),
      };
    }

    return {
      failure: await validateDTO({
        schema: GoodsCategoriesIncomingFailureDTO,
        value: parsedJsonResponse,
      }),
    };
  } catch (error) {
    // const text = (await response.clone().text()).slice(200);
    // throw new Error((error as Error).message);
    publishError(ELOG_LEVEL.DEBUG, error as Error);
    throw new Error('Internal error');
  }
}

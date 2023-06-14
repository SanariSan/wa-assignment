import type { InferType } from 'yup';
import { boolean, array, number, object, string } from 'yup';
import { DEFAULT_FAILURE_DTO } from '../dto.const';

const GoodsEntitiesOutgoingDTO = object({
  category: string().optional(),
  modifier: string().optional(),
  offset: number().required(),
  qty: number().required(),
});

const GoodsEntitiesIncomingSuccessDTO = object({
  data: object({
    entities: array()
      .of(
        object({
          id: string().required(),
          name: string().required(),
          price: number().required(),
          category: string().required(),
          modifier: string().required(),
          lsrc: string().required(),
          hsrc: string().required(),
        }).required(),
      )
      .required(),
    totalQty: number().required(),
    hasMore: boolean().required(),
  }).required(),
});

const GoodsEntitiesIncomingFailureDTO = DEFAULT_FAILURE_DTO;

type TGoodsEntitiesOutgoingFields = InferType<typeof GoodsEntitiesOutgoingDTO>;
type TGoodsEntitiesIncomingSuccessFields = InferType<typeof GoodsEntitiesIncomingSuccessDTO>;
type TGoodsEntitiesIncomingFailureFields = InferType<typeof GoodsEntitiesIncomingFailureDTO>;

export {
  GoodsEntitiesOutgoingDTO,
  GoodsEntitiesIncomingSuccessDTO,
  GoodsEntitiesIncomingFailureDTO,
};
export type {
  TGoodsEntitiesOutgoingFields,
  TGoodsEntitiesIncomingSuccessFields,
  TGoodsEntitiesIncomingFailureFields,
};

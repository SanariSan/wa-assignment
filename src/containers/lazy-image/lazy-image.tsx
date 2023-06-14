import type { ImageProps } from '@chakra-ui/react';
import { Image as ImageChakra } from '@chakra-ui/react';
import type { FC, MutableRefObject } from 'react';
import { useLazyImg } from '../../hooks/use-lazy-image';

export const LazyImageContainer: FC<
  { lSrc: string; hSrc: string; elRef?: MutableRefObject<HTMLImageElement | null> } & ImageProps
> = ({ lSrc, hSrc, elRef, ...props }) => {
  const [src, { blur }] = useLazyImg({ lSrc, hSrc });

  return (
    <ImageChakra ref={elRef} src={src} filter={'auto'} blur={blur ? '3px' : 'none'} {...props} />
  );
};

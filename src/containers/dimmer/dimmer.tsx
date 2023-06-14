import { Box } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useEffect, useRef } from 'react';
import { sleep } from '../../helpers/util';
import { useDelayedUnmount } from '../../hooks/use-delayed-unmount';

type TDimmerContainer = {
  isDimmed: boolean;
  onClose: () => void;
};

const DimmerContainer: FC<TDimmerContainer> = ({ isDimmed, onClose }) => {
  const { isMounted } = useDelayedUnmount({ isVisible: isDimmed, delay: 300 });
  const dimmerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const refPersist = dimmerRef.current;

    if (refPersist !== null)
      void sleep(25).then(() => {
        refPersist.style.opacity = isDimmed ? '1' : '0';
        return;
      });

    return () => {
      if (refPersist !== null) refPersist.style.opacity = '0';
    };
  }, [isDimmed]);

  return (
    <Box
      ref={dimmerRef}
      position={'absolute'}
      inset={0}
      w={'100%'}
      h={'100%'}
      bg={'blackAlpha.600'}
      opacity={0}
      display={isMounted ? 'block' : 'none'}
      zIndex={2}
      transition={'opacity 0.2s ease-in-out'}
      onClick={onClose}
    />
  );
};

const DimmerContainerMemo = memo(DimmerContainer);

export { DimmerContainerMemo };

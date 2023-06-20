import type { FC } from 'react';
import { memo, useEffect, useRef } from 'react';
import { Flex } from '@chakra-ui/react';
import { SidebarNavComponentMemo } from '../../../../components/dashboard';
import { ThemeToggleContainerMemo } from '../../../theme-toggle';
import { useAppSelector } from '../../../../hooks/redux';
import { uiSidebarStateSelector } from '../../../../store';

type TSidebarNavContainer = {
  [key: string]: unknown;
};

const SidebarNavContainer: FC<TSidebarNavContainer> = () => {
  const isSidebarOpened = useAppSelector(uiSidebarStateSelector);

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      p={1}
      justifyContent={'space-between'}
      alignItems={'center'}
      position={'relative'}
    >
      <ThemeToggleContainerMemo forceRecalcPosition={isSidebarOpened} />
      <SidebarNavComponentMemo />
    </Flex>
  );
};

const SidebarNavContainerMemo = memo(SidebarNavContainer);

export { SidebarNavContainerMemo };

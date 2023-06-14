import { Flex, Text } from '@chakra-ui/react';
import { useState, useRef, useEffect, useMemo, memo } from 'react';
import type { FC } from 'react';

type TSidebarNavContainer = {
  [key: string]: unknown;
};

const SidebarNavContainer: FC<TSidebarNavContainer> = () => {
  const isActive = useRef(true);

  useEffect(
    () => () => {
      isActive.current = false;
    },
    [],
  );

  return (
    <Flex>
      <Text>Sidenav</Text>
    </Flex>
  );
};

const SidebarNavContainerMemo = memo(SidebarNavContainer);

export { SidebarNavContainerMemo };

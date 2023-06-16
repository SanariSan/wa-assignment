import { Avatar, Flex } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';

type TSidebarNavComponent = {
  [key: string]: unknown;
};

const SidebarNavComponent: FC<TSidebarNavComponent> = () => (
  <>
    <Flex alignItems={'center'} justifyContent={'center'} pl={2}>
      <Avatar objectFit={'contain'} borderRadius={'999999px'} boxSize={12} animation={'none'} />
    </Flex>
  </>
);

const SidebarNavComponentMemo = memo(SidebarNavComponent);

export { SidebarNavComponentMemo };

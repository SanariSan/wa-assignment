import { Avatar, Flex, Icon } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import { RxDotsVertical } from 'react-icons/rx';

type TSidebarNavContainer = {
  [key: string]: unknown;
};

const SidebarNavContainer: FC<TSidebarNavContainer> = () => {
  const a = 1;

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      p={1}
      justifyContent={'space-between'}
      alignItems={'center'}
      position={'relative'}
    >
      <Flex alignItems={'center'} justifyContent={'center'} pl={2}>
        <Avatar objectFit={'contain'} borderRadius={'999999px'} boxSize={12} animation={'none'} />
      </Flex>
      <Icon as={RxDotsVertical} me={3} boxSize={{ base: 4, md: 5 }} cursor={'pointer'} />
    </Flex>
  );
};

const SidebarNavContainerMemo = memo(SidebarNavContainer);

export { SidebarNavContainerMemo };

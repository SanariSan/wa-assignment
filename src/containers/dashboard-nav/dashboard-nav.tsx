import { Flex, Text } from '@chakra-ui/react';
import { useState, useRef, useEffect, useMemo, memo } from 'react';
import type { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { contactsSelectedContactInfo } from '../../store';

type TSideNavContainer = {
  [key: string]: unknown;
};

const DashboardNavContainer: FC<TSideNavContainer> = () => {
  const selectedContactInfo = useAppSelector(contactsSelectedContactInfo);

  return (
    <Flex w={'100%'} h={'100%'} p={3}>
      <Text>
        {selectedContactInfo?.wid !== undefined ? selectedContactInfo.wid : 'Please select contact'}
      </Text>
    </Flex>
  );
};

const DashboardNavContainerMemo = memo(DashboardNavContainer);

export { DashboardNavContainerMemo };

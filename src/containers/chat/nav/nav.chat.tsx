import { Button, Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { contactsSelectedContactInfo, setSelectedContactIdxUi } from '../../../store';

type TChatNavContainer = {
  [key: string]: unknown;
  sidebarToggleCb: (payload?: { isOpened: boolean }) => void;
};

const ChatNavContainer: FC<TChatNavContainer> = ({ sidebarToggleCb }) => {
  const d = useAppDispatch();
  const selectedContactInfo = useAppSelector(contactsSelectedContactInfo);
  const [lastSelectedContactInfo, setLastSelectedCintactInfo] = useState(selectedContactInfo);
  const isVisible = selectedContactInfo !== undefined;

  useEffect(() => {
    if (selectedContactInfo === undefined) return;

    setLastSelectedCintactInfo(selectedContactInfo);
  }, [selectedContactInfo]);

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      p={3}
      gap={3}
      justifyContent={'flex-start'}
      alignItems={'center'}
      transition={'all 0.2s ease-in-out'}
      opacity={isVisible ? 1 : 0}
      transform={isVisible ? 'translate(0px, 0px)' : 'translate(-100px, 0px)'}
    >
      <Button
        size={'sm'}
        borderRadius={'20px'}
        onClick={() => {
          sidebarToggleCb();
          void d(setSelectedContactIdxUi({ contactIdx: -1 }));
        }}
      >
        {'<'}
      </Button>
      <Text variant={'lg'}>
        {lastSelectedContactInfo?.wid.slice(0, lastSelectedContactInfo.wid.indexOf('@'))}
      </Text>
    </Flex>
  );
};

const ChatNavContainerMemo = memo(ChatNavContainer);

export { ChatNavContainerMemo };

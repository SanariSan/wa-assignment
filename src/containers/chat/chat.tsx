import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useEffect, useRef } from 'react';
import { COLORS } from '../../chakra-setup';
import { useAppSelector } from '../../hooks/redux';
import { contactsSelectedContactChatHistorySelector } from '../../store';
import { ChatboxContainerMemo } from './chatbox';

type TChatContainer = {
  [key: string]: unknown;
};

const ChatContainer: FC<TChatContainer> = () => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const chatHistory = useAppSelector(contactsSelectedContactChatHistorySelector);

  const [outgoingMessageBg, incomingMessageBg, textColor, textColorAlt, navBg] = [
    useColorModeValue(COLORS.whatsapp.messageOutgoingDark, COLORS.whatsapp.messageOutgoingDark),
    useColorModeValue(COLORS.whatsapp.messageIncomingDark, COLORS.whatsapp.messageIncomingDark),
    useColorModeValue(COLORS.whatsapp.textColorDark, COLORS.whatsapp.textColorDark),
    useColorModeValue(COLORS.whatsapp.textColorAltDark, COLORS.whatsapp.textColorAltDark),
    useColorModeValue(COLORS.whatsapp.navBgDark, COLORS.whatsapp.navBgDark),
  ];

  useEffect(() => {
    if (lastMessageRef.current !== null) {
      lastMessageRef.current.scrollIntoView({ block: 'end' });
    }
  }, [chatHistory]);

  return (
    <Flex w={'100%'} h={'100%'} direction={'column'}>
      <Flex
        w={'100%'}
        h={'100%'}
        direction={'column'}
        overflowY={'auto'}
        overflowX={'auto'}
        gap={5}
        p={5}
      >
        {chatHistory.map((el, idx) => {
          const { type, textMessage } = el;
          const date = new Date();
          const time = `${String(date.getHours()).padStart(2, '0')}:${String(
            date.getMinutes(),
          ).padStart(2, '0')}`;

          return (
            <Flex
              key={`${type}-${idx}`}
              w={'100%'}
              h={'max-content'}
              minH={'max-content'}
              minW={'250px'}
              alignItems={'center'}
              justifyContent={type === 'outgoing' ? 'flex-end' : 'flex-start'}
            >
              <Flex
                direction={'column'}
                alignItems={'flex-start'}
                justifyContent={'center'}
                w={'max-content'}
                h={'max-content'}
                minW={'75px'}
                py={1}
                px={3}
                borderRadius={'10px'}
                bg={type === 'outgoing' ? outgoingMessageBg : incomingMessageBg}
              >
                <Flex
                  w={'100%'}
                  h={'max-content'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                >
                  <Text whiteSpace={'pre-wrap'} color={textColor}>
                    {textMessage}
                  </Text>
                </Flex>
                <Flex
                  w={'100%'}
                  h={'max-content'}
                  alignItems={'center'}
                  justifyContent={'flex-end'}
                >
                  <Text variant={'xs'} color={textColorAlt}>
                    {time}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          );
        })}
        <Box ref={lastMessageRef} />
      </Flex>
      <Flex w={'100%'} h={'75px'} bg={navBg} p={3}>
        <ChatboxContainerMemo />
      </Flex>
    </Flex>
  );
};

const ChatContainerMemo = memo(ChatContainer);

export { ChatContainerMemo };

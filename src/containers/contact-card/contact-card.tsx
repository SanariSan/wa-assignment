import { Avatar, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useState, useRef, useEffect, useMemo, memo } from 'react';
import type { FC } from 'react';
import { COLORS } from '../../chakra-setup';

type TContactCardContainer = {
  [key: string]: unknown;
  isSelected: boolean;
  idx: number;
  onSelect: ({ contactIdx }: { contactIdx: number }) => void;
  title: string;
};

const ContactCardContainer: FC<TContactCardContainer> = ({ isSelected, idx, onSelect, title }) => {
  const [active, navBg, textColorDark, textColorAltDark] = [
    useColorModeValue(COLORS.whatsapp.activeDark, COLORS.whatsapp.activeDark),
    useColorModeValue(COLORS.whatsapp.navBgDark, COLORS.whatsapp.navBgDark),
    useColorModeValue(COLORS.whatsapp.textColorDark, COLORS.whatsapp.textColorDark),
    useColorModeValue(COLORS.whatsapp.textColorAltDark, COLORS.whatsapp.textColorAltDark),
  ];

  return (
    <Flex
      w={'100%'}
      h={'72px'}
      alignItems={'center'}
      justifyContent={'space-between'}
      bg={isSelected ? active : 'transparent'}
      cursor={'pointer'}
      onClick={() => {
        onSelect({ contactIdx: idx });
      }}
      gap={3}
    >
      <Flex alignItems={'center'} justifyContent={'center'} pl={3}>
        <Avatar objectFit={'contain'} borderRadius={'999999px'} boxSize={12} animation={'none'} />
      </Flex>
      <Flex
        w={'100%'}
        h={'100%'}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        p={3}
        borderBottom={`1px solid ${navBg}`}
      >
        <Flex w={'100%'} h={'100%'} alignItems={'center'} justifyContent={'flex-start'}>
          <Text variant={'lg'} color={textColorDark}>
            {title}
          </Text>
        </Flex>
        <Flex w={'100%'} h={'100%'} alignItems={'center'} justifyContent={'flex-start'}>
          <Text color={textColorAltDark}>Open dialog to start a conversation!</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

const ContactCardContainerMemo = memo(ContactCardContainer);

export { ContactCardContainerMemo };

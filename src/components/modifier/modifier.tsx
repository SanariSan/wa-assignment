import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { COLORS } from '../../chakra-setup';

type TModifierProps = {
  title: string;
  isSelected: boolean;
  onClick: () => void;
};

export const ModifierComponent: FC<TModifierProps> = ({ title, isSelected, onClick }) => {
  const [bgAlt, secondaryAlt, wrapBg, accent] = [
    useColorModeValue(COLORS.white[900], COLORS.darkBlue[600]),
    useColorModeValue(COLORS.blue[600], COLORS.blue[500]),
    useColorModeValue(COLORS.white[300], COLORS.darkBlue[300]),
    useColorModeValue(COLORS.blue[800], COLORS.white[900]),
  ];

  return (
    <Box
      minW={'max-content'}
      minH={'max-content'}
      textAlign={'center'}
      borderRadius={'20px'}
      background={isSelected ? accent : wrapBg}
      wordBreak={'keep-all'}
      onClick={onClick}
    >
      <Text
        variant={{ base: 'base', sm: 'sm' }}
        fontWeight={'bold'}
        color={isSelected ? bgAlt : secondaryAlt}
        cursor={'pointer'}
        px={3}
        py={2}
      >
        {title}
      </Text>
    </Box>
  );
};

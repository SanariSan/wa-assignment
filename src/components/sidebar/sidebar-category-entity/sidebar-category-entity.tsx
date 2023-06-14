import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useState, memo } from 'react';
import { COLORS } from '../../../chakra-setup';

interface ISidebarCategoryEntity {
  title: string;
  isSelected: boolean;
  onSelect: () => void;
  isSidebarOpened: boolean;
}

const SidebarCategoryEntity: FC<ISidebarCategoryEntity> = ({
  title,
  isSelected,
  onSelect,
  isSidebarOpened,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inactive, secondaryAlt, impact, impactHover, impactActive] = [
    useColorModeValue(COLORS.blue[500], COLORS.blue[600]),
    useColorModeValue(COLORS.blue[600], COLORS.blue[500]),
    useColorModeValue(COLORS.yellow[400], COLORS.yellow[400]),
    useColorModeValue(COLORS.yellow[500], COLORS.yellow[500]),
    useColorModeValue(COLORS.yellow[300], COLORS.yellow[300]),
  ];

  return (
    <Flex
      position={'relative'}
      h={'50px'}
      minH={'50px'}
      direction={'row'}
      alignItems={'center'}
      cursor={'pointer'}
      onClick={onSelect}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Box
        position={'absolute'}
        left={0}
        ml={{ base: '3px', sm: '1px' }}
        w={'2px'}
        h={'100%'}
        bg={inactive}
      />
      <Flex h={'100%'} direction={'row'} alignItems={'center'}>
        <Box
          position={'absolute'}
          ml={{ base: '3px', sm: '1px' }}
          w={'3px'}
          h={'50%'}
          borderRadius={'30px'}
          bg={isSelected ? impact : 'transparent'}
        />
        <Text
          pl={8}
          variant={{ base: 'sm' }}
          opacity={isSidebarOpened ? 1 : 0}
          color={isSelected ? impactHover : isHovered ? impactActive : secondaryAlt}
          textTransform={'capitalize'}
          transform={isHovered ? 'translateX(3px)' : 'none'}
          transition={
            'transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.1s linear, color 0.1s linear'
          }
        >
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

const SidebarCategoryEntityMemo = memo(SidebarCategoryEntity);

export { SidebarCategoryEntityMemo };

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import type { IconProps } from '@chakra-ui/react';
import {
  Spinner,
  Box,
  Circle,
  Flex,
  Text,
  useColorModeValue,
  Icon as IconChakra,
} from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import { AiFillWarning } from 'react-icons/ai';
import { COLORS } from '../../../chakra-setup';
import type { TLoadingStatus } from '../../../store/slices/slices.type';

interface ISidebarSectionEntity {
  isSidebarOpened: boolean;
  icon: (props: IconProps) => JSX.Element;
  title: string;
  isDisabled?: boolean;
  isSelected: boolean;
  hasCategory: boolean;
  categoriesLoadingStatus: TLoadingStatus;
  isCategoryUnfolded: boolean;
  onSubUnfold: () => void;
  onSelect: () => void;
}

const SidebarSectionEntity: FC<ISidebarSectionEntity> = ({
  isSidebarOpened,
  icon: Icon,
  title,
  isSelected,
  isDisabled = false,
  hasCategory,
  categoriesLoadingStatus,
  isCategoryUnfolded,
  onSubUnfold,
  onSelect,
}) => {
  const [inactive, inactiveAlt, secondaryAlt, wrapBg, accent, impact, hover, secondary, warning] = [
    useColorModeValue(COLORS.blue[500], COLORS.blue[600]),
    useColorModeValue(COLORS.blue[400], COLORS.blue[600]),
    useColorModeValue(COLORS.blue[600], COLORS.blue[500]),
    useColorModeValue(COLORS.white[300], COLORS.darkBlue[300]),
    useColorModeValue(COLORS.blue[800], COLORS.white[900]),
    useColorModeValue(COLORS.yellow[400], COLORS.yellow[400]),
    useColorModeValue(COLORS.white[100], COLORS.darkBlue[400]),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
    useColorModeValue(COLORS.yellow[400], COLORS.yellow[400]),
  ];

  return (
    <Flex
      w={'100%'}
      h={'50px'}
      minH={'50px'}
      direction={'row'}
      color={isSelected ? accent : secondaryAlt}
      bg={isSelected ? wrapBg : 'transparent'}
      _hover={{
        bg: isSelected ? wrapBg : hover,
      }}
      borderRadius={'0 25px 25px 0'}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
    >
      <Box
        opacity={isSelected ? 1 : 0}
        transition={'opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)'}
        h={'100%'}
        w={'12px'}
        minW={'12px'}
        maxW={'12px'}
        bg={impact}
        clipPath={'polygon(0 0, 0% 100%, 100% 50%)'}
      />
      <Flex
        w={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        overflowX={'hidden'}
        onClick={() => {
          if (isDisabled) return;
          onSelect();
        }}
        transition={'transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1)'}
        _hover={{
          transform: 'translateX(3px)',
        }}
        position={'relative'}
      >
        <Icon
          boxSize={{ base: 4, sm: 5 }}
          ml={{ base: 4, sm: 5 }}
          color={isSelected ? impact : inactive}
          _hover={{
            color: isSelected ? impact : secondaryAlt,
          }}
          opacity={isDisabled ? 0.4 : 1}
        />

        <Text
          pl={{ base: 4, sm: 5 }}
          variant={{ base: 'sm' }}
          opacity={isSidebarOpened ? (isDisabled ? 0.4 : 1) : 0}
          transition={'opacity 0.1s linear'}
          textTransform={'capitalize'}
        >
          {title}
        </Text>

        {hasCategory && (
          <Box
            ml={'auto'}
            mr={5}
            opacity={isSidebarOpened ? 1 : 0}
            transition={'opacity 0.1s linear'}
            onClick={(e) => {
              e.stopPropagation();
              if (isDisabled) return;
              onSubUnfold();
            }}
          >
            {categoriesLoadingStatus === 'loading' ? (
              <Spinner size="xs" />
            ) : categoriesLoadingStatus === 'failure' ? (
              <IconChakra as={AiFillWarning} boxSize={3} color={warning} />
            ) : (
              <Circle size={'18px'} border={'2px'} borderColor={secondary}>
                {isCategoryUnfolded ? (
                  <ChevronUpIcon color={inactiveAlt} />
                ) : (
                  <ChevronDownIcon color={inactiveAlt} />
                )}
              </Circle>
            )}
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

const SidebarSectionEntityMemo = memo(SidebarSectionEntity);

export { SidebarSectionEntityMemo };

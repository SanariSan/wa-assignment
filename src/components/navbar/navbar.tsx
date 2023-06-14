import { Search2Icon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Circle,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Portal,
  Spacer,
  Tooltip,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { memo, useCallback, useMemo, useState } from 'react';
import logo from '../../../assets/logo.png';
import { COLORS } from '../../chakra-setup';
import { changeRoute } from '../../containers/functional';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useThrottledState } from '../../hooks/use-throttled-state';
import { ASSETS } from '../../services/api';
import {
  guideHasTriedOpeningCartSelector,
  guideHasTriedPuttingEntitesToCartSelector,
  guideHasTriedThemeChangeSelector,
  initiateColorModeChangeUi,
  setHasTriedOpeningCart,
  setHasTriedThemeChange,
  setIsCartOpenedUi,
  uiCartStateSelector,
  uiColorModeAnimationDurationSelector,
  uiColorModeChangeStatusSelector,
  uiIsMobileSelector,
} from '../../store';
import { HamburgerIcon } from '../icons';
import { SkeletonPlaceholderComponentMemo } from '../skeleton';
import { NavbarIconsContainerMemo } from './icons';
import { ANIMATION_KEYFRAMES } from './keyframes.navbar.const';

interface INavbarComponent {
  onSidebarToggle: () => void;
}

const NavbarComponent: React.FC<INavbarComponent> = ({ onSidebarToggle }) => {
  const d = useAppDispatch();
  const [isToolbarOpened, setIsToolbarOpened] = useState(false);
  const { colorMode } = useColorMode();
  const hasTriedThemeChange = useAppSelector(guideHasTriedThemeChangeSelector);
  const hasTriedOpeningCart = useAppSelector(guideHasTriedOpeningCartSelector);
  const hasTriedPuttingEntitesToCart = useAppSelector(guideHasTriedPuttingEntitesToCartSelector);
  const isCartOpened = useAppSelector(uiCartStateSelector);

  const colorModeChangeStatus = useAppSelector(uiColorModeChangeStatusSelector);
  const isMobile = useAppSelector(uiIsMobileSelector);
  const colorModeChangeAnimationDuration = useAppSelector(uiColorModeAnimationDurationSelector);
  const throttledColorModeChangeStatus = useThrottledState({
    state: colorModeChangeStatus,
    replicateCondition: colorModeChangeStatus === 'completed',
    delay: isMobile ? colorModeChangeAnimationDuration : colorModeChangeAnimationDuration + 150,
  });

  const isThemeChanging = useMemo(
    () => colorModeChangeStatus !== 'completed' || throttledColorModeChangeStatus !== 'completed',
    [colorModeChangeStatus, throttledColorModeChangeStatus],
  );

  const [inactive, secondaryAlt, secondary, hoverColor, impact, border, inputHover] = [
    useColorModeValue(COLORS.blue[500], COLORS.blue[600]),
    useColorModeValue(COLORS.blue[600], COLORS.blue[500]),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
    useColorModeValue(COLORS.white[300], COLORS.darkBlue[400]),
    useColorModeValue(COLORS.yellow[400], COLORS.yellow[400]),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
    useColorModeValue(COLORS.white[100], COLORS.darkBlue[300]),
  ];

  const usePortal =
    useBreakpointValue({
      base: true,
      md: false,
    }) ?? true;

  const hover = useMemo(
    () => ({
      transform: 'perspective(100px) translateZ(4px)',
    }),
    [],
  );

  const active = useMemo(
    () => ({
      transform: 'perspective(100px) translateZ(-2px)',
    }),
    [],
  );

  const animation = useMemo(() => `${ANIMATION_KEYFRAMES} 20s ease-in-out 5s infinite`, []);

  const toggleToolbarCb = useCallback(() => {
    setIsToolbarOpened((_) => !_);
  }, []);

  const onCartToggleCb = useCallback(() => {
    toggleToolbarCb();

    void d(setHasTriedOpeningCart(true));
    void d(setIsCartOpenedUi({ isOpened: 'toggle' }));
  }, [d, toggleToolbarCb]);

  const profileClickCb = useCallback(() => {
    changeRoute('/login');
  }, []);

  const onAvatarClickCb = useBreakpointValue(
    {
      base: toggleToolbarCb,
      md: profileClickCb,
    },
    {
      fallback: 'desktop',
    },
  );

  const onThemeToggleCb = useCallback(() => {
    void d(setHasTriedThemeChange(true));
    void d(initiateColorModeChangeUi());

    return;
  }, [d]);

  return (
    <Flex
      direction={'row'}
      alignItems={'center'}
      h={'100%'}
      py={4}
      gap={{ base: 4, sm: 6 }}
      px={6}
      overflow={'hidden'}
    >
      <Image
        src={logo}
        filter={'auto'}
        brightness={'100%'}
        objectFit={'contain'}
        maxH={{ base: '30px', sm: 'max-content' }}
        as={motion.img}
        animation={animation}
      />

      <Box h={'100%'} w={'2px'} minW={'2px'} bg={secondary} />

      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        w={'450px'}
        minW={{ base: '25px', md: '250px' }}
        gap={6}
      >
        <HamburgerIcon
          boxSize={{ base: 4, sm: 5 }}
          color={inactive}
          _hover={{
            color: secondaryAlt,
          }}
          _active={{
            color: inactive,
          }}
          onClick={onSidebarToggle}
        />

        <Tooltip
          label="I'm useless, don't even bother 🙃"
          placement={'bottom'}
          closeOnClick={false}
          hasArrow
          arrowSize={10}
        >
          <InputGroup
            variant={{ base: 'base', sm: 'sm' }}
            w={'max-content'}
            maxW={'300px'}
            display={{ base: 'flex', sm: 'flex' }}
            borderStyle={'dashed'}
            borderColor={border}
            borderWidth={'1px'}
            borderRadius={'20px'}
          >
            <InputLeftElement
              pl={'20px'}
              pointerEvents="none"
              children={<Search2Icon boxSize={4} color="gray.300" />}
            />
            <Input
              type="text"
              // variant={{ base: 'base', sm: 'sm' }}
              // TODO: figure out why Input preset not working
              fontSize={{ base: '14px', sm: '16px' }}
              placeholder="Search"
              bg={hoverColor}
              _hover={{
                bg: inputHover,
              }}
              borderRadius={'20px'}
              pl={12}
            />
          </InputGroup>
        </Tooltip>
      </Flex>

      <Spacer />

      <Flex direction={'row'} alignItems={'center'} gap={4}>
        {usePortal ? (
          <Portal>
            <NavbarIconsContainerMemo
              isOpened={isToolbarOpened}
              onCartToggle={onCartToggleCb}
              isThemeToggleAvailable={colorModeChangeStatus === 'completed'}
              currentTheme={colorMode}
              hasTriedThemeChange={hasTriedThemeChange}
              hasTriedOpeningCart={hasTriedOpeningCart}
              hasTriedPuttingEntitesToCart={hasTriedPuttingEntitesToCart}
              isCartOpened={isCartOpened}
              onThemeToggle={onThemeToggleCb}
              onProfileClick={profileClickCb}
            />
          </Portal>
        ) : (
          <NavbarIconsContainerMemo
            isOpened={isToolbarOpened}
            onCartToggle={onCartToggleCb}
            isThemeToggleAvailable={colorModeChangeStatus === 'completed'}
            currentTheme={colorMode}
            hasTriedThemeChange={hasTriedThemeChange}
            hasTriedOpeningCart={hasTriedOpeningCart}
            hasTriedPuttingEntitesToCart={hasTriedPuttingEntitesToCart}
            isCartOpened={isCartOpened}
            onThemeToggle={onThemeToggleCb}
            onProfileClick={profileClickCb}
          />
        )}

        <Circle
          size={10}
          cursor={'pointer'}
          onClick={onAvatarClickCb}
          borderRadius={'999999px'}
          background={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%23${impact.slice(
            1,
          )}' stroke-width='3' stroke-dasharray='4%2c10' stroke-dashoffset='66' stroke-linecap='square'/%3e%3c/svg%3e");`}
          transform={'perspective(100px) translateZ(0px)'}
          transition={'transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)'}
          _hover={hover}
          _active={active}
          _focus={hover}
        >
          {isThemeChanging ? (
            <SkeletonPlaceholderComponentMemo
              width={'80%'}
              height={'80%'}
              borderRadius={'999999px'}
              isLoading={true}
            />
          ) : (
            <Avatar
              src={ASSETS.PFP}
              bg={impact}
              objectFit={'contain'}
              borderRadius={'999999px'}
              w={'80%'}
              h={'80%'}
              animation={'none'}
            />
          )}
        </Circle>
      </Flex>
    </Flex>
  );
};

export const NavbarComponentMemo = memo(NavbarComponent);

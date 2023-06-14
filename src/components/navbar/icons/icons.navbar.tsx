import { BellIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import type { ColorMode, PlacementWithLogical } from '@chakra-ui/react';
import { Flex, Icon, Tooltip, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { COLORS } from '../../../chakra-setup';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useDebounce } from '../../../hooks/use-debounce';
import { setColorModeToggleCoordsUi, uiScreenDetailsSelector } from '../../../store';
import { CartIcon } from '../../icons';

const NavbarIconsContainer: FC<{
  isOpened: boolean;
  isThemeToggleAvailable: boolean;
  currentTheme: ColorMode;
  hasTriedThemeChange: boolean;
  hasTriedOpeningCart: boolean;
  hasTriedPuttingEntitesToCart: boolean;
  isCartOpened: boolean;
  onCartToggle: () => void;
  onThemeToggle: () => void;
  onProfileClick: () => void;
}> = ({
  isOpened,
  isThemeToggleAvailable,
  currentTheme,
  hasTriedThemeChange,
  hasTriedOpeningCart,
  hasTriedPuttingEntitesToCart,
  isCartOpened,
  onCartToggle,
  onThemeToggle,
  onProfileClick,
}) => {
  const d = useAppDispatch();
  const screenDetails = useAppSelector(uiScreenDetailsSelector);
  const refIcons = useRef<HTMLDivElement | null>(null);
  const [appearDelayExpired, setAppearDelayExpired] = useState(false);
  const [inactive, secondaryAlt, border, bg] = [
    useColorModeValue(COLORS.blue[500], COLORS.blue[600]),
    useColorModeValue(COLORS.blue[600], COLORS.blue[500]),
    useColorModeValue(COLORS.white[300], COLORS.darkBlue[200]),
    useColorModeValue(COLORS.white[200], COLORS.darkBlue[500]),
  ];

  const base = useMemo(() => ({ x: 25, y: 55 }), []);
  const md = useMemo(() => ({ x: 10, y: 10 }), []);
  const fallback = useMemo(() => ({ x: 10, y: 40 }), []);
  const colorModeIconOffset =
    useBreakpointValue(
      {
        base,
        md,
      },
      {
        fallback: 'base',
      },
    ) ?? fallback;

  const colorModeTooltipPos = (useBreakpointValue({
    base: 'left',
    md: !hasTriedOpeningCart ? 'left' : 'bottom',
  }) ?? 'bottom') as PlacementWithLogical;

  const cartTooltipPos = (useBreakpointValue({
    base: 'left',
    md: 'bottom',
  }) ?? 'bottom') as PlacementWithLogical;

  const colorModeTooltipIsOpened =
    useBreakpointValue({
      base: !hasTriedThemeChange && appearDelayExpired && isOpened && !isCartOpened,
      md: !hasTriedThemeChange && appearDelayExpired && !isCartOpened,
    }) ?? false;

  const cartTooltipIsOpened =
    useBreakpointValue({
      base:
        hasTriedPuttingEntitesToCart &&
        !hasTriedOpeningCart &&
        appearDelayExpired &&
        isOpened &&
        !isCartOpened,
      md:
        hasTriedPuttingEntitesToCart && !hasTriedOpeningCart && appearDelayExpired && !isCartOpened,
    }) ?? false;

  const updateIconsCoordsCb = useCallback(() => {
    if (refIcons.current !== null) {
      const { x, y } = refIcons.current.getBoundingClientRect();
      void d(
        setColorModeToggleCoordsUi({ x: x + colorModeIconOffset.x, y: y + colorModeIconOffset.y }),
      );
    }
  }, [d, colorModeIconOffset]);
  const [updateIconsCoordsDebounced] = useDebounce({ cb: updateIconsCoordsCb, delay: 350 });

  useEffect(() => {
    updateIconsCoordsDebounced();
  }, [d, screenDetails, updateIconsCoordsDebounced]);

  const themeSwitchProps = useMemo(
    () => ({
      boxSize: { base: 4, md: 5 },
      color: inactive,
      _hover: {
        color: secondaryAlt,
      },
      _active: {
        color: inactive,
      },
      cursor: 'pointer',
      onClick: isThemeToggleAvailable ? onThemeToggle : undefined,
    }),
    [inactive, isThemeToggleAvailable, onThemeToggle, secondaryAlt],
  );

  useEffect(() => {
    let timer: NodeJS.Timer;

    if (!appearDelayExpired) {
      timer = setTimeout(() => {
        setAppearDelayExpired(true);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [appearDelayExpired]);

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      position={{ base: 'absolute', md: 'unset' }}
      width={{ base: '60px', md: 'max-content' }}
      maxHeight={{ base: isOpened ? '150px' : '0px', md: 'max-content' }}
      overflow={'hidden'}
      right={3}
      top={77}
      alignItems={'center'}
      gap={4}
      borderStyle={'dashed'}
      borderColor={{ base: isOpened ? border : 'transparent', md: 'transparent' }}
      borderWidth={{ base: '1px', md: '0px' }}
      borderRadius={'100px'}
      ref={refIcons}
      zIndex={1}
    >
      <Icon
        display={{ base: 'flex', md: 'none' }}
        as={BiUserCircle}
        mt={{ base: 4, md: 0 }}
        boxSize={{ base: 4, md: 5 }}
        color={inactive}
        onClick={onProfileClick}
        _hover={{
          color: secondaryAlt,
        }}
        _active={{
          color: inactive,
        }}
        cursor={'pointer'}
      />
      <Tooltip
        label="Try clicking me!"
        placement={colorModeTooltipPos}
        isOpen={colorModeTooltipIsOpened}
        hasArrow
        arrowSize={10}
      >
        {currentTheme === 'light' ? (
          <MoonIcon {...themeSwitchProps} />
        ) : (
          <SunIcon {...themeSwitchProps} />
        )}
      </Tooltip>
      <BellIcon
        boxSize={{ base: 4, md: 5 }}
        color={inactive}
        _hover={{
          color: secondaryAlt,
        }}
        _active={{
          color: inactive,
        }}
        cursor={'pointer'}
      />
      <Tooltip
        label="Time to spend some CASH!"
        placement={cartTooltipPos}
        isOpen={cartTooltipIsOpened}
        hasArrow
        arrowSize={10}
      >
        <Flex mb={{ base: 4, md: 0 }}>
          <CartIcon
            boxSize={{ base: 4, md: 5 }}
            color={inactive}
            _hover={{
              color: secondaryAlt,
            }}
            _active={{
              color: inactive,
            }}
            onClick={onCartToggle}
          />
        </Flex>
      </Tooltip>
      <Flex
        position={{ base: 'absolute', md: 'unset' }}
        width={{ base: '70px', md: '0px' }}
        height={'100%'}
        maxHeight={{ base: isOpened ? '150px' : '0px', md: 'max-content' }}
        opacity={0.9}
        transition={'opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)'}
        background={bg}
        zIndex={-1}
      />
    </Flex>
  );
};

const NavbarIconsContainerMemo = memo(NavbarIconsContainer);

export { NavbarIconsContainerMemo };

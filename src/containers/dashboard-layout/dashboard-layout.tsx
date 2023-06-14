import { Box, Button, Grid, GridItem, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useCallback } from 'react';
import { COLORS } from '../../chakra-setup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setIsSidebarOpenedUi, uiSidebarStateSelector } from '../../store';
import type { TDashboardLayout } from './dashboard-layout.type';

const DashboardLayoutContainer: FC<TDashboardLayout> = () => {
  const d = useAppDispatch();
  const isSidebarOpened = useAppSelector(uiSidebarStateSelector);
  // const { w, h } = useAppSelector(uiScreenDetailsSelector);

  const [bg, bgAlt, border] = [
    useColorModeValue(COLORS.white[200], COLORS.darkBlue[500]),
    useColorModeValue(COLORS.white[900], COLORS.darkBlue[600]),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
  ];

  const sidebarToggleCb = useCallback(
    (payload?: { isOpened: boolean }) => {
      void d(setIsSidebarOpenedUi({ isOpened: payload?.isOpened ?? 'toggle' }));
    },
    [d],
  );

  return (
    <Grid
      h={'100%'}
      maxH={'100%'}
      w={'100%'}
      templateRows={'auto'}
      templateColumns={{
        base: isSidebarOpened ? '100% 0px' : '0px 100%',
        md: '400px 1fr',
      }}
      templateAreas={`"side main"`}
      transition={'0.3s ease-in-out'}
    >
      <GridItem
        area={'side'}
        bg={bg}
        zIndex={1}
        borderStyle={'dashed'}
        borderColor={border}
        borderWidth={'1px'}
        overflow={'hidden'}
      >
        <Box bg={bgAlt} overflow={'hidden'} position={'relative'} w={'100%'} h={'100%'}>
          <Text>Side</Text>
          <Button
            onClick={() => {
              sidebarToggleCb();
            }}
            display={{ base: 'block', md: 'none' }}
          >
            X
          </Button>
        </Box>
      </GridItem>

      <GridItem area={'main'} position={'relative'} overflowY={'auto'} overflowX={'hidden'}>
        <Box bg={bgAlt} overflow={'hidden'} position={'relative'} w={'100%'} h={'100%'}>
          <Text>Main</Text>
          <Button
            onClick={() => {
              sidebarToggleCb();
            }}
            display={{ base: 'block', md: 'none' }}
          >
            X
          </Button>
        </Box>
      </GridItem>
    </Grid>
  );
};

export { DashboardLayoutContainer };

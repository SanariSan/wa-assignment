import { Box } from '@chakra-ui/react';
import type { FC } from 'react';
import { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DashboardLayoutContainer } from './containers/dashboard-layout';
import {
  AuthenticatedAccessContainer,
  ErrorBoundaryGenericContainerMemo,
  LocationTrackerContainerMemo,
  ScreenDetailsTrackerContainerMemo,
} from './containers/functional';
import { LoadingTrackerProgressContainer } from './containers/loading-tracker-progress';
import { LoginContainer } from './containers/login';
import { NotFoundContainerMemo } from './containers/not-found';
import { ThemeSwitchContainerMemo } from './containers/theme-switch';
import { ToastsContainerMemo } from './containers/toast/toast';

const App: FC = () => {
  const screenshotTargetRef = useRef(null);

  return (
    <ErrorBoundaryGenericContainerMemo>
      <ThemeSwitchContainerMemo screenshotTargetRef={screenshotTargetRef} />
      <LoadingTrackerProgressContainer />
      <LocationTrackerContainerMemo />
      <ScreenDetailsTrackerContainerMemo />
      <ToastsContainerMemo />

      <Box
        ref={screenshotTargetRef}
        display={'flex'}
        w={'100%'}
        h={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Switch>
          <Route exact path={'/'}>
            <AuthenticatedAccessContainer mustBe={'authenticated'} redirectLocation={'/login'}>
              <DashboardLayoutContainer />
              {/* <HomeContainerMemo /> */}
            </AuthenticatedAccessContainer>
          </Route>
          <Route exact path="/login">
            <AuthenticatedAccessContainer mustBe={'unauthenticated'} redirectLocation={'/'}>
              <LoginContainer />
            </AuthenticatedAccessContainer>
          </Route>
          <Route path="/">
            <NotFoundContainerMemo />
          </Route>
        </Switch>
        {/* <DebugContainer /> */}
      </Box>
    </ErrorBoundaryGenericContainerMemo>
  );
};
export { App };

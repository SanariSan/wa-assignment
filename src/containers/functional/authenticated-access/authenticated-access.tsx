import { Box, Spinner, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useMemo, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { COLORS } from '../../../chakra-setup';
import { ELOG_LEVEL } from '../../../general.type';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { publishLog } from '../../../modules/access-layer/events/pubsub';
import {
  checkUserAuthStatusAsync,
  setUserAuthLoadStatus,
  userAuthIsAuthenticatedSelector,
  userAuthLoadingStatusSelector,
} from '../../../store';
import type { TAuthRoute } from './authenticated-access.type';

const AuthenticatedAccessContainer: FC<TAuthRoute> = ({ children, mustBe, redirectLocation }) => {
  const d = useAppDispatch();
  const isAuthenticated = useAppSelector(userAuthIsAuthenticatedSelector);
  const isAuthenticatedMapped = useMemo(
    () =>
      isAuthenticated === true
        ? 'authenticated'
        : isAuthenticated === false
        ? 'unauthenticated'
        : 'any',
    [isAuthenticated],
  );
  const loadingStatus = useAppSelector(userAuthLoadingStatusSelector);
  const [spinner] = [useColorModeValue(COLORS.yellow[400], COLORS.yellow[400])];
  const initialCheckCompleted = useRef(false);

  useEffect(() => {
    publishLog(ELOG_LEVEL.DEBUG, {
      isAuthenticated,
      mustBe,
      redirectLocation,
    });
  }, [isAuthenticated, mustBe, redirectLocation]);

  // reset loading if user refreshed page during last auth attempt
  // every section wrapped in this container, so check is triggered on any page, only 1 time
  useEffect(() => {
    if (initialCheckCompleted.current) return;
    initialCheckCompleted.current = true;
    if (loadingStatus === 'loading') void d(setUserAuthLoadStatus({ status: 'idle' }));
  }, [d, loadingStatus]);

  useEffect(() => {
    if (isAuthenticated === 'idle') void d(checkUserAuthStatusAsync());
  }, [d, isAuthenticated]);

  if (isAuthenticated === 'idle') {
    return (
      <Box
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          visibility: loadingStatus === 'loading' ? 'visible' : 'hidden',
          zIndex: 1,
        }}
      >
        <Spinner size={'xl'} color={spinner} thickness={'3px'} />
      </Box>
    );
  }

  return (
    <>
      {mustBe === 'any' || mustBe === isAuthenticatedMapped ? (
        children
      ) : (
        <Redirect to={redirectLocation ?? ''} />
      )}
    </>
  );
};

export { AuthenticatedAccessContainer };

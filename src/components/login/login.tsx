import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form as FormikForm } from 'formik';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { COLORS } from '../../chakra-setup';
import { changeRoute } from '../../containers/functional';
import type { TLogin } from './login.type';

const LoginComponent: FC<TLogin> = ({ isLoading, ...rest }) => {
  const { handleSubmit, errors, touched } = rest;
  const [hidden, setHidden] = useState(true);
  const [impact, btnColor, errorMsg, inactive, secondaryAlt] = [
    useColorModeValue(COLORS.yellow[400], COLORS.yellow[400]),
    useColorModeValue(COLORS.blue[800], COLORS.darkBlue[600]),
    useColorModeValue(COLORS.red[500], COLORS.red[300]),
    useColorModeValue(COLORS.blue[500], COLORS.blue[600]),
    useColorModeValue(COLORS.blue[600], COLORS.blue[500]),
  ];

  const toggleHidden = useCallback(() => {
    setHidden((s) => !s);
  }, []);

  return (
    <FormikForm
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Flex w={'100%'} h={'100%'} alignItems={'center'} justifyContent={'center'} p={9}>
        <Flex
          w={'max-content'}
          h={'max-content'}
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={5}
        >
          <Text variant={'xxxl'}>Log in</Text>

          <Flex direction={'column'} alignItems={'flex-start'} gap={3} w={'100%'}>
            <Text fontWeight={'bold'} variant={'md'}>
              Username
            </Text>
            <InputGroup size="md">
              <Input
                as={Field}
                className="mb-1"
                isInvalid={touched.username !== undefined && errors.username !== undefined}
                type="text"
                name="username"
                aria-label="username"
                placeholder="Enter username"
              />
            </InputGroup>
            <ErrorMessage name="username">
              {(errorMessage: string) => (
                <Text variant={'sm'} color={errorMsg}>
                  {errorMessage}
                </Text>
              )}
            </ErrorMessage>
          </Flex>

          <Flex direction={'column'} alignItems={'flex-start'} gap={3} w={'100%'}>
            <Text fontWeight={'bold'} variant={'md'}>
              Password
            </Text>
            <InputGroup size="md">
              <Input
                as={Field}
                className="mb-1"
                isInvalid={touched.password !== undefined && errors.password !== undefined}
                type={hidden ? 'password' : 'text'}
                name="password"
                placeholder="Password"
              />
              <InputRightElement width="40px">
                <Icon
                  as={hidden ? AiFillEyeInvisible : AiFillEye}
                  onClick={toggleHidden}
                  boxSize={{ base: 4, sm: 5 }}
                  color={inactive}
                  _hover={{
                    color: secondaryAlt,
                  }}
                  _active={{
                    color: inactive,
                  }}
                  cursor={'pointer'}
                />
              </InputRightElement>
            </InputGroup>
            <ErrorMessage name="password">
              {(errorMessage: string) => (
                <Text variant={'sm'} color={errorMsg}>
                  {errorMessage}
                </Text>
              )}
            </ErrorMessage>
          </Flex>

          <Flex w={'100%'} alignItems={'center'} justifyContent={'center'} gap={6}>
            <Button
              type={'submit'}
              colorScheme={'yellow'}
              size={{ base: 'sm', sm: 'md' }}
              bg={impact}
              color={btnColor}
              opacity={1}
              _disabled={{
                opacity: 0.5,
              }}
              isDisabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Log in'}
            </Button>

            <Button
              variant={'outline'}
              size={{ base: 'sm', sm: 'md' }}
              isDisabled={isLoading}
              onClick={() => {
                changeRoute('/register');
              }}
            >
              Sign up instead
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </FormikForm>
  );
};

export { LoginComponent };

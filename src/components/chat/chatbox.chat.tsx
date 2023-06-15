import type { FormikProps } from 'formik';
import { ErrorMessage, Field, Form as FormikForm } from 'formik';
import type { FC, FormEventHandler } from 'react';
import { memo } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { COLORS } from '../../chakra-setup';
import type { TChatboxFormValues } from '../../containers/chat';

type TProps = FormikProps<TChatboxFormValues>;
type TChatboxComponent = {
  [TKey in keyof TProps]: TProps[TKey];
} & {
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

const ChatboxComponent: FC<TChatboxComponent> = ({ ...rest }) => {
  const { handleSubmit, errors, touched } = rest;
  const [navBg, textColorAltDark, errorMsg, active] = [
    useColorModeValue(COLORS.whatsapp.navBgDark, COLORS.whatsapp.navBgDark),
    useColorModeValue(COLORS.whatsapp.textColorAltDark, COLORS.whatsapp.textColorAltDark),
    useColorModeValue(COLORS.red[500], COLORS.red[300]),
    useColorModeValue(COLORS.whatsapp.activeDark, COLORS.whatsapp.activeDark),
  ];

  return (
    <FormikForm
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Flex w={'100%'} h={'100%'} alignItems={'center'} justifyContent={'center'} p={3}>
        <InputGroup size="md">
          <Input
            as={Field}
            isInvalid={touched.message !== undefined && errors.message !== undefined}
            name="message"
            type="text"
            aria-label="message"
            placeholder="Enter your message"
            borderRadius={'10px'}
            bg={navBg}
            focusBorderColor={active}
            _placeholder={{ color: textColorAltDark }}
          />
          <InputRightElement width="50px">
            <Button type={'submit'} size={'xs'} borderRadius={'20px'}>
              <ArrowForwardIcon boxSize={{ base: 3, sm: 4 }} cursor={'pointer'} />
            </Button>
          </InputRightElement>
        </InputGroup>
        <ErrorMessage name="message">
          {(errorMessage: string) => (
            <Text variant={'xs'} color={errorMsg} pl={4}>
              {errorMessage}
            </Text>
          )}
        </ErrorMessage>
      </Flex>
    </FormikForm>
  );
};

const ChatboxComponentMemo = memo(ChatboxComponent);

export { ChatboxComponentMemo };

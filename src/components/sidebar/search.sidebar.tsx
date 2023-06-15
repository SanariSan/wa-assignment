import type { FormikProps } from 'formik';
import { ErrorMessage, Field, Form as FormikForm } from 'formik';
import type { FC, FormEventHandler } from 'react';
import { memo } from 'react';

import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import type { TSidebarSearchFormValues } from '../../containers/sidebar/search';
import { COLORS } from '../../chakra-setup';

type TProps = FormikProps<TSidebarSearchFormValues>;
type TSidebarSearchComponent = {
  [TKey in keyof TProps]: TProps[TKey];
} & {
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

const SidebarSearchComponent: FC<TSidebarSearchComponent> = ({ ...rest }) => {
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
      <Flex
        w={'100%'}
        direction={'column'}
        p={3}
        alignItems={'flex-start'}
        justifyContent={'center'}
      >
        <InputGroup size="md">
          <Input
            as={Field}
            isInvalid={touched.contact !== undefined && errors.contact !== undefined}
            name="contact"
            type="text"
            aria-label="contact"
            placeholder="Enter friend's phone"
            borderRadius={'10px'}
            bg={navBg}
            focusBorderColor={active}
            _placeholder={{ color: textColorAltDark }}
          />
          <InputRightElement width="40px">
            <Button type={'submit'} size={'xs'} borderRadius={'20px'}>
              <AddIcon boxSize={{ base: 2, sm: 3 }} cursor={'pointer'} />
            </Button>
          </InputRightElement>
        </InputGroup>
        <ErrorMessage name="contact">
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

const SidebarSearchComponentMemo = memo(SidebarSearchComponent);

export { SidebarSearchComponentMemo };

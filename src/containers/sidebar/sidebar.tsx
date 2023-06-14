import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useCallback } from 'react';
import { COLORS } from '../../chakra-setup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  contactsSelector,
  pushContacts,
  setSelectedContactIdxUi,
  uiSelectedContactIdxSelector,
  uiSidebarStateSelector,
} from '../../store';
import { ContactCardContainerMemo } from '../contact-card';

interface ISidebarContainer {
  [key: string]: unknown;
  sidebarToggleCb: () => void;
}

const SidebarContainer: FC<ISidebarContainer> = ({ sidebarToggleCb }) => {
  const d = useAppDispatch();
  const isSidebarOpened = useAppSelector(uiSidebarStateSelector);
  const contacts = useAppSelector(contactsSelector);
  const selectedContactsIdx = useAppSelector(uiSelectedContactIdxSelector);

  const [bg, navBg, border, textColorDark, textColorAltDark] = [
    useColorModeValue(COLORS.whatsapp.bgDark, COLORS.whatsapp.bgDark),
    useColorModeValue(COLORS.whatsapp.navBgDark, COLORS.whatsapp.navBgDark),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
    useColorModeValue(COLORS.whatsapp.textColorDark, COLORS.whatsapp.textColorDark),
    useColorModeValue(COLORS.whatsapp.textColorAltDark, COLORS.whatsapp.textColorAltDark),
  ];

  const onSelectContactCb = useCallback(
    ({ contactIdx }: { contactIdx: number }) => {
      void d(setSelectedContactIdxUi({ contactIdx }));
      sidebarToggleCb();
      return;
    },
    [d, sidebarToggleCb],
  );

  return (
    <Flex direction={'column'} alignItems={'flex-start'} gap={0} w={'100%'} h={'100%'}>
      <Flex w={'100%'} p={3} alignItems={'center'} justifyContent={'center'}>
        <InputGroup size="md">
          <Input
            borderRadius={'10px'}
            bg={navBg}
            name="contact"
            placeholder="Enter friend's phone"
            focusBorderColor={'transparent'}
            _placeholder={{ color: textColorAltDark }}
          />
          <InputRightElement width="40px">
            <Button
              size={'sm'}
              borderRadius={'20px'}
              // background={wrapBg}
              // _hover={{ background: secondary }}
              // _active={{ background: wrapBg }}
              onClick={() => {
                void d(
                  pushContacts({
                    contacts: [{ wid: '79123123112', chatHistory: [], lastMessage: '' }],
                  }),
                );
              }}
            >
              <AddIcon boxSize={{ base: 2, sm: 3 }} cursor={'pointer'} />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>

      {contacts.map((el, idx) => (
        <ContactCardContainerMemo
          idx={idx}
          isSelected={selectedContactsIdx === idx}
          onSelect={onSelectContactCb}
          title={el.wid}
        />
      ))}
    </Flex>
  );
};

const SidebarContainerMemo = memo(SidebarContainer);

export { SidebarContainerMemo };

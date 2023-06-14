import { createSlice, current } from '@reduxjs/toolkit';
import type { TLoadingStatus } from '../slices.type';
import { GOODS_INIT_STATE } from './contacts.slice.const';
import type { TChatHistory, TContacts } from './contacts.slice.type';

/* eslint-disable no-param-reassign */

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: GOODS_INIT_STATE,
  reducers: {
    setContacts(
      state,
      action: {
        payload: {
          contacts: TContacts;
        };
        type: string;
      },
    ) {
      state.contacts = action.payload.contacts;
    },
    pushContacts(
      state,
      action: {
        payload: { contacts: TContacts };
        type: string;
      },
    ) {
      state.contacts.push(...action.payload.contacts);
    },
    setChatHistory(
      state,
      action: {
        payload: {
          contactWid: string;
          chatHistory: TChatHistory;
        };
        type: string;
      },
    ) {
      const targetContactIdx = current(state.contacts).findIndex(
        (el, i) => el.wid === action.payload.contactWid,
      );

      if (targetContactIdx === -1) return;

      state.contacts[targetContactIdx].chatHistory = action.payload.chatHistory;
    },
    setContactsLoadStatus(
      state,
      action: { payload: { status: TLoadingStatus; message?: string }; type: string },
    ) {
      state.loadingStatus = action.payload.status;
    },

    // sagas
    sendMessageAsync(state, action: { payload: { wid: string; message: string } }) {},
    fetchChatHistoryAsync(state, action: { payload: { id: string } }) {},
  },
});

const contacts = contactsSlice.reducer;
const {
  sendMessageAsync,
  fetchChatHistoryAsync,
  setContacts,
  pushContacts,
  setContactsLoadStatus,
} = contactsSlice.actions;

export {
  fetchChatHistoryAsync,
  sendMessageAsync,
  contacts,
  pushContacts,
  setContacts,
  setContactsLoadStatus,
};

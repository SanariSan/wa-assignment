import type { TLoadingStatus } from '../slices.type';

// type TEntities = TGoodsEntitiesIncomingSuccessFields['data']['entities'];
// type TCategories = TGoodsCategoriesIncomingSuccessFields['data']['categories'];
// type TSelectedCategory = Exclude<TCategories[number], undefined>;
// type TSelectedModifier = Exclude<TSelectedCategory['modifiers'], undefined>[number];

// todo: chat history comes from validate DTO

type TChatHistory = Array<{
  from: string;
}>;

type TContacts = Array<{
  wid: string;
  lastMessage: string;
  chatHistory: TChatHistory;
}>;

type TContactsInitState = {
  contacts: TContacts;
  loadingStatus: TLoadingStatus;
  // historyLoadingStatus: TLoadingStatus;
};

export type { TContactsInitState, TContacts, TChatHistory };

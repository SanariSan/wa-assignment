import type { IconProps } from '@chakra-ui/react';

type TSidebarTemplateEntity = {
  title: string;
  icon: (props: IconProps) => JSX.Element;
  pathname: string;
  subCategory: null | string;
};

type TSidebarTemplate = Array<TSidebarTemplateEntity | undefined>;

export type { TSidebarTemplate, TSidebarTemplateEntity };

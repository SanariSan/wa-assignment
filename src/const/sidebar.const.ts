import { QuestionIcon, SettingsIcon } from '@chakra-ui/icons';
import { BoxIcon, HeartIcon, HomeIcon } from '../components/icons';
import type { TSidebarTemplate } from './const.type';

export const SIDEBAR_TEMPLATE: TSidebarTemplate = [
  {
    title: 'home',
    icon: HomeIcon,
    pathname: '/',
    subCategory: null,
  },
  {
    title: 'discover',
    icon: BoxIcon,
    pathname: '/catalogue',
    subCategory: 'catalogue',
  },
  {
    title: 'liked',
    icon: HeartIcon,
    pathname: '/liked',
    subCategory: null,
  },
  {
    title: 'settings',
    icon: SettingsIcon,
    pathname: '/settings',
    subCategory: null,
  },
  {
    title: 'help',
    icon: QuestionIcon,
    pathname: '/help',
    subCategory: null,
  },
];

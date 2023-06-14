import type { IconProps } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';

export const CustomIcon = ({ viewBox, d, ...props }: IconProps) => (
  <Icon viewBox={viewBox} cursor={'pointer'} {...props}>
    <path fill={'currentColor'} d={d} />
  </Icon>
);

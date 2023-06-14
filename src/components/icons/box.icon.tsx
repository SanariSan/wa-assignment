import type { IconProps } from '@chakra-ui/react';
import { CustomIcon } from './custom.icon';

export const BoxIcon = (props: IconProps) => (
  <CustomIcon
    viewBox={'0 0 20 20'}
    d={
      'M2.26339 1.18304L0 5.71429H9.28571V0H4.18304C3.37054 0 2.62946 0.459821 2.26339 1.18304ZM10.7143 5.71429H20L17.7366 1.18304C17.3705 0.459821 16.6295 0 15.817 0H10.7143V5.71429ZM20 7.14286H0V17.1429C0 18.7188 1.28125 20 2.85714 20H17.1429C18.7188 20 20 18.7188 20 17.1429V7.14286Z'
    }
    {...props}
  />
);

import type { ButtonProps, PopconfirmProps } from 'naive-ui';

type OtherProps = {
  label: string;
  isPopConfirm?: boolean;
  popConfirmText?: string;
};

export type Props = {
  props: Array<ButtonProps & OtherProps & PopconfirmProps>;
};

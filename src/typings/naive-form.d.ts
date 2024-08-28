import type { FormItemRule, GridProps } from 'naive-ui';
import type { Component } from 'vue';

export type Rule = {
  required?: boolean;
  trigger?: 'input' | 'blur' | ['input' | 'blur'];
  message?: string;
  validator?: (rule: FormItemRule, value: string) => Promise<void>;
};

type Attribute = {
  [propsName: string]: any;
};

export type Config = {
  type: string | Component;
  label?: string;
  name: string;
  rule?: Rule[];
  slot?: string;
  options?: Array<{ value: any; label: string }>;
  attribute?: Attribute;
  span?: number;
};

type FormValues = {
  [k in Config['name']]: any;
};

export type Props = {
  formConfig: Config[];
  formValue: FormValues;
  gridConfig?: GridProps;
};

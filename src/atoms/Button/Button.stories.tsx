import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Karp/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args: any) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button',
  color: 'default',
  variant: 'primary',
  size: 'small',
};

export const PrimaryOutlined = Template.bind({});
PrimaryOutlined.args = {
  children: 'Button',
  color: 'primary',
  variant: 'outlined',
  size: 'small',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Button',
  color: 'default',
  variant: 'secondary',
  size: 'small',
};

export const SecondaryOutlined = Template.bind({});
SecondaryOutlined.args = {
  children: 'Button',
  color: 'secondary',
  variant: 'outlined',
  size: 'small',
};

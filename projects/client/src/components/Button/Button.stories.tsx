import { Story } from '@storybook/react';
import { Button, TButtonProps } from './';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template: Story<TButtonProps> = (args) => <Button {...args}>Click me!</Button>;

export const Default = Template.bind({});
export const Stretched = Template.bind({});

Stretched.args = {
  stretch: true,
};

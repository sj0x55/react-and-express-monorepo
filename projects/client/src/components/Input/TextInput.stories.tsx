import { Story } from '@storybook/react';
import { TextInput } from '.';

export default {
  title: 'Components/TextInput',
  component: TextInput,
};

const Template: Story = () => <TextInput />;

export const Default = Template.bind({});

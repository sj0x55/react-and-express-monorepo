import { Story } from '@storybook/react';
import { NumberInput } from '.';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
};

const Template: Story = () => <NumberInput />;

export const Default = Template.bind({});

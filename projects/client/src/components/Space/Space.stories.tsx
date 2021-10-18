import { Story } from '@storybook/react';
import { Space } from '.';

export default {
  title: 'Components/Space',
  component: Space,
};

const Template: Story = (args) => <Space {...args} />;

export const Default = Template.bind({});

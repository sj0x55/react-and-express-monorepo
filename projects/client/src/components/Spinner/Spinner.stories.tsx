import { Story } from '@storybook/react';
import { Spinner } from '.';

export default {
  title: 'Components/Spinner',
  component: Spinner,
};

const Template: Story = () => <Spinner />;

export const Default = Template.bind({});

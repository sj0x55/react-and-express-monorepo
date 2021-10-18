import { Story } from '@storybook/react';
import { Loading } from '.';

export default {
  title: 'Components/Loading',
  component: Loading,
};

const Template: Story = () => <Loading text="Loading storybook data..." />;

export const Default = Template.bind({});

import { Story } from '@storybook/react';
import { Timer, TTimerProps } from '.';

export default {
  title: 'Components/Timer',
  component: Timer,
};

const Template: Story<TTimerProps> = (args) => <Timer {...args} />;

export const Default = Template.bind({});

Default.args = {
  duration: 30,
  repeat: true,
  cb: () => null,
};

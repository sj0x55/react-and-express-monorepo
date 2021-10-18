import { Story } from '@storybook/react';
import { Pane } from '.';

export default {
  title: 'Components/Pane',
  component: Pane,
};

const Template: Story = (args) => <Pane {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Example Title',
};

Default.argTypes = {
  align: {
    options: ['none', 'center', 'right'],
    control: { type: 'radio' },
  },
};

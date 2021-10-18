import { Story } from '@storybook/react';
import { mainTheme } from 'styles/theme';
import { Text } from '.';

export default {
  title: 'Components/Text',
  component: Text,
};

const Template: Story = (args) => <Text {...args}>Hello World!</Text>;

export const Default = Template.bind({});

Default.argTypes = {
  size: {
    options: Object.keys(mainTheme.fontSize),
    control: { type: 'radio' },
  },
};

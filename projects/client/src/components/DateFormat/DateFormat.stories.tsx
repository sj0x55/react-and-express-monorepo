import { Story } from '@storybook/react';
import { DateFormat } from './';

export default {
  title: 'Components/DateFormat',
  component: DateFormat,
};

const date = new Date(2021, 1, 1);
const Template: Story = () => <DateFormat date={String(date)} />;

export const Default = Template.bind({});

import { Story } from '@storybook/react';
import { Link } from '.';

export default {
  title: 'Components/Link',
  component: Link,
};

const Template: Story = () => <Link target="_blank">Link</Link>;

export const Default = Template.bind({});

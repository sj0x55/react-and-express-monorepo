import { Story } from '@storybook/react';
import { Image } from '.';
import reactLogo from 'static/images/react-logo.png';

export default {
  title: 'Components/Image',
  component: Image,
};

const Template: Story = () => <Image src={reactLogo} width="180" />;

export const Default = Template.bind({});

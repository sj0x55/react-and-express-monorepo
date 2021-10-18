import { Story } from '@storybook/react';
import { StyledLink } from '.';

export default {
  title: 'Components/StyledLink',
  component: StyledLink,
};

const Template: Story = () => <StyledLink to="..." />;

export const Default = Template.bind({});

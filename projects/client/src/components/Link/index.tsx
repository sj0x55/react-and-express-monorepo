import styled from 'styled-components';
import { ThemeInterface } from 'styles/theme';

export type TLinkProps = {
  size?: string;
  theme?: ThemeInterface;
};

export const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.darkGrey};
  font-size: ${(props: TLinkProps) => (props.theme && props.size ? props.theme.fontSize[props.size] : null)};

  &:hover {
    text-decoration: underline;
  }
`;

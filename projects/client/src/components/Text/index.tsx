import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { ThemeInterface } from 'styles/theme';
import { Div } from 'components/dom/Div';
import { Span } from 'components/dom/Span';

export type TTextProps = {
  bold?: boolean;
  size?: string;
  block?: boolean;
  theme?: ThemeInterface;
};

const baseCss = css`
  font-weight: ${(props: PropsWithChildren<TTextProps>) => (props.bold ? 'bold' : null)};
  font-size: ${(props: PropsWithChildren<TTextProps>) =>
    props.theme && props.size ? props.theme.fontSize[props.size] : null};
`;

export const BlockText = styled(Div)`
  ${baseCss}
`;

export const InlineText = styled(Span)`
  ${baseCss}
`;

export const Text = (props: PropsWithChildren<TTextProps>) => {
  if (props.block) {
    return <BlockText {...props}>{props.children}</BlockText>;
  } else {
    return <InlineText {...props}>{props.children}</InlineText>;
  }
};

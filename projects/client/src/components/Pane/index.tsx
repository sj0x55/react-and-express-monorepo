import { PropsWithChildren } from 'react';
import { Label } from 'components/dom/Label';
import styled from 'styled-components';

export type TPaneProps = {
  title?: string;
  align?: string;
  border?: boolean;
  padding?: boolean;
  background?: boolean;
};

export const PaneWrapper = styled.div`
  margin-bottom: 10px;
  text-align: ${(props: TPaneProps) => props.align};
  ${(props: TPaneProps) => props.border && (({ theme: { colors } }) => `border: 1px solid ${colors.darkGrey};`)}
  ${(props: TPaneProps) => props.background && (({ theme: { colors } }) => `background: ${colors.lightGrey};`)}
  ${(props: TPaneProps) => props.padding && `padding: 5px;`}

  ${Label}:first-child {
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
    text-decoration: underline;
  }
`;

export const Pane = ({
  title,
  border = true,
  padding = true,
  background = true,
  align,
  children,
}: PropsWithChildren<TPaneProps>) => {
  return (
    <PaneWrapper {...{ align, border, padding, background }}>
      {title && <Label>{title}:</Label>}
      {children}
    </PaneWrapper>
  );
};

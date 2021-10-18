import { Div } from 'components/dom/Div';
import { createElement, PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';

export type CellProps = {
  tagType?: ReactNode;
  align?: string;
  bold?: boolean;
};

export default styled(({ tagType, children, ...props }) => createElement(tagType || Div, props, children))`
  text-align: ${(props: PropsWithChildren<CellProps>) => props.align};
  font-weight: ${(props: PropsWithChildren<CellProps>) => (props.bold ? 'bold' : null)};
`;

import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { ThemeInterface } from 'styles/theme';
import { Cell, CellProps } from '../../grid';

type ContentLayoutCellProps = PropsWithChildren<
  CellProps & {
    columns: number;
    flexDirection?: string;
    theme: ThemeInterface;
  }
>;

function createNthChild(columns: number, index: number, bgColor: string) {
  return css`
    &:nth-child(${columns * 2}n + ${index}) {
      background: ${bgColor};
    }
  `;
}

export default styled(Cell)`
  display: flex;
  flex-direction: ${(props: ContentLayoutCellProps) => props.flexDirection};
  justify-content: ${(props: ContentLayoutCellProps) => props.align};
  align-items: center;

  padding: 10px 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.grey};

  ${({ columns, theme }: ContentLayoutCellProps) => {
    const arr = Array.from(Array(columns).keys());
    return arr.map((_, i) => createNthChild(columns, i + 1, theme.colors.lightGrey));
  }}

  ${({ columns }: ContentLayoutCellProps) => {
    return css`
      &:nth-child(-n + ${columns}) {
        background: ${({ theme }) => theme.colors.darkGrey};
        color: ${({ theme }) => theme.colors.white};
        border-top: none;
        border-bottom: none;
      }
    `;
  }}
`;

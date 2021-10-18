import styled from 'styled-components';
import { Cell } from '../../grid';

const styledCell = styled(({ children, ...props }) => <Cell {...props}>{children}</Cell>);

export default styledCell`
  border: 2px solid ${({ theme }) => theme.colors.darkGrey};
  padding: 5px;

  &:first-child {
    margin-right: 20px;
  }
`;

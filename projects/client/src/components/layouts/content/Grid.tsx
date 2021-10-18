import styled from 'styled-components';
import { Grid } from '../../grid';

export default styled(Grid)`
  border: 1px solid ${({ theme }) => theme.colors.darkGrey};
`;

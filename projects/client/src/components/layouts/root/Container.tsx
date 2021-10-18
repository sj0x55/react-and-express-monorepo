import styled from 'styled-components';
import { Grid } from '../../grid';

export default styled(Grid).attrs({ 'data-test': 'rootContainer' })`
  grid-template-columns: 300px auto;
`;

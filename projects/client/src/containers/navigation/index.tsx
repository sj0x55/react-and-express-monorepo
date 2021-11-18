import styled from 'styled-components';
import { ProductType } from '@package/enums';
import { StyledLink } from 'components/StyledLink';

export const Wrapper = styled.nav`
  background: ${({ theme }) => theme.colors.darkGrey};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 5px 0;
  margin: 10px 0;
`;

export const Navigation = () => {
  return (
    <>
      <Wrapper>
        <StyledLink to={`/${ProductType.DISKS}`} data-test={ProductType.DISKS}>
          Disks
        </StyledLink>
        <StyledLink to={`/${ProductType.SMARTPHONES}`} data-test={ProductType.SMARTPHONES}>
          Smartphones
        </StyledLink>
        <StyledLink to={`/${ProductType.OTHER}`} data-test={ProductType.OTHER}>
          Other
        </StyledLink>
      </Wrapper>
    </>
  );
};

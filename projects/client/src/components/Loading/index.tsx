import styled from 'styled-components';

export const Wrapper = styled.div.attrs({ 'data-test': 'loading' })`
  border: 1px solid ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: bold;
  padding: 10px;
  text-align: center;
`;

export type TLoadingProps = {
  text?: string;
};

export const Loading = ({ text }: TLoadingProps) => {
  return <Wrapper>{text || 'Loading data...'}</Wrapper>;
};

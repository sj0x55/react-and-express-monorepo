import styled from 'styled-components';

const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.black};
  padding: 5px;
`;

export const NumberInput = styled(Input).attrs({
  type: 'number',
})``;

export const TextInput = styled(Input).attrs({
  type: 'text',
})``;

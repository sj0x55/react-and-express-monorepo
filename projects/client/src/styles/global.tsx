import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  
  *, *::after, *::before {
    box-sizing: inherit;
  }
  
  body {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.darkerGrey};
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 5px;
  }
  
  a, button {
    font-family: 'Montserrat', sans-serif;
  }
`;

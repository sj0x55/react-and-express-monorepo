import styled, { css } from 'styled-components';

const CommonCss = css`
  border-radius: 50%;
  width: 2em;
  height: 2em;
`;

export const Spinner = styled.div`
  &::after {
    ${CommonCss};
  }

  ${CommonCss};
  position: absolute;
  font-size: 10px;
  text-indent: -9999em;
  border-top: 0.4em solid rgba(255, 255, 255, 0.5);
  border-right: 0.4em solid rgba(255, 255, 255, 0.5);
  border-bottom: 0.4em solid ${({ theme }) => theme.colors.darkGrey};
  border-left: 0.4em solid ${({ theme }) => theme.colors.darkGrey};
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;

  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

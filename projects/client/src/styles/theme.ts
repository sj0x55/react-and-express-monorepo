import baseStyled, { ThemedStyledInterface } from 'styled-components';
import { invertColor } from 'modules/colors';

export interface MainTheme {
  fontSize: {
    [key: string]: string;
  };
  colors: {
    [key: string]: string;
  };
}

export const mainTheme: MainTheme = {
  colors: {
    white: '#FFFFFF',
    lightGrey: '#e5e8ee',
    grey: '#C0C7D6',
    darkGrey: '#66748f',
    darkerGrey: '#475269',
    black: '#111111',
    success: '#8FCB81',
    error: '#FF8383',
    warning: '#E1D888',
    darkPurple: '#C0C7D6',
    lightPurple: '#ECEFF7',
  },
  fontSize: {
    xxl: '34px',
    xl: '24px',
    l: '17px',
    m: '12px',
    s: '11px',
  },
};

export const invertedTheme: MainTheme = {
  colors: {
    white: invertColor('#FFFFFF'),
    lightGrey: invertColor('#e5e8ee'),
    grey: invertColor('#C0C7D6'),
    darkGrey: invertColor('#66748f'),
    darkerGrey: invertColor('#475269'),
    black: invertColor('#363537'),
    success: invertColor('#8FCB81'),
    error: invertColor('#FF8383'),
    warning: invertColor('#E1D888'),
    darkPurple: invertColor('#C0C7D6'),
    lightPurple: invertColor('#ECEFF7'),
  },
  fontSize: {
    ...mainTheme.fontSize,
  },
};

export type ThemeInterface = typeof mainTheme;
export const styled = baseStyled as ThemedStyledInterface<ThemeInterface>;

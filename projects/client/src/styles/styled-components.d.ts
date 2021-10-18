import { ThemeInterface } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {}
}

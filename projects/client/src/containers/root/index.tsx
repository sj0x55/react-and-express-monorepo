import { FC, MouseEvent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/global';
import { mainTheme, invertedTheme } from 'styles/theme';
import { ProductType } from '@react-and-express/enums';
import { RootLayoutContainer } from 'components/layouts/root';
import { Navigation } from 'containers/navigation';
import { Disks } from 'views/Disks';
import { Smartphones } from 'views/Smartphones';
import { Something } from 'views/Something';
import { FlagContextProvider, useFlagContext } from 'containers/flag-context';
import { Header } from 'components/dom/Header';
import { Footer } from 'components/dom/Footer';
import { Pane } from 'components/Pane';
import { Text } from 'components/Text';

const RootBody = () => {
  const { flag, toggleFlag } = useFlagContext();
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleFlag && toggleFlag();
  };

  return (
    <>
      <ThemeProvider theme={flag ? invertedTheme : mainTheme}>
        <GlobalStyle />
        <Header>
          <button onClick={handleOnClick}>
            {flag ? (
              <span aria-label="Normal mode" role="img">
                🌞 Switch to normal mode
              </span>
            ) : (
              <span aria-label="Invert mode" role="img">
                🌜 Switch to invert mode
              </span>
            )}
          </button>
        </Header>

        <Navigation />
        <RootLayoutContainer>
          <Switch>
            <Route exact path="/">
              <Redirect to={`/${ProductType.DISKS}`} />
            </Route>
            <Route exact path={`/${ProductType.DISKS}`}>
              <Disks />
            </Route>
            <Route path={`/${ProductType.SMARTPHONES}`}>
              <Smartphones />
            </Route>
            <Route path={`/${ProductType.OTHER}`}>
              <Something />
            </Route>
          </Switch>
        </RootLayoutContainer>

        <Footer>
          <Pane align="center">
            Made with ❤️ to <Text bold={true}>programming</Text>!
          </Pane>
        </Footer>
      </ThemeProvider>
    </>
  );
};

export const Root: FC = () => {
  return (
    <FlagContextProvider>
      <RootBody />
    </FlagContextProvider>
  );
};

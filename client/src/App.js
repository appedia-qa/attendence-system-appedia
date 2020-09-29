import React, { Component } from "react";
import { I18nProvider } from "@lingui/react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import * as createHistory from "history";

import Routes from "./routes/Routes";
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import { PersistGate } from "redux-persist/integration/react";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  jssPreset,
} from "@material-ui/core/styles";
import theme from "./theme/Theme";
import Header from "./components/Header";
import SidebarDrawer from "./components/SidebarDrawer";
import Footer from "./components/Footer";

// Redux store
import { Provider } from "react-redux";
import configureStore from "./redux/store";

// Spanish calalog
import catalogEs from "./locales/es/messages.js";
import catalogAr from "./locales/ar/messages.js";
import AlertComponent from "./components/AlertComponent/index";
import {
  CURRENT_LANGUAGE_KEY,
  ARABIC_LANGUAGE,
  ENGLISH_LANGUAGE,
} from "./constants";
import ProductDialog from "./components/ProductDialog";

const catalogs = { es: catalogEs, ar: catalogAr };

// we will store a varialbe in localstorage language: 'en'
const currentLanguage = localStorage.getItem(CURRENT_LANGUAGE_KEY);

export const useRTL =
  currentLanguage && currentLanguage === ARABIC_LANGUAGE ? true : false;
// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, useRTL ? rtl() : null],
});

const history = createHistory.createBrowserHistory();

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => `
  body {
    margin: 0;
  }
  span.highlight {
    color: rgb(76, 140, 43);
    font-weight: bold;
  }
  .ReactCollapse--collapse {
    transition: height 500ms;
  }

  .justify-center {
    display:flex;
    justify-content: center;
  }

  .justify-align-center: {
    display:flex;
    justify-content:center;
    align-items: center
  }
  
  .navPath {
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.brown.main};
  }
  `}
`;

// Create Store
const { store, persistor } = configureStore();

const alertOptions = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  // transition: transitions.SCALE
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      windowHeight: 0,
      windowWidth: 0,
      lang: currentLanguage ? currentLanguage : ENGLISH_LANGUAGE,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      windowWidth: window.outerWidth,
      windowHeight: window.outerHeight,
    });
  }

  onDrawerOpen = () => {
    this.setState({ sidebarOpen: true });
  };

  onDrawerClose = () => {
    this.setState({ sidebarOpen: false });
  };

  handlePushHistory = (path) => {
    if (path) {
      history.push(path);
      this.setState({ sidebarOpen: false });
    }
  };

  render() {
    const { lang } = this.state;

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nProvider
            language={this.state.lang === ENGLISH_LANGUAGE ? "en" : "ar"}
            catalogs={catalogs}
          >
            <BrowserRouter history={history}>
              <StylesProvider injectFirst jss={jss}>
                <MuiThemeProvider theme={theme}>
                  <StyledThemeProvider theme={theme}>
                    {/* dir div was originally body tag, check */}
                    <div dir={useRTL ? "rtl" : "ltr"}>
                      <GlobalStyle />
                      <AlertProvider template={AlertTemplate} {...alertOptions}>
                        <Header
                          onDrawerOpen={this.onDrawerOpen}
                          width={this.state.windowWidth}
                          height={this.state.windowHeight}
                          language={lang}
                        />
                        <AlertComponent style={{ zIndex: "1" }} />
                        <SidebarDrawer
                          open={this.state.sidebarOpen}
                          onDrawerClose={this.onDrawerClose}
                          onDrawerOpen={this.onDrawerOpen}
                          language={lang}
                        />
                        <Switch>
                          {Routes.map(({ component: Cmp, ...route }, i) => (
                            <Route
                              key={i}
                              {...route}
                              render={(props) => (
                                <Cmp
                                  {...props}
                                  windowWidth={this.state.windowWidth}
                                  windowHeight={this.state.windowHeight}
                                  language={lang}
                                />
                              )}
                            />
                          ))}
                        </Switch>
                        <Footer width={this.state.windowWidth} />
                        <ProductDialog
                          history={this.props.history}
                          language={lang}
                        />
                      </AlertProvider>
                    </div>
                  </StyledThemeProvider>
                </MuiThemeProvider>
              </StylesProvider>
            </BrowserRouter>
          </I18nProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

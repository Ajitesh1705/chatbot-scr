/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { createContext, useContext, useMemo, useReducer } from "react";

// Material Dashboard  React main context
const UIContext = createContext();

// Setting custom name for the context which is visible on react dev tools
UIContext.displayName = "UIContext";
const locale = (navigator.language || navigator.userLanguage).split("-")[0];

//  reducer
function reducer(state, action) {
  switch (action.type) {
    case "LOCALE": {
      return { ...state, locale: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

//  context provider
function UIControllerProvider({ children }) {
  const initialState = {
    locale,
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: true,
    transparentNavbar: false,
    sidenavColor: "info",
    fixedNavbar: true,
    openConfigurator: false,
    layout: "dashboard",
    darkMode: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

//  custom hook for using context
function useUIController() {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUIController should be used inside the UIControllerProvider.");
  }

  return context;
}
// Typechecking props for the UIControllerProvider
UIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setLocale = (dispatch, value) => dispatch({ type: "LOCALE", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });

export {
  setDarkMode,
  setFixedNavbar,
  setLayout,
  setLocale,
  setMiniSidenav,
  setOpenConfigurator,
  setSidenavColor,
  setTransparentNavbar,
  setTransparentSidenav,
  setWhiteSidenav,
  UIControllerProvider,
  useUIController,
};

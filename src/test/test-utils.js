import { createTheme, ThemeProvider } from "@mui/material";
import { render as rtlRender } from "@testing-library/react";
import theme from "assets/theme";
import { UIControllerProvider } from "context";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import store from "store/store";

function Wrapper({ children }) {
  return (
    <Provider store={store}>
      <UIControllerProvider>
        <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>
      </UIControllerProvider>
    </Provider>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

function render(ui, { ...renderOptions } = {}) {
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";

export { render };

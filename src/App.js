import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "assets/theme";
import { Alert, Box, Loader } from "components";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import routes, { RequireAuth } from "routes/routes";
import useOnlineStatus from "services/hooks/useOnlineStatus";

function App() {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [appTheme] = useState(theme);
  const { isOnline, resetIsOnline } = useOnlineStatus();
  const navigate = useNavigate();

  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, [window.innerHeight]);

  const handleRefresh = () => {
    navigate(0);
  };

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.layout + route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  return (
    <ThemeProvider theme={createTheme(appTheme)}>
      <Loader toggle={false} />
      <Alert alertType="error" toggle={false} handleCloseError={handleRefresh} duration={0} />

      <Box sx={({ palette }) => ({ background: palette.background.main, height: innerHeight })}>
        <CssBaseline />
        {isOnline === true && isOnline !== null ? (
          <Alert
            toggle={isOnline === true && isOnline !== null}
            alertType="success"
            duration={2000}
            handleCloseError={() => {
              resetIsOnline();
            }}
          >
            Online
          </Alert>
        ) : null}
        {isOnline === false && isOnline !== null ? (
          <Alert duration={0} hideCloseButton>
            Offline
          </Alert>
        ) : null}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/chat" />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;

/* eslint-disable consistent-return */
import { Collapse, Stack } from "@mui/material";
import AlertComp from "@mui/material/Alert";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Alert({ alertType, toggle, children, handleCloseError, duration, hideCloseButton }) {
  const [showAlert, setShowAlert] = useState(toggle);

  useEffect(() => {
    setShowAlert(toggle);
  }, [toggle]);

  const handleClose = () => {
    handleCloseError();
  };

  useEffect(() => {
    if (duration && toggle === true) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [toggle]);

  return (
    <Collapse in={showAlert} timeout={300} sx={{ width: "100%" }}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <AlertComp
          severity={alertType}
          // variant="outlined"
          onClose={hideCloseButton ? null : handleClose}
          sx={(theme) => {
            const { typography, borders, functions } = theme;
            const { fontWeightRegularLight, size } = typography;
            const { borderRadius } = borders;
            const { pxToRem } = functions;
            return {
              alignItems: "center",
              padding: 2.3,
              height: pxToRem(32),
              position: "relative",
              marginBottom: pxToRem(2),
              borderRadius: borderRadius.md,
              fontSize: size.xs,
              fontWeight: fontWeightRegularLight,
            };
          }}
        >
          {children}
        </AlertComp>
      </Stack>
    </Collapse>
  );
}

// Setting default values for the props of Alert
Alert.defaultProps = {
  children: "You have encountered an error",
  toggle: true,
  alertType: "error",
  duration: 3000,
  hideCloseButton: false,
};

// Typechecking props of the Alert
Alert.propTypes = {
  hideCloseButton: PropTypes.bool,
  children: PropTypes.node,
  toggle: PropTypes.bool,
  duration: PropTypes.number,
  alertType: PropTypes.oneOf(["error", "warning", "info", "success"]),
  handleCloseError: PropTypes.func.isRequired,
};

export default Alert;

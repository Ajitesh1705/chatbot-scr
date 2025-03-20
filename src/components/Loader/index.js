import { CircularProgress, LinearProgress } from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";

export default function Loader({ toggle, type, sx, ...rest }) {
  const [showLoader, setShowLoader] = React.useState(true);
  const progressStyle = ({ borders }) => ({
    ...sx,
    borderRadius: borders.borderRadius.md,
    height: "0.15rem",
    background: "transparent",
  });
  const progressBar = {
    linear: <LinearProgress sx={progressStyle} {...rest} />,
    circular: <CircularProgress sx={progressStyle} {...rest} />,
  };

  React.useEffect(() => {
    setShowLoader(toggle);
  }, [toggle]);

  return showLoader ? progressBar[type] : null;
}

Loader.defaultProps = {
  type: "linear",
  toggle: true,
  sx: {},
};

Loader.propTypes = {
  type: PropTypes.oneOf(["linear", "circular"]),
  toggle: PropTypes.bool,
  sx: PropTypes.instanceOf(Object),
};

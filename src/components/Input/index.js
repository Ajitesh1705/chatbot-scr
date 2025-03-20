// Custom styles for Input
import InputRoot from "components/Input/InputRoot";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { forwardRef } from "react";

const Input = forwardRef(({ hideIcons, error, success, disabled, color, ...rest }, ref) => (
  <InputRoot {...rest} ref={ref} ownerState={{ hideIcons, error, success, disabled, color }} />
));

// Setting default values for the props of Input
Input.defaultProps = {
  error: false,
  success: false,
  disabled: false,
  color: "secondary",
  hideIcons: false,
};

// Typechecking props for the Input
Input.propTypes = {
  hideIcons: PropTypes.bool,
  color: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Input;

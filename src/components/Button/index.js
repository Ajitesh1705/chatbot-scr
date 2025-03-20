// Custom styles for Button
import ButtonRoot from "components/Button/ButtonRoot";
//  contexts
import { useUIController } from "context";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { forwardRef } from "react";

const Button = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, ...rest }, ref) => {
    const [controller] = useUIController();
    const { darkMode } = controller;

    return (
      <ButtonRoot
        {...rest}
        ref={ref}
        color="primary"
        variant={variant === "gradient" ? "contained" : variant}
        size={size}
        ownerState={{ color, variant, size, circular, iconOnly, darkMode }}
      >
        {children}
      </ButtonRoot>
    );
  }
);

// Setting default values for the props of Button
Button.defaultProps = {
  size: "medium",
  variant: "contained",
  color: "primary",
  circular: false,
  iconOnly: false,
};

// Typechecking props for the Button
Button.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "buttonBorder",
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;

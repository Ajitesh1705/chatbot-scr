// Custom styles for Avatar
import AvatarRoot from "components/Avatar/AvatarRoot";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { forwardRef } from "react";

const Avatar = forwardRef(({ bgColor, size, shadow, ...rest }, ref) => (
  <AvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
));

// Setting default values for the props of Avatar
Avatar.defaultProps = {
  bgColor: "transparent",
  size: "xs",
  shadow: "none",
};

// Typechecking props for the Avatar
Avatar.propTypes = {
  bgColor: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
  shadow: PropTypes.oneOf(["none", "xs", "sm", "md", "lg", "xl", "xxl", "inset"]),
};

export default Avatar;

/**
 * The base border styles for the Material Dashboard 2 PRO React.
 * You can add new border width, border color or border radius using this file.
 * You can customized the borders value for the entire Material Dashboard 2 PRO React using thie file.
 */

//  Base Styles
import colors from "assets/theme/base/colors";
//  Helper Functions
import pxToRem from "assets/theme/functions/pxToRem";

const { borderColor } = colors;

const borders = {
  borderColor,

  borderWidth: {
    0: 0,
    0.5: pxToRem(0.5),
    1: pxToRem(1),
    2: pxToRem(2),
    3: pxToRem(3),
    4: pxToRem(4),
    5: pxToRem(5),
  },

  borderRadius: {
    xs: pxToRem(1.6),
    sm: pxToRem(4),
    md: pxToRem(8),
    lg: pxToRem(10),
    xl: pxToRem(12),
    xxl: pxToRem(16),
    section: pxToRem(24),
  },
};

export default borders;

//  base styles
import colors from "assets/theme/base/colors";
import pxToRem from "assets/theme/functions/pxToRem";
//  helper functions

const { dark, white } = colors;

const divider = {
  styleOverrides: {
    root: {
      backgroundColor: dark.main,

      height: pxToRem(1),
      margin: `${pxToRem(16)} 0`,
      borderBottom: "none",
      opacity: 0.25,
    },

    vertical: {
      backgroundColor: dark.main,

      width: pxToRem(1),
      height: "100%",
      margin: `0 ${pxToRem(16)}`,
      borderRight: "none",
    },

    light: {
      backgroundColor: white.main,

      "&.MuiDivider-vertical": {
        backgroundColor: white.main,
      },
    },
  },
};

export default divider;

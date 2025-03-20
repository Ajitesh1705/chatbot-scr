//  base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
//  helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { borderRadius } = borders;
const { light } = colors;

const linearProgress = {
  styleOverrides: {
    root: {
      height: pxToRem(2),
      borderRadius: borderRadius.md,
      overflow: "hidden",
      position: "relative",
    },

    colorPrimary: {
      backgroundColor: light.secondary,
    },

    colorSecondary: {
      backgroundColor: light.main,
    },

    bar: {
      borderRadius: borderRadius.sm,
      position: "absolute",
      transform: `translate(0, 0) !important`,
      transition: "width 0.6s ease !important",
    },
  },
};

export default linearProgress;

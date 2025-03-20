//  base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
//  helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { borderRadius } = borders;
const { light, info } = colors;

const circularProgress = {
  styleOverrides: {
    root: {
      height: pxToRem(2),
      borderRadius: borderRadius.md,
      position: "relative",
      color: info.main,
    },

    colorPrimary: {
      backgroundColor: light.secondary,
    },

    colorSecondary: {
      backgroundColor: light.main,
    },
  },
};

export default circularProgress;

//  base styles
import borders from "assets/theme/base/borders";
import boxShadows from "assets/theme/base/boxShadows";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
//  helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { lg } = boxShadows;
const { size } = typography;
const { text, white } = colors;
const { borderRadius } = borders;

const menu = {
  defaultProps: {
    disableAutoFocusItem: true,
  },

  styleOverrides: {
    paper: {
      minWidth: pxToRem(110),
      boxShadow: lg,
      fontSize: size.sm,
      color: text.main,
      textAlign: "left",
      backgroundColor: `${white.main} !important`,
      borderRadius: borderRadius.md,
    },
  },
};

export default menu;

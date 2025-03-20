//  base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
//  helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { transparent, white, primary } = colors;

const select = {
  styleOverrides: {
    select: {
      borderRadius: borders.borderRadius.lg,
      backgroundColor: white.main,
      display: "grid",
      alignItems: "center",
      minHeight: "unset",
      height: pxToRem(12),
      padding: `10 ${pxToRem(12)} !important`,

      "& .Mui-selected": {
        backgroundColor: transparent.main,
      },
    },

    selectMenu: {
      background: "none",
      height: "none",
      minHeight: "none",
      overflow: "unset",
    },

    icon: {
      display: "block",
      color: primary.main,
    },
  },
};

export default select;

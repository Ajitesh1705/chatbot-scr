//  base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
//  helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { grey } = colors;
const { borderRadius } = borders;

const tabs = {
  styleOverrides: {
    root: {
      position: "relative",
      backgroundColor: grey[100],
      borderRadius: borderRadius.sm,
      minHeight: "unset",
      padding: `${pxToRem(0)} ${pxToRem(16)}`,
    },

    flexContainer: {
      height: "100%",
      position: "relative",
      zIndex: 10,
    },

    fixed: {
      overflow: "unset !important",
      overflowX: "unset !important",
    },

    vertical: {
      "& .MuiTabs-indicator": {
        width: "100%",
      },
    },

    indicator: {
      transition: "all 500ms ease",
    },
  },
};

export default tabs;

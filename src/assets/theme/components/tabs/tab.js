//  base styles

import typography from "assets/theme/base/typography";
//  helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { size, fontWeightBold } = typography;

const tab = {
  styleOverrides: {
    root: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      flex: "1 1 auto",
      textAlign: "center",
      maxWidth: "unset !important",
      minWidth: "unset !important",
      minHeight: "unset !important",
      fontSize: size.xs,
      fontWeight: fontWeightBold,
      textTransform: "capitalize !important",
      lineHeight: "inherit",
      padding: pxToRem(4),
      opacity: "1 !important",

      "& .material-icons, .material-icons-round": {
        marginBottom: "0 !important",
        marginRight: pxToRem(6),
      },

      "& svg": {
        marginBottom: "0 !important",
        marginRight: pxToRem(6),
      },
    },

    labelIcon: {
      paddingTop: pxToRem(4),
    },
  },
};

export default tab;

//  Base Styles

import boxShadows from "assets/theme/base/boxShadows";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import boxShadow from "assets/theme/functions/boxShadow";
//  helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { colored } = boxShadows;
const { secondary, grey, transparent, white } = colors;
const { size } = typography;
const boxShadowValue = colored.primary
  ? `${boxShadow([0, 0], [10, 0], colors.secondary.main, 0.3)}, ${boxShadow(
      [0, 3],
      [1, -2],
      colors.secondary.main,
      0.2
    )}, ${boxShadow([0, 1], [5, 0], colors.secondary.main, 0.15)}`
  : "none";

const inputOutlined = {
  styleOverrides: {
    root: {
      backgroundColor: white.main,
      fontSize: size.md,
      borderRadius: 0,

      "&:hover": {
        backgroundColor: white.main,
      },
      "&:after": {
        borderWidth: pxToRem(1),
        borderColor: secondary.main,
        boxShadow: boxShadowValue,
      },

      "&.Mui-focused": {
        backgroundColor: white.main,
      },
    },

    input: {
      color: grey[700],
      padding: pxToRem(12),
      backgroundColor: transparent.main,
    },

    inputSizeSmall: {
      fontSize: size.xs,
      padding: pxToRem(10),
    },

    multiline: {
      color: grey[700],
      padding: 0,
    },
  },
};

export default inputOutlined;

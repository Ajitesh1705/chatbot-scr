//  Base Styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

const { inputBorderColor, dark, secondary } = colors;
const { size } = typography;
const { borderWidth } = borders;

const input = {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: dark.main,

      "&:hover:not(.Mui-disabled):before": {
        borderBottom: `${borderWidth[1]} solid ${inputBorderColor}`,
      },

      "&:before": {
        borderColor: inputBorderColor,
      },

      "&:after": {
        borderColor: secondary.main,
      },
    },
  },
};

export default input;

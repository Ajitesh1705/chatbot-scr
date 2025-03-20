//  base styles
import colors from "assets/theme/base/colors";

const { error } = colors;

const formHelperText = {
  styleOverrides: {
    root: {
      color: error.main,
    },
  },
};

export default formHelperText;

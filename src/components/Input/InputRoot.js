// @mui material components
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export default styled(TextField)(({ theme, ownerState }) => {
  const { palette, functions, borders } = theme;
  const { hideIcons, error, success, disabled, color } = ownerState;

  const { grey, error: colorError, success: colorSuccess, white } = palette;
  const { pxToRem } = functions;
  const { borderRadius } = borders;

  // styles for the input with error={true}
  const errorStyles = () => ({
    backgroundImage: !hideIcons
      ? "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23F44335' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23F44335' stroke='none'/%3E%3C/svg%3E\")"
      : "unset",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${pxToRem(12)} top ${pxToRem(11)}`,
    backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,

    "& .MuiOutlinedInput-notchedOutline, &:after": {
      borderColor: colorError.main,
    },
    "& .MuiFilledInput-root, &:before": {
      borderBottomColor: colorError.main,
    },

    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline, &:after": {
        borderColor: colorError.main,
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: colorError.main,
    },
  });

  // styles for the input with success={true}
  const successStyles = () => ({
    backgroundImage: !hideIcons
      ? "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%234CAF50' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")"
      : "unset",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${pxToRem(12)} center`,
    backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,

    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline, &:after": {
        borderColor: colorSuccess.main,
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: colorSuccess.main,
    },
  });

  const getColor = () => ({
    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline, &:after": {
        borderColor: color,
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color,
    },
  });

  return {
    backgroundColor: disabled ? `${grey[200]} !important` : white.main,
    borderRadius: borderRadius.md,
    pointerEvents: disabled ? "none" : "auto",
    ...(color && getColor()),
    ...(error && errorStyles()),
    ...(success && successStyles()),
  };
});

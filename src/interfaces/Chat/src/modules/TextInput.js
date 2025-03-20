import { Send } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { Box, Input } from "components";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";

export function TextInput({ chatController, actionRequest }) {
  const chatCtl = chatController;
  const [value, setValue] = useState(actionRequest.defaultValue);

  const setResponse = useCallback(() => {
    if (value) {
      const res = { type: "text", value };
      chatCtl.setActionResponse(actionRequest, res);
      setValue("");
    }
  }, [actionRequest, chatCtl, value]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.nativeEvent.isComposing) {
        return;
      }

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        setResponse();
      }
    },
    [setResponse]
  );

  return (
    <Box
      sx={{
        flex: "1 1 auto",
        display: "flex",
        "& > *": {
          flex: "1 1 auto",
          minWidth: 0,
        },
        "& > * + *": {
          ml: 1,
        },
        "& :last-child": {
          flex: "0 1 auto",
        },
      }}
    >
      <Input
        fullWidth
        placeholder={actionRequest.placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        multiline
        variant="outlined"
        maxRows={10}
        sx={({ palette }) => ({
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: palette.secondary.main,
            },
          },
        })}
        InputProps={{
          onKeyDown: handleKeyDown,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color="primary"
                size="small"
                onClick={setResponse}
                disabled={!value}
                sx={{ display: value ? "block" : "none" }}
              >
                <Send />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

TextInput.propTypes = {
  chatController: PropTypes.object.isRequired,
  actionRequest: PropTypes.shape({
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    sendButtonText: PropTypes.string,
  }).isRequired,
};

export default TextInput;

import pxToRem from "assets/theme/functions/pxToRem";
import { Box, Button, Typography } from "components";
import * as emoji from "node-emoji";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { ChatController } from "../chat-controller";
import { SelectActionRequestPropTypes } from "../chat-types";

export function SelectInput({ chatController, actionRequest }) {
  const chatCtl = chatController;
  const [selectedValue, setSelectedValue] = useState("");

  const setResponse = React.useCallback(
    (value) => {
      const option = actionRequest.options.find((o) => o.value === value);
      if (!option) {
        throw new Error(`Unknown value: ${value}`);
      }
      const res = {
        type: "select",
        value: option.text,
        option,
      };
      chatCtl.setActionResponse(actionRequest, res);
    },
    [actionRequest, chatCtl]
  );
  const sendButtonText = actionRequest.sendButtonText ? actionRequest.sendButtonText : "Submit";

  return (
    <Box
      sx={{
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        "& > *": {
          flex: "0 0 auto",
          maxWidth: "100%",
        },
        "& > * + *": {
          mt: 1,
        },
      }}
    >
      <Typography sx={{ marginBottom: pxToRem(10) }} variant="caption" color="text">
        Only one option may be selected
      </Typography>
      {actionRequest.options.map((o) => (
        <Box
          key={actionRequest.options.indexOf(o)}
          onClick={() => setSelectedValue(o.value)}
          padding={`${pxToRem(12)} ${pxToRem(16)}`}
          variant="contained"
          color="primary"
          sx={({ palette, borders }) => ({
            cursor: "pointer",
            boxShadow: selectedValue.includes(o.value)
              ? `0px 4px 4px 0px ${palette.secondary.focus}`
              : "unset",
            border: "none",
            borderRadius: borders.borderRadius.md,
            background:
              selectedValue === o.value ? palette.secondary.main : palette.secondary.focus,
            color: selectedValue === o.value ? palette.text.focus : palette.text.main,
          })}
        >
          <Typography
            color="text"
            variant="subtitle1"
            style={{ whiteSpace: "pre-wrap", textAlign: "start", color: "inherit" }}
          >
            {emoji.emojify(o.text)}
          </Typography>
        </Box>
      ))}
      <Box>
        <Button
          sx={{ float: "right", marginBottom: 1 }}
          onClick={() => setResponse(selectedValue)}
          disabled={selectedValue.length === 0}
          variant="contained"
          color="primary"
        >
          {sendButtonText}
        </Button>
      </Box>
    </Box>
  );
}

SelectInput.propTypes = {
  chatController: PropTypes.instanceOf(ChatController).isRequired,
  actionRequest: SelectActionRequestPropTypes.isRequired,
};

export default SelectInput;

import pxToRem from "assets/theme/functions/pxToRem";
import { Box, Button, Typography } from "components";
import * as emoji from "node-emoji";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";

import { ChatController } from "../chat-controller";

export function MultiSelectInput({ chatController, actionRequest }) {
  const chatCtl = chatController;
  const [values, setValues] = useState([]);

  const handleSelect = useCallback(
    (value) => {
      if (!values.includes(value)) {
        setValues([...values, value]);
      } else {
        setValues(values.filter((v) => v !== value));
      }
    },
    [values]
  );

  const setResponse = useCallback(() => {
    const options = actionRequest.options.filter((o) => values.includes(o.value));

    const res = {
      type: "multi-select",
      value: options.map((o) => o.text).join("\r\n"),
      options,
    };
    chatCtl.setActionResponse(actionRequest, res);
    setValues([]);
  }, [actionRequest, chatCtl, values]);

  const sendButtonText = actionRequest.sendButtonText ? actionRequest.sendButtonText : "Submit";

  return (
    <Box
      sx={{
        flex: "1 1 auto",
        gap: 0.5,
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
        More than one option may be selected
      </Typography>
      {actionRequest.options.map((o) => (
        <Box
          key={actionRequest.options.indexOf(o)}
          padding={`${pxToRem(12)} ${pxToRem(16)}`}
          onClick={() => handleSelect(o.value)}
          sx={({ palette, borders }) => ({
            cursor: "pointer",
            boxShadow: values.includes(o.value)
              ? `0px 4px 4px 0px ${palette.secondary.focus}`
              : "unset",
            border: "none",
            borderRadius: borders.borderRadius.md,
            background: values.includes(o.value) ? palette.secondary.main : palette.secondary.focus,
            color: values.includes(o.value) ? palette.text.focus : palette.text.main,
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
          onClick={setResponse}
          disabled={values.length === 0}
          variant="contained"
          color="primary"
        >
          {sendButtonText}
        </Button>
      </Box>
    </Box>
  );
}

MultiSelectInput.propTypes = {
  chatController: PropTypes.instanceOf(ChatController).isRequired,
  actionRequest: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
    sendButtonText: PropTypes.string,
  }).isRequired,
};

export default MultiSelectInput;

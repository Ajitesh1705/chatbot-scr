import { Icon } from "@mui/material";
import { Box, Button } from "components";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";

import { AudioMediaRecorder } from "../audio-media-recorder";
// import { ChatActionRequest, AudioActionResponse } from "../chat-types";

export function AudioInput({ chatController, actionRequest }) {
  const chatCtl = chatController;
  const [audioRec] = useState(AudioMediaRecorder.getInstance());
  const [stopped, setStopped] = useState(true);
  const [audio, setAudio] = useState(undefined);

  const handleError = useCallback(
    (error) => {
      const value = {
        type: "audio",
        value: error.message,
        error,
      };
      chatCtl.setActionResponse(actionRequest, value);
    },
    [actionRequest, chatCtl]
  );

  const handleStart = useCallback(async () => {
    try {
      await audioRec.initialize();
      await audioRec.startRecord();
      setStopped(false);
    } catch (error) {
      handleError(error);
    }
  }, [audioRec, handleError]);

  const handleStop = useCallback(async () => {
    try {
      const a = await audioRec.stopRecord();
      setAudio(a);
      setStopped(true);
    } catch (error) {
      handleError(error);
    }
  }, [audioRec, handleError]);

  const sendResponse = useCallback(() => {
    if (audio) {
      const value = {
        type: "audio",
        value: "Audio",
        audio,
      };
      chatCtl.setActionResponse(actionRequest, value);
      setAudio(undefined);
    }
  }, [actionRequest, audio, chatCtl]);

  const sendButtonText = actionRequest.sendButtonText ? actionRequest.sendButtonText : "Send";

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
      }}
    >
      {stopped && (
        <Button
          type="button"
          onClick={handleStart}
          disabled={!stopped}
          variant="contained"
          color="primary"
          startIcon={<Icon>keyboard_voice</Icon>}
        >
          Rec start
        </Button>
      )}
      {!stopped && (
        <Button
          type="button"
          onClick={handleStop}
          disabled={stopped}
          variant="contained"
          color="primary"
          startIcon={<Icon>stop</Icon>}
        >
          Rec stop
        </Button>
      )}
      <Button
        type="button"
        onClick={sendResponse}
        disabled={!audio}
        variant="contained"
        color="primary"
        startIcon={<Icon>send</Icon>}
      >
        {sendButtonText}
      </Button>
    </Box>
  );
}

AudioInput.propTypes = {
  chatController: PropTypes.object.isRequired,
  actionRequest: PropTypes.object.isRequired,
};

export default AudioInput;

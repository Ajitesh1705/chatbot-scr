import { CardMedia } from "@mui/material";
import pxToRem from "assets/theme/functions/pxToRem";
import { Box, Progress, Typography } from "components";
import { ChatContainer } from "interfaces/Chat/src/index";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

function Chat({ chatCtl }) {
  const [progressValue, _setProgressValue] = useState(0);
  const [_messages, setMessages] = useState(chatCtl.getMessages());

  useEffect(() => {
    function handleMassagesChanged() {
      setMessages([...chatCtl.getMessages()]);
    }

    chatCtl.addOnMessagesChanged(handleMassagesChanged);

    return () => {
      chatCtl.removeOnMessagesChanged(handleMassagesChanged);
    };
  }, [chatCtl]);
  return (
    <Box sx={{ height: "inherit", overflow: "hidden" }} bgColor="white">
      <Box sx={{ width: "101%", position: "fixed", top: 0, mr: 0 }}>
        <Progress
          variant="contained"
          value={progressValue}
          color="secondary"
          style={{
            background: "transparent",
            height: "3px",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Box
          className="flex-display justify-content-center align-items-center"
          gap={2}
          bgColor="white"
          sx={({ functions }) => ({
            position: "relative",
            padding: functions.pxToRem(10),
            paddingLeft: functions.pxToRem(10),
          })}
        >
          {/* <Avatar
            variant="square"
            sx={{ width: pxToRem(19), height: pxToRem(21), objectFit: "cover" }}
            size="sm"
            src={photoUrl}
          /> */}

          <Typography variant="d8" fontWeight="bold" sx={{ lineHeight: "2.1rem" }} color="text">
            Chat
          </Typography>
        </Box>
        <Box
          bgColor="background"
          borderRadius={`${pxToRem(24)} ${pxToRem(24)} ${pxToRem(0)} ${pxToRem(0)}`}
          sx={{ flex: "1 1 0%", minHeight: 0, overflow: "auto" }}
        >
          <Box sx={{ width: { md: "70%" }, m: "auto" }} className="height-100">
            <ChatContainer chatController={chatCtl} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

Chat.propTypes = {
  chatCtl: PropTypes.instanceOf(Object).isRequired,
};

export default Chat;

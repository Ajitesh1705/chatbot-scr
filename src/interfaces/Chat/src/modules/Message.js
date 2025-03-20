import { Grow } from "@mui/material";
import pxToRem from "assets/theme/functions/pxToRem";
import { Avatar, Box, Typography } from "components";
import * as emoji from "node-emoji";
import PropTypes from "prop-types";
import React from "react";
import cookiesManipulator from "services/browserStorage/cookies";

export function Message({ id, message, showDate, showTime }) {
  if (message.deletedAt) {
    return <div id={id} />;
  }

  const dispDate = message.updatedAt ? message.updatedAt : message.createdAt;

  const ChatAvator = (
    <Box
      minWidth={0}
      flexShrink={0}
      ml={message.self ? 1 : 0}
      mr={message.self ? 0 : 1}
      sx={{ display: "flex", flexDirection: "column-reverse" }}
    >
      <Avatar
        alt={message.username}
        src={!message.self ? cookiesManipulator.getCookies("admin_user_image") || "" : ""}
        bgColor="secondary"
      />
    </Box>
  );

  const ChatUsername = (
    <Box maxWidth="100%" mx={1}>
      <Typography variant="body2" align={message.self ? "right" : "left"}>
        {message.username}
      </Typography>
    </Box>
  );

  const ChatDate = (
    <Box maxWidth="100%" mx={1}>
      <Typography variant="body2" align={message.self ? "right" : "left"}>
        {dispDate?.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
    </Box>
  );

  return (
    <Grow in>
      <Box maxWidth="100%" display="flex" flexDirection="column">
        {showDate && <Typography align="center">{dispDate?.toLocaleDateString()}</Typography>}
        <Box
          id={id}
          maxWidth="100%"
          my={1}
          pl={message.self ? "20%" : 0}
          pr={message.self || message.type === "jsx" ? 0 : "20%"}
          display="flex"
          justifyContent={message.self ? "flex-end" : "flex-start"}
          style={{ overflowWrap: "break-word" }}
        >
          {message.avatar && !message.self && ChatAvator}
          <Box minWidth={0} display="flex" flexDirection="column">
            {message.username && ChatUsername}

            <Box
              maxWidth="100%"
              p={pxToRem(16)}
              sx={({ palette, borders }) => ({
                backgroundColor: message.self ? palette.secondary.focus : palette.white.main,
                borderRadius: borders.borderRadius.section,
                borderBottomRightRadius: message.self ? 0 : null,
                borderBottomLeftRadius: !message.self ? 0 : null,
              })}
              boxShadow={2}
            >
              {message.type === "text" && (
                <Typography variant="subtitle1" style={{ whiteSpace: "pre-wrap" }} color="text">
                  {emoji.emojify(message.content)}
                </Typography>
              )}
              {message.type === "jsx" && <div>{message.content}</div>}
            </Box>
            {showTime && ChatDate}
          </Box>
          {message.avatar && message.self && ChatAvator}
        </Box>
      </Box>
    </Grow>
  );
}

Message.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.shape({
    deletedAt: PropTypes.any,
    updatedAt: PropTypes.any,
    createdAt: PropTypes.any,
    self: PropTypes.bool,
    username: PropTypes.string,
    avatar: PropTypes.string,
    type: PropTypes.oneOf(["text", "jsx"]),
    content: PropTypes.any,
  }).isRequired,
  showDate: PropTypes.bool.isRequired,
  showTime: PropTypes.bool.isRequired,
};

export default Message;

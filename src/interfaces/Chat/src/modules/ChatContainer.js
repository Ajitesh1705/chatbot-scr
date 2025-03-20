import { Avatar, Box, TypingAnimation } from "components";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import cookiesManipulator from "services/browserStorage/cookies";

import { ChatController } from "../chat-controller";
import { AudioInput } from "./AudioInput";
import { FileInput } from "./FileInput";
import { Message } from "./Message";
import { MultiSelectInput } from "./MultiSelectInput";
import { SelectInput } from "./SelectInput";
import { TextInput } from "./TextInput";

export function ChatContainer({ chatController }) {
  const chatCtl = chatController;
  const [messages, setMessages] = useState(chatCtl.getMessages());
  const [actReq, setActReq] = useState(chatCtl.getActionRequest());

  const msgRef = useRef(null);
  const scroll = useCallback(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [msgRef]);

  useEffect(() => {
    scroll();
  }, [messages]);

  useEffect(() => {
    function handleMassagesChanged() {
      setMessages([...chatCtl.getMessages()]);
      scroll();
    }
    function handleActionChanged() {
      setActReq(chatCtl.getActionRequest());
      scroll();
    }
    chatCtl.addOnMessagesChanged(handleMassagesChanged);
    chatCtl.addOnActionChanged(handleActionChanged);

    return () => {
      chatCtl.removeOnMessagesChanged(handleMassagesChanged);
      chatCtl.removeOnActionChanged(handleActionChanged);
    };
  }, [chatCtl, scroll]);

  const CustomComponent = useMemo(() => {
    if (!actReq || actReq.type !== "custom") {
      return null;
    }
    return actReq.Component;
  }, [actReq]);

  const unknownMsg = {
    type: "text",
    content: "Unknown message.",
    self: false,
  };

  let prevDate = dayjs(0);
  let prevTime = dayjs(0);

  const ChatAvatar = (
    <Box minWidth={0} flexShrink={0} sx={{ display: "flex", flexDirection: "column-reverse" }}>
      <Avatar
        alt="logo"
        src={cookiesManipulator.getCookies("admin_user_image") || ""}
        bgColor="secondary"
      />
    </Box>
  );

  return (
    <Box
      data-testid="chat-container"
      sx={{
        height: "100%",
        width: "100%",
        p: 2,
        backgroundColor: "background.main",
        display: "flex",
        flexDirection: "column",
        "& > *": {
          maxWidth: "100%",
        },
        "& > * + *": {
          mt: 1,
        },
      }}
    >
      <Box
        className="scrollbar-display-none"
        sx={{
          flex: "1 1 0%",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          display: "flex",
          flexDirection: "column",
          "& > *": {
            maxWidth: "100%",
          },
        }}
        ref={msgRef}
      >
        {messages.map((msg) => {
          let showDate = false;
          let showTime = !!chatCtl.getOption().showDateTime;
          if (!!chatCtl.getOption().showDateTime && !msg.deletedAt) {
            const current = dayjs(msg.updatedAt ? msg.updatedAt : msg.createdAt);

            if (current.format("YYYYMMDD") !== prevDate.format("YYYYMMDD")) {
              showDate = true;
            }
            prevDate = current;

            if (current.diff(prevTime) < 60_000) {
              showTime = false;
            } else {
              prevTime = current;
            }
          }
          if (msg.type === "text" || msg.type === "jsx") {
            return (
              <Message
                key={messages.indexOf(msg)}
                id={`cu-msg-${messages.indexOf(msg) + 1}`}
                message={msg}
                showDate={showDate}
                showTime={showTime}
              />
            );
          }
          return (
            <Message
              key={messages.indexOf(msg)}
              id={`cu-msg-${messages.indexOf(msg) + 1}`}
              message={unknownMsg}
              showDate={showDate}
              showTime={showTime}
            />
          );
        })}
      </Box>
      <Box sx={{ width: "20%" }}>
        {chatCtl.loading ? (
          <Box maxWidth="100%" my={1} display="flex" style={{ overflowWrap: "break-word" }}>
            {ChatAvatar}
            <TypingAnimation />
          </Box>
        ) : null}
      </Box>
      <Box
        sx={{
          flex: "0 1 auto",
          display: "flex",
          alignContent: "flex-end",
          "& > *": {
            minWidth: 0,
          },
        }}
      >
        {actReq && actReq.type === "text" && (
          <TextInput chatController={chatCtl} actionRequest={actReq} />
        )}
        {actReq && actReq.type === "select" && (
          <SelectInput chatController={chatCtl} actionRequest={actReq} />
        )}
        {actReq && actReq.type === "multi-select" && (
          <MultiSelectInput chatController={chatCtl} actionRequest={actReq} />
        )}
        {actReq && actReq.type === "file" && (
          <FileInput chatController={chatCtl} actionRequest={actReq} />
        )}
        {actReq && actReq.type === "audio" && (
          <AudioInput chatController={chatCtl} actionRequest={actReq} />
        )}
        {actReq && actReq.type === "custom" && (
          <CustomComponent chatController={chatCtl} actionRequest={actReq} />
        )}
      </Box>
    </Box>
  );
}

ChatContainer.propTypes = {
  chatController: PropTypes.instanceOf(ChatController).isRequired,
};

export default ChatContainer;

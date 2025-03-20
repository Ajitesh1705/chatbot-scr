import { Box } from "components";
import ChatInterface from "interfaces/Chat";
import PropTypes from "prop-types";
import React from "react";

function Chat({ chatCtl }) {
  return (
    <Box height="inherit">
      {chatCtl ? <ChatInterface chatCtl={chatCtl} data-testid="chat-interface" /> : "No chatCtl"}
    </Box>
  );
}

Chat.propTypes = {
  // eslint-disable-next-line react/require-default-props
  chatCtl: PropTypes.any,
};
export default Chat;

import "components/TypingAnimation/style.css";

import { Box } from "components";
import React from "react";

function TypingAnimation() {
  return (
    <Box className="chat-bubble">
      <Box className="typing">
        <Box className="dot" />
        <Box className="dot" />
        <Box className="dot" />
      </Box>
    </Box>
  );
}

export default TypingAnimation;

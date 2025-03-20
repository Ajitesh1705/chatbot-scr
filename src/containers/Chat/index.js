import { ChatController } from "interfaces/Chat/src";
import DataGrid from "modules/DataGrid";
import React, { useEffect, useState } from "react";
import { usePostQueryMutation } from "store/services/queryApi";
import InteractionHandlerView from "views/Chat";

function Chat() {
  const [restart, setRestart] = useState(0);
  const [chatCtl, setChatCtl] = useState(
    new ChatController({
      showDateTime: false,
      messages: [
        {
          type: "text",
          content: "Write your query here",
        },
      ],
    })
  );

  const handleRecommendationClick = async (recommendation) => {
    if (chatCtl) {
      await chatCtl.addMessage({
        type: "text",
        content: `${recommendation}`,
        category: "answer",
        self: true,
      });

      await chatCtl.addMessage({
        type: "jsx",
        content: (
          <DataGrid
            chatCtl={chatCtl}
            input={{ value: recommendation }}
            handleRecommendationClick={handleRecommendationClick}
          />
        ),
      });
      setRestart(restart + 1);
    }
  };

  const chatFlow = async () => {
    const answer = await chatCtl.setActionRequest({
      type: "text",
      placeholder: "Enter your message here",
    });

    if (answer) {
      await chatCtl.addMessage({
        type: "jsx",
        content: (
          <DataGrid
            chatCtl={chatCtl}
            input={answer}
            handleRecommendationClick={handleRecommendationClick}
            chatFlow={chatFlow}
          />
        ),
      });
      setRestart(restart + 1);
    }
  };

  useEffect(() => {
    chatFlow();
  }, [restart]);

  return <InteractionHandlerView chatCtl={chatCtl} />;
}

export default Chat;

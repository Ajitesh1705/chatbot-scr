import { screen } from "@testing-library/react";
import { ChatController } from "interfaces/Chat/src/chat-controller";
import { ChatContainer } from "interfaces/Chat/src/modules/ChatContainer";
import React from "react";
import { render } from "test/test-utils";

// Mock node-emoji
jest.mock("node-emoji", () => ({
  emojify: jest.fn((text) => text),
  get: jest.fn(),
  hasEmoji: jest.fn(),
}));

describe("ChatContainer Component", () => {
  let mockChatController;

  beforeEach(() => {
    mockChatController = new ChatController({
      messages: [],
      loading: false,
      AvatarURL: "test-avatar-url",
      option: { showDateTime: true },
    });
    mockChatController.getMessages = jest.fn().mockReturnValue([]);
    mockChatController.getActionRequest = jest.fn().mockReturnValue(null);
    mockChatController.addOnMessagesChanged = jest.fn((callback) => {
      if (typeof callback === "function") {
        callback();
      }
    });
    mockChatController.removeOnMessagesChanged = jest.fn();
    mockChatController.addOnActionChanged = jest.fn((callback) => {
      if (typeof callback === "function") {
        callback();
      }
    });
    mockChatController.removeOnActionChanged = jest.fn();

    jest.spyOn(mockChatController, "addOnMessagesChanged");
    jest.spyOn(mockChatController, "removeOnMessagesChanged");
    jest.spyOn(mockChatController, "addOnActionChanged");
    jest.spyOn(mockChatController, "removeOnActionChanged");
  });

  test("renders ChatContainer without crashing", () => {
    render(<ChatContainer chatController={mockChatController} />);
    expect(screen.getByTestId("chat-container")).toBeInTheDocument();
  });

  test("calls the addOnMessagesChanged method", () => {
    render(<ChatContainer chatController={mockChatController} />);
    expect(mockChatController.addOnMessagesChanged).toHaveBeenCalled();
  });

  test("handles scrolling correctly when messages change", () => {
    const scrollMock = jest.fn();
    jest.spyOn(HTMLElement.prototype, "scrollTop", "set").mockImplementation(scrollMock);

    render(<ChatContainer chatController={mockChatController} />);
    mockChatController.addOnMessagesChanged();

    expect(scrollMock).toHaveBeenCalled();
  });
});

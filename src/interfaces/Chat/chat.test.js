import { act, screen } from "@testing-library/react";
import Chat from "interfaces/Chat";
import { ChatController } from "interfaces/Chat/src/chat-controller.js";
import React from "react";
import { render } from "test/test-utils";

// Mock node-emoji
jest.mock("node-emoji", () => ({
  get: jest.fn(),
  hasEmoji: jest.fn(),
  emojify: jest.fn((text) => text),
}));

// Mock cookiesManipulator
jest.mock("services/browserStorage/cookies", () => ({
  getAuth: () => ({
    user: {
      photo_url: "test-photo-url",
    },
  }),
}));

describe("Chat Component", () => {
  const mockSurvey = {
    survey: "Test Survey",
    questionCount: 5,
  };

  let mockChatCtl;

  beforeEach(() => {
    mockChatCtl = new ChatController({
      messages: [],
      delay: 0,
    });

    jest.spyOn(mockChatCtl, "getMessages").mockImplementation(() => []);
    jest.spyOn(mockChatCtl, "addOnMessagesChanged");
    jest.spyOn(mockChatCtl, "removeOnMessagesChanged");
    jest.spyOn(mockChatCtl, "getActionRequest");
    jest.spyOn(mockChatCtl, "getOption");
    jest.spyOn(mockChatCtl, "addOnActionChanged");
    jest.spyOn(mockChatCtl, "removeOnActionChanged");
    jest.spyOn(mockChatCtl, "setMessages");

    mockChatCtl.getActionRequest.mockReturnValue({ type: "empty" });
    mockChatCtl.getOption.mockReturnValue({ showDateTime: false });
  });

  test("renders chat component with survey title", () => {
    render(<Chat survey={mockSurvey} chatCtl={mockChatCtl} />);
    expect(screen.getByText("Test Survey")).toBeInTheDocument();
  });
  test("updates message state when chatController changes", () => {
    const { rerender } = render(<Chat survey={mockSurvey} chatCtl={mockChatCtl} />);

    const newMessages = [{ category: "question", followUp: 0 }];
    mockChatCtl.getMessages.mockReturnValue(newMessages);

    act(() => {
      const handleMessagesChanged = mockChatCtl.addOnMessagesChanged.mock.calls[0][0];
      handleMessagesChanged();
    });

    rerender(<Chat survey={mockSurvey} chatCtl={mockChatCtl} />);
    expect(mockChatCtl.getMessages).toHaveBeenCalled();
  });

  test("renders avatar with correct photo URL", () => {
    render(<Chat survey={mockSurvey} chatCtl={mockChatCtl} />);
    const avatar = screen.getByRole("img");
    expect(avatar).toHaveAttribute("src", "test-photo-url");
  });

  test("displays progress bar when questionCount exists", () => {
    render(<Chat survey={mockSurvey} chatCtl={mockChatCtl} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("updates messages when chatController emits changes", () => {
    const { rerender } = render(<Chat survey={mockSurvey} chatCtl={mockChatCtl} />);

    const newMessages = [{ category: "question", followUp: 0 }];
    mockChatCtl.setMessages(newMessages);

    act(() => {
      const handleMessagesChanged = mockChatCtl.addOnMessagesChanged.mock.calls[0][0];
      handleMessagesChanged();
    });

    rerender(<Chat survey={mockSurvey} chatCtl={mockChatCtl} />);
    expect(mockChatCtl.getMessages).toHaveBeenCalled();
  });

  test("cleans up message change listener on unmount", () => {
    const { unmount } = render(<Chat survey={mockSurvey} chatCtl={mockChatCtl} />);
    unmount();
    expect(mockChatCtl.removeOnMessagesChanged).toHaveBeenCalled();
  });
});

import { screen, waitFor } from "@testing-library/react";
import { Message } from "interfaces/Chat/src/modules/Message";
import React from "react";
import { render } from "test/test-utils";

// Mock node-emoji
jest.mock("node-emoji", () => ({
  emojify: jest.fn((text) => text),
  get: jest.fn(),
  hasEmoji: jest.fn(),
}));

describe("Chat Interface Message", () => {
  const mockMessage = {
    id: 1,
    message: {
      username: "Akash kumar",
      avatar: "https://example.com/avatar.jpg",
      content: "Some message text",
      createdAt: new Date("2024-11-20T19:20:00"),
      updatedAt: null,
      deletedAt: null,
      self: false,
      type: "text",
    },
    showDate: true,
    showTime: true,
  };

  test("Should display avatar correctly", async () => {
    render(<Message id={mockMessage.id} message={mockMessage.message} showDate showTime />);
    const avatar = screen.getByAltText("Akash kumar");
    expect(avatar).toBeInTheDocument();
  });

  test("Should not display avatar when not provided", async () => {
    const mockMessageWithoutAvatar = {
      ...mockMessage,
      message: {
        ...mockMessage.message,
        avatar: null,
      },
    };

    render(
      <Message
        id={mockMessageWithoutAvatar.id}
        message={mockMessageWithoutAvatar.message}
        showDate
        showTime
      />
    );
    const avatar = screen.queryByAltText("Akash kumar");
    expect(avatar).not.toBeInTheDocument();
  });

  test("Should render username correctly", async () => {
    render(<Message id={mockMessage.id} message={mockMessage.message} showDate showTime />);

    await waitFor(() => {
      const userName = screen.getByText(/Akash kumar/i);
      expect(userName).toBeInTheDocument();
    });
  });

  test("Should render date and time correctly", async () => {
    render(<Message id={mockMessage.id} message={mockMessage.message} showDate showTime />);

    await waitFor(() => {
      const date = screen.getByText(mockMessage.message.createdAt.toLocaleDateString());
      const time = screen.getByText(
        mockMessage.message.createdAt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      expect(date).toBeInTheDocument();
      expect(time).toBeInTheDocument();
    });
  });
});

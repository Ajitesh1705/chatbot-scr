import { fireEvent, screen } from "@testing-library/react";
import { TextInput } from "interfaces/Chat/src/modules/TextInput.js";
import React from "react";
import { render } from "test/test-utils";

describe("Chat TextInput", () => {
  const mockChatController = {
    setActionResponse: jest.fn(),
  };

  const mockActionRequest = {
    placeholder: "Test placeholder",
    defaultValue: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with correct placeholder", () => {
    render(<TextInput chatController={mockChatController} actionRequest={mockActionRequest} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test("updates input value on change", () => {
    render(<TextInput chatController={mockChatController} actionRequest={mockActionRequest} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test input" } });
    expect(input.value).toBe("test input");
  });

  test("calls setResponse on Enter without Shift ", async () => {
    render(<TextInput chatController={mockChatController} actionRequest={mockActionRequest} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test message" } });
    fireEvent.keyDown(input, { key: "Enter", shiftKey: false });

    expect(mockChatController.setActionResponse).toHaveBeenCalledWith(mockActionRequest, {
      type: "text",
      value: "test message",
    });
    expect(input.value).toBe("");
  });

  test("does not call setResponse on Shift+Enter", () => {
    render(<TextInput chatController={mockChatController} actionRequest={mockActionRequest} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test message" } });
    fireEvent.keyDown(input, { key: "Enter", shiftKey: true });

    expect(mockChatController.setActionResponse).not.toHaveBeenCalled();
  });

  test("calls setResponse when clicking send button ", async () => {
    render(<TextInput chatController={mockChatController} actionRequest={mockActionRequest} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test message" } });
    const sendButton = screen.getByTestId("SendIcon").closest("button");
    fireEvent.click(sendButton);

    expect(mockChatController.setActionResponse).toHaveBeenCalledWith(mockActionRequest, {
      type: "text",
      value: "test message",
    });
    expect(input.value).toBe("");
  });

  test("send button visibility depends on input value", () => {
    render(<TextInput chatController={mockChatController} actionRequest={mockActionRequest} />);
    const input = screen.getByRole("textbox");
    const sendButton = screen.getByTestId("SendIcon").closest("button");

    expect(sendButton).toHaveStyle({ display: "none" });

    fireEvent.change(input, { target: { value: "test" } });
    expect(sendButton).toHaveStyle({ display: "block" });
  });

  test("does not submit empty input", () => {
    render(<TextInput chatController={mockChatController} actionRequest={mockActionRequest} />);
    const input = screen.getByRole("textbox");

    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockChatController.setActionResponse).not.toHaveBeenCalled();
  });
});

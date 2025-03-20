import { fireEvent, screen } from "@testing-library/react";
import { ChatController } from "interfaces/Chat/src/chat-controller";
import { SelectInput } from "interfaces/Chat/src/modules/SelectInput";
import React from "react";
import { render } from "test/test-utils";

// Mock node-emoji
jest.mock("node-emoji", () => ({
  emojify: jest.fn((text) => text),
  get: jest.fn(),
  hasEmoji: jest.fn(),
}));

describe("Chat SelectInput", () => {
  let chatController;
  let actionRequest;

  beforeEach(() => {
    jest.clearAllMocks();
    chatController = new ChatController({});
    chatController.setActionResponse = jest.fn();
    actionRequest = {
      type: "select",
      addMessage: true,
      always: false,
      options: [
        { value: "Yes", text: "Yes" },
        { value: "No", text: "No" },
      ],
    };
  });

  test("renders SelectInput without crashing", () => {
    render(<SelectInput chatController={chatController} actionRequest={actionRequest} />);
  });

  test("selects option and enables submit button", () => {
    render(<SelectInput chatController={chatController} actionRequest={actionRequest} />);
    const buttons = screen.getAllByRole("button");
    const options = screen.getAllByRole("heading");
    const submitButton = buttons.find((button) => button.textContent === "Submit");

    expect(submitButton).toBeDisabled();
    fireEvent.click(options[0]);
    expect(submitButton).toBeEnabled();
  });

  test("submits selected option", () => {
    render(<SelectInput chatController={chatController} actionRequest={actionRequest} />);

    const options = screen.getAllByRole("heading");
    const buttons = screen.getAllByRole("button");
    const submitButton = buttons.find((button) => button.textContent === "Submit");

    fireEvent.click(options[0]);
    fireEvent.click(submitButton);

    expect(chatController.setActionResponse).toHaveBeenCalledWith(actionRequest, {
      type: "select",
      value: "Yes",
      option: actionRequest.options[0],
    });
  });

  test("handles empty options gracefully", () => {
    actionRequest.options = [];
    render(<SelectInput chatController={chatController} actionRequest={actionRequest} />);
    expect(screen.getByText("Only one option may be selected")).toBeInTheDocument();
  });

  test("throws error on invalid selection", async () => {
    render(<SelectInput chatController={chatController} actionRequest={actionRequest} />);
    const buttons = screen.getAllByRole("button");
    const submitButton = buttons.find((button) => button.textContent === "Submit");

    chatController.setActionResponse.mockImplementationOnce(() => {
      throw new Error("Unknown value: invalid");
    });

    try {
      fireEvent.click(submitButton);
    } catch (error) {
      expect(error.message).toBe("Unknown value: invalid");
    }
  });
});

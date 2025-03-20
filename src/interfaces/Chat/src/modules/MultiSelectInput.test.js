import { fireEvent, screen, waitFor } from "@testing-library/react";
import { ChatController } from "interfaces/Chat/src/chat-controller";
import { MultiSelectInput } from "interfaces/Chat/src/modules/MultiSelectInput";
import React from "react";
import { render } from "test/test-utils";

// Mock node-emoji
jest.mock("node-emoji", () => ({
  emojify: jest.fn((text) => text),
  get: jest.fn(),
  hasEmoji: jest.fn(),
}));

describe("Chat MultiSelectInput", () => {
  let chatController;
  let actionRequest;

  beforeEach(() => {
    jest.clearAllMocks();
    chatController = new ChatController({});
    chatController.setActionResponse = jest.fn();
    actionRequest = {
      type: "multi-select",
      addMessage: true,
      always: false,
      options: [
        { value: "Yes", text: "Yes" },
        { value: "No", text: "No" },
      ],
    };
  });

  test("renders MultiSelectInput without crashing", () => {
    render(<MultiSelectInput chatController={chatController} actionRequest={actionRequest} />);
    const optionElements = screen.getByText("More than one option may be selected");
    expect(optionElements).toBeInTheDocument();
  });

  test("selects options one or more and enables submit button", () => {
    render(<MultiSelectInput chatController={chatController} actionRequest={actionRequest} />);
    const options = screen.getAllByRole("heading");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    expect(submitButton).toBeDisabled();

    fireEvent.click(options[0].parentElement);
    expect(submitButton).toBeEnabled();
  });

  test("submits selected options", async () => {
    render(<MultiSelectInput chatController={chatController} actionRequest={actionRequest} />);

    const options = screen.getAllByRole("heading");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.click(options[0].parentElement);
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(chatController.setActionResponse).toHaveBeenCalledWith(actionRequest, {
        type: "multi-select",
        value: "Yes",
        options: [actionRequest.options[0]],
      });
    });
  });

  test("handles empty options", () => {
    actionRequest.options = [];
    render(<MultiSelectInput chatController={chatController} actionRequest={actionRequest} />);
    expect(screen.getByText("More than one option may be selected")).toBeInTheDocument();
  });

  test("handles multiple selections", async () => {
    render(<MultiSelectInput chatController={chatController} actionRequest={actionRequest} />);

    const options = screen.getAllByRole("heading");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.click(options[0].parentElement);
    fireEvent.click(options[1].parentElement);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(chatController.setActionResponse).toHaveBeenCalledWith(actionRequest, {
        type: "multi-select",
        value: "Yes\r\nNo",
        options: [actionRequest.options[0], actionRequest.options[1]],
      });
    });
  });

  test("disables submit button when no options are selected", async () => {
    render(<MultiSelectInput chatController={chatController} actionRequest={actionRequest} />);

    const options = screen.getAllByRole("heading");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.click(options[0].parentElement);
    expect(submitButton).toBeEnabled();
    fireEvent.click(options[0].parentElement);
    expect(submitButton).toBeDisabled();
  });
});

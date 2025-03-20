export class ChatController {
  constructor(option) {
    this.defaultOption = {
      delay: 600,
      messages: [],
      loading: false,
      AvatarURL: "-",
    };

    this.emptyAction = {
      request: { type: "empty" },
      responses: [],
      onResnponsed: [],
    };

    this.defaultActionRequest = {
      always: false,
      addMessage: true,
    };

    this.state = {
      option: { ...this.defaultOption, ...option },
      messages: option.messages ? option.messages : this.defaultOption.messages,
      action: this.emptyAction,
      actionHistory: [],
      onMessagesChanged: [],
      onActionChanged: [],
    };
  }

  async addMessage(message) {
    return new Promise((resolve) => {
      this.loading = !message.self;

      setTimeout(
        () => {
          const len = this.state.messages.push(message);
          const idx = len - 1;
          this.state.messages[idx].createdAt = new Date();
          this.callOnMessagesChanged();
          this.loading = false;
          resolve(idx);
        },
        message.self ? 100 : this.state.option.delay
      );
    });
  }

  updateLoader(isLoading) {
    this.state.option.loading = isLoading;
  }

  updateMessage(index, message) {
    if (message !== this.state.messages[index]) {
      const { createdAt } = this.state.messages[index];
      this.state.messages[index] = message;
      this.state.messages[index].createdAt = createdAt;
    }

    this.state.messages[index].updatedAt = new Date();
    this.callOnMessagesChanged();
  }

  removeMessage(index) {
    this.state.messages[index].deletedAt = new Date();
    this.callOnMessagesChanged();
  }

  getMessages() {
    return this.state.messages;
  }

  setMessages(messages) {
    this.clearMessages();
    this.state.messages = [...messages];
    this.callOnMessagesChanged();
  }

  clearMessages() {
    this.state.messages = [];
    this.callOnMessagesChanged();
  }

  callOnMessagesChanged() {
    this.state.onMessagesChanged.map((h) => h(this.state.messages));
  }

  addOnMessagesChanged(callback) {
    this.state.onMessagesChanged.push(callback);
  }

  removeOnMessagesChanged(callback) {
    const idx = this.state.onMessagesChanged.indexOf(callback);
    this.state.onActionChanged[idx] = () => {};
  }

  async setActionRequest(request, onResponse) {
    const action = {
      request: { ...this.defaultActionRequest, ...request },
      responses: [],
      onResnponsed: [],
    };

    return new Promise((resolve, reject) => {
      if (!request.always) {
        const returnResponse = (response) => {
          if (!response.error) {
            resolve(response);
          } else {
            reject(response.error);
          }
        };
        action.onResnponsed.push(returnResponse);
      }

      if (onResponse) {
        action.onResnponsed.push(onResponse);
      }

      this.state.action = action;
      this.state.actionHistory.push(action);
      this.callOnActionChanged(action.request);

      if (request.always) {
        resolve({ type: "text", value: "dummy" });
      }
    });
  }

  cancelActionRequest() {
    this.state.action = this.emptyAction;
    this.callOnActionChanged(this.emptyAction.request);
  }

  getActionRequest() {
    const { request, responses } = this.state.action;
    if (!request.always && responses.length > 0) {
      return undefined;
    }

    return request;
  }

  async setActionResponse(request, response) {
    const { request: origReq, responses, onResnponsed } = this.state.action;
    if (request !== origReq) {
      throw new Error("Invalid action.");
    }
    if (!request.always && onResnponsed.length === 0) {
      throw new Error("onResponsed is not set.");
    }

    responses.push(response);
    this.callOnActionChanged(request, response);
    if (request.addMessage) {
      await this.addMessage({
        type: "text",
        content: response.value,
        self: true,
        avatar: "https://i.imgur.com/MSpJeRS.png",
      });
    }

    onResnponsed.map((h) => h(response));
  }

  getActionResponses() {
    return this.state.action.responses;
  }

  callOnActionChanged(request, response) {
    this.state.onActionChanged.map((h) => h(request, response));
  }

  addOnActionChanged(callback) {
    this.state.onActionChanged.push(callback);
  }

  removeOnActionChanged(callback) {
    const idx = this.state.onActionChanged.indexOf(callback);
    this.state.onActionChanged[idx] = () => {};
  }

  getOption() {
    return this.state.option;
  }
}

export default ChatController;

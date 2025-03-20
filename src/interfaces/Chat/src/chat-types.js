const PropTypes = require("prop-types");

export const ChatOptionPropTypes = PropTypes.shape({
  delay: PropTypes.number,
  showDateTime: PropTypes.bool,
});

export const MessagePropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  self: PropTypes.bool.isRequired,
  username: PropTypes.string,
  avatar: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  updatedAt: PropTypes.instanceOf(Date),
  deletedAt: PropTypes.instanceOf(Date),
});

export const TextMessagePropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  self: PropTypes.bool.isRequired,
  username: PropTypes.string,
  avatar: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  updatedAt: PropTypes.instanceOf(Date),
  deletedAt: PropTypes.instanceOf(Date),
});

export const JSXMessagePropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  self: PropTypes.bool.isRequired,
  username: PropTypes.string,
  avatar: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  updatedAt: PropTypes.instanceOf(Date),
  deletedAt: PropTypes.instanceOf(Date),
});

export const ActionRequestPropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  always: PropTypes.bool,
  addMessage: PropTypes.bool,
  response: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.instanceOf(Error),
  }),
});

export const TextActionRequestPropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  sendButtonText: PropTypes.string,
  response: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.instanceOf(Error),
  }),
});

export const SelectActionRequestPropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  response: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.instanceOf(Error),
  }),
});

export const MultiSelectActionRequestPropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  sendButtonText: PropTypes.string,
  response: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.instanceOf(Error),
  }),
});

export const FileActionRequestPropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  response: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.instanceOf(Error),
  }),
  sendButtonText: PropTypes.string,
});

export const AudioActionRequestPropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  sendButtonText: PropTypes.string,
  response: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.instanceOf(Error),
  }),
});

export const CustomActionRequestPropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  Component: PropTypes.element.isRequired,
  response: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.instanceOf(Error),
  }),
});

export const ActionResponsePropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.instanceOf(Error),
});

export const TextActionResponsePropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.instanceOf(Error),
});

export const SelectActionResponsePropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  option: PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  error: PropTypes.instanceOf(Error),
});

export const MultiSelectActionResponsePropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  error: PropTypes.instanceOf(Error),
});

export const FileActionResponsePropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.instanceOf(File)),
  error: PropTypes.instanceOf(Error),
});

export const AudioActionResponsePropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  audio: PropTypes.instanceOf(Blob),
  error: PropTypes.instanceOf(Error),
});

export const CustomActionResponsePropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.instanceOf(Error),
});

export const OnMessagesChangedPropTypes = PropTypes.func.isRequired;

export const OnActionChangedPropTypes = PropTypes.func.isRequired;

export const OnActionResponsedPropTypes = PropTypes.func.isRequired;

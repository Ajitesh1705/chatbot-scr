import store from "store/store";

const Dispatcher = async ({ action, payload = {}, isAsync = true, showAlert = false }) => {
  if (isAsync) {
    try {
      const originalPromiseResult = await store.dispatch(action(payload)).unwrap();
      return originalPromiseResult || null;
    } catch (error) {
      if (showAlert) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        alert(errorMessage);
      }
      return error;
    }
  } else {
    store.dispatch(action(payload));
    return null;
  }
};

export default Dispatcher;

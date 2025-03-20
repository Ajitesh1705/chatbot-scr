// /* eslint-disable import/no-named-as-default */
// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "store/slices/authSlice";
// import responseSlice from "store/slices/responseSlice";
// import surveySlice from "store/slices/surveySlice";

// const store = configureStore({
//   reducer: {
//     auths: authSlice,
//     responses: responseSlice,
//     surveys: surveySlice,
//   },
// });

// export default store;

import { configureStore, isRejected } from "@reduxjs/toolkit";
import { api } from "config/apiHandler";
import cookiesManipulator from "services/browserStorage/cookies";

export const rtkQueryErrorLogger = () => (next) => async (action) => {
  // isRejectedWithValue Or isRejected
  if (isRejected(action)) {
    if (
      action.error?.message === "Authentication failed." ||
      action.error?.message === "Authorisation failed."
    ) {
      await cookiesManipulator.removeAuth();
    }
  }

  return next(action);
};

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },

  middleware: (gDM) => gDM().concat(api.middleware).concat(rtkQueryErrorLogger),
});

export default store;

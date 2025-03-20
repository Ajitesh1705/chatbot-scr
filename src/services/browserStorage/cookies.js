/* eslint-disable camelcase */
import Cookies from "universal-cookie";

const cookies = new Cookies();
const expireDate = new Date();
// expireDate.setFullYear(expireDate.getFullYear() + 1);
expireDate.setDate(expireDate.getDate() + 7);

const options = {
  path: "/",
  secure: true,
  // domain: window.location.hostname,
  expires: expireDate,
};
const cookiesManipulator = {
  setAuth: (data) => {
    const { session, user, survey_token } = data;
    cookies.set("token", session.token, options);
    cookies.set("user", user, options);
    cookies.set("role", user.role, options);
    cookies.set("survey_token", survey_token, options);
  },
  removeAuth: () => {
    cookies.remove("token", options);
    cookies.remove("survey_token", options);
  },
  getAuth: () => ({
    token: cookies.get("token", options),
    user: cookies.get("user", options),
    role: cookies.get("role", options),
  }),
  setCookies: (key, value) => cookies.set(key, value, options),
  getCookies: (key) => cookies.get(key, options),
  removeCookies: (key) => cookies.remove(key, options),
};

export default cookiesManipulator;

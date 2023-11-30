import Cookie from "js-cookie";
import { getAccessTokenCookie, getAccessTokenCookieAdmin} from "../../utils/cookie";

// console.log(Object.keys(Cookie.get())[0].includes("ADMIN"))
// console.log(getAccessTokenCookie())
// console.log(getAccessTokenCookieAdmin())

const cookieAdmin = Object.keys(Cookie.get())[0]?.includes("ADMIN")
const cookieAdminName = getAccessTokenCookieAdmin()
const cookieUserName = getAccessTokenCookie()
// console.log(cookieAdmin)
// console.log(cookieAdminName)
// console.log(cookieUserName)

export const onRequest = (config) => {
  config.headers = {
    Authorization: !!cookieAdmin ? cookieAdminName : cookieUserName, 
    "Content-Type": "application/json",
  };
  return config;
};

export const onRequestError = (error) => {
  return Promise.reject(error.response);
};

export const onResponse = (response) => {
  return response.data;
};

export const onResponseError = (error) => {
  return Promise.reject(error.response);
};

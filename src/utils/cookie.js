import Cookie from "js-cookie";

export const CROWDFUNDING_COOKIE = "CROWDFUNDING_COOKIE";

export const setAccessTokenCookie = (accessToken) => {
  Cookie.set(CROWDFUNDING_COOKIE, accessToken);
};

export const getAccessTokenCookie = () => {
  const accessTokenCookie = Cookie.get(CROWDFUNDING_COOKIE);
  return accessTokenCookie ?? null;
};

export const clearAccessTokenCookie = () => {
  Cookie.remove(CROWDFUNDING_COOKIE);
};


export const CROWDFUNDING_COOKIE_ADMIN = "CROWDFUNDING_COOKIE_ADMIN";

export const setAccessTokenCookieAdmin = (accessToken) => {
  Cookie.set(CROWDFUNDING_COOKIE_ADMIN, accessToken);
};

export const getAccessTokenCookieAdmin = () => {
  const accessTokenCookieAdmin = Cookie.get(CROWDFUNDING_COOKIE_ADMIN);
  return accessTokenCookieAdmin ?? null;
};

export const clearAccessTokenCookieAdmin = () => {
  Cookie.remove(CROWDFUNDING_COOKIE_ADMIN);
};
export const regexp = {
  // eslint-disable-next-line no-useless-escape
  login: /^[0-9a-z\._]{5,20}$/,
  password: /^.{8,50}$/,
  accessToken: /^\w{32}$/,
};

export const generateApiKey = () => {
  const TOKEN_LENGHT = 60;
  const TOKEN =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let apiKey = "";
  for (let index = 1; index <= TOKEN_LENGHT; index++) {
    const randomIndex = Math.floor(Math.random() * TOKEN.length);
    const char = TOKEN[randomIndex];
    apiKey = apiKey.concat(char);
  }

  return apiKey;
};

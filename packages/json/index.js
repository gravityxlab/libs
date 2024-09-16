export const parseJSON = (string) => {
  try {
    return JSON.parse(string);

  } catch (error) {
    return null;
  }
};
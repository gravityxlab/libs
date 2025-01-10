export const parseJSON = (string: string) => {
  try {
    return JSON.parse(string);
  } catch (error) {
    return null;
  }
};

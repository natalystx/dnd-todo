export const toCapitalize = (str: string) => {
  const firstLetter = str.charAt(0).toUpperCase();
  return firstLetter + str.toLowerCase().slice(1, str.length);
};

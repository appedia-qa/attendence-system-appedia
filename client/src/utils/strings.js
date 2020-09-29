
export const checkValidURL = (string) => {
  try {
    new URL(string);
  } catch (_) {
    return false;  
  }

  return true;
}

export const makeFirstLetterUpperCase = (string) => {
  if (string.length > 0) {
    string = string.charAt(0).toUpperCase() + string.slice(1)
  }
  return string;
}
export function isRequired(str = '' | undefined) {
  if (str !== null) {
    return !(str.trim().length === 0);
  }
  return false;
}

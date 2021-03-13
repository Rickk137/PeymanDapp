export function stringEllipse(str: string) {
  if (str.length > 12) {
    return str.substr(0, 4) + "...." + str.substr(str.length - 4, str.length);
  }
  return str;
}

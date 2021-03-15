export function stringEllipse(str: string, l = 4) {
  if (str.length > 12) {
    return str.substr(0, l) + '....' + str.substr(str.length - l, str.length);
  }
  return str;
}
export function weiToEther(amount: string) {
  return parseInt(amount || '0') / 1000000000000000000;
}
export function etherToWei(amount: number) {
  return amount * 1000000000000000000;
}

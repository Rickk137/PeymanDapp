export function stringEllipse(str: string) {
  if (str.length > 12) {
    return str.substr(0, 4) + '....' + str.substr(str.length - 4, str.length);
  }
  return str;
}
export function weiToEther(amount: string) {
  return parseInt(amount || '0') / 1000000000000000000;
}
export function etherToWei(amount: number) {
  return amount * 1000000000000000000;
}

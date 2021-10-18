export function padZero(str: string, len = 2): string {
  const zeros = new Array(len).join('0');

  return (zeros + str).slice(-len);
}

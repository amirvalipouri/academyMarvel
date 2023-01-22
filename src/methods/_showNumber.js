export default function showNumber(val = 0) {
  const number = Number(val);
  return number < 10 ? `0${number}` : number;
}

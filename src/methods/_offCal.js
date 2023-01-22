export default function offCal(price = 0, off = 0) {
  if (off === 0) return price;
  return ((100 - off) * price) / 100;
}

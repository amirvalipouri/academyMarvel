import { showNumber } from ".";
export default function getTime() {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  // const ampm = date.getHours() >= 12 ? "PM" : "AM";

  const value = [showNumber(hour), showNumber(min), showNumber(sec)];

  return value;
}

import { server } from "../constants";
export default function source(src) {
  return `${server}/${src}`;
  // return `https://marveltradeacadmy.com/${src}`;
}

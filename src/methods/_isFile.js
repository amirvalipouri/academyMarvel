export default function isFile(val) {
  return typeof val?.name !== "undefined";
}
// export default function isBase64(val = "") {
//   const regex =
//     /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
//   return regex.test(val);
// }

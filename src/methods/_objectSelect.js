import cloneDeep from "lodash/cloneDeep";
export default function objectSelect(obj = {}, keys = []) {
  const object = {};
  keys.forEach((key) => {
    object[key] = obj[key];
    typeof obj[key] === "undefined" && delete obj[key];
  });
  return cloneDeep(object);
}

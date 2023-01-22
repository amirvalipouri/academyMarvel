import { base64Regex } from "../constants";
export default function fileToBase64(file = undefined, applyRegex = false) {
  if (typeof file !== "object") return file;
  const promise = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (applyRegex) return resolve(result.replace(base64Regex, ""));
      resolve(result);
    };
    reader.onerror = () => {
      reject("reader error");
    };
    reader.readAsDataURL(file);
  });
  return promise;
}

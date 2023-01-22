export default function showFileName(file) {
  if (!Boolean(file)) return "";
  if (typeof file === "string") return file.split("/").at(-1);
  if (typeof file === "object") return file[0]?.name;
  return "FILE";
}

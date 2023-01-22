export default function downloadBase64(base64 = "") {
  if (!Boolean(base64)) return;
  const type = base64.substring(
    base64.indexOf("/") + 1,
    base64.indexOf(";base64")
  );
  const link = document.createElement("a");
  link.href = base64;
  link.download = `question-file.${type}`;
  link.click();
}

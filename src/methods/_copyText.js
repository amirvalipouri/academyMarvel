export default async function copyText(text = "") {
  return await navigator.clipboard.writeText(text);
}

export default function showActiveImg(img = []) {
  return img.filter(Boolean).at(0);
}

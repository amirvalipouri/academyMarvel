import showNumber from "./_showNumber";

export default function convertTime(time = 0) {
  const hour = Math.floor(time / 3600);
  const min = Math.floor((time - hour * 3600) / 60);
  const sec = Math.floor(time % 60);

  return [hour, min, sec].map((t) => showNumber(t)).join(":");
}

function arrayAt() {
  if ("at" in Array.prototype) return;
  // eslint-disable-next-line
  Array.prototype.at = function (activeLen = 0) {
    const length = this.length;
    if (activeLen < 0) return this[length + activeLen];
    return this[activeLen];
  };
}

export default function prototypes() {
  arrayAt();
}

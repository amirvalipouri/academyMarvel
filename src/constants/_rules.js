const emailRegex =
  // eslint-disable-next-line
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const stringRegex = new RegExp("^[^;<>$#@%`~:&^{}]*$");
// const string2Regex = new RegExp("^[^;<>`&^{}]*$");
const optional = [() => true];
const required = [(val = "") => String(val).length > 0 || "ورودی الزامی است."];
const phoneNumber = [
  ...required,
  (val = "") => val.substring(0, 2) === "09" || "شماره باید با 09 شروع شود.",
  (val = "") => val.length === 11 || "شماره موبایل معتبر نیست.",
];

const email = [(val = "") => emailRegex.test(val) || "ایمیل نامعتبر است."];

const password = [
  // (val = "") => /[a-z]/.test(val) || "حد اقل یک حرف کوچک.",
  // (val = "") => /[A-Z]/.test(val) || "حد اقل یک حرف بزرگ.",
  // (val = "") => /[0-9]/.test(val) || "حد اقل یک عدد.",
  (val = "") =>
    (val.length >= 8 && val.length <= 25) || "بین 8 تا 25 کاراکتر باشد..",
];
const newPassword = [
  (val = "") =>
    val.length === 0 ||
    (val.length >= 8 && val.length <= 25) ||
    "بین 8 تا 25 کاراکتر باشد..",
];
const description = [
  ...required,
  (val = "") => stringRegex.test(val) || "کاراکتر خاص مجاز نیست.",
  (val = "") => val.length <= 512 || "طول باید از 512 کوچکتر باشد.",
];
const score = [
  ...required,
  (val = "") =>
    (Number(val) >= 0 && Number(val) <= 100) ||
    "امتیاز باید بین 0 تا 100 باشد.",
];
const answer = [
  ...required,
  (val = "") =>
    (parseInt(val) >= 1 && parseInt(val) <= 4) || "جواب باید بین 1 تا 4 باشد.",
];
const nationalId = [
  ...required,
  (val = "") => val.length === 10 || "کد ملی معتبر نیست.",
];
const imgSize = [
  (val = []) =>
    val.length === 0 ||
    typeof val === "string" ||
    [...val].every((f) => f.size <= 5000000) ||
    "محدودیت فایل 5 مگابایت است.",
];
const videoSize = [
  (val = []) =>
    val.length === 0 ||
    typeof val === "string" ||
    [...val].every((f) => f.size <= 500000000) ||
    "محدودیت فایل 500 مگابایت است.",
];
const postCode = [
  ...required,
  (val = "") => val.length === 10 || "کد پستی نامعتبر است",
];
const rules = {
  optional,
  phoneNumber,
  required,
  email,
  password,
  description,
  score,
  answer,
  nationalId,
  imgSize,
  videoSize,
  postCode,
  newPassword,
};
export default rules;

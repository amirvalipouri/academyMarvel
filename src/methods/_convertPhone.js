export default function convertPhone(phone = "") {
  const hasCountryCode = phone.search(/[+]98/) === 0;
  const hasNotCountryCode = phone.search("09") === 0;
  if (hasCountryCode) return `0${phone.substring(3)}`;
  if (hasNotCountryCode) return `+98${phone.substring(1)}`;
  return `+${phone}`;
}

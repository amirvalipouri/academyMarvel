import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

export default function useShowFullName() {
  const profile = useSelector((s) => s.profile);
  const isLogged = useSelector((s) => s.isLogged);
  return () => {
    const needRegister = profile.needRegister;
    if (!isLogged || isEmpty(profile)) return "ورود";
    if (needRegister) return "پروفایل من";
    const { firstName, lastName } = profile;
    return `${firstName} ${lastName}`;
  };
}

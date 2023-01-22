import store from "../redux";
import toast from "./_toast";

export default function logout(isRequest = false) {
  const message = "آیا از درخواست خود مطمئن هستید؟";
  if (!isRequest && !window.confirm(message)) return;
  const text = "عملیات با موفقیت انجام شد.";
  !isRequest && toast({ text });
  store.dispatch({ type: "SET_IS_LOGGED", data: false });
  store.dispatch({ type: "SET_ROLE", data: null });
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

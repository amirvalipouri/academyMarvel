import { axios } from "../boot";
import { useDispatch } from "react-redux";

export default function useSetToken() {
  const dispatch = useDispatch();
  const setRole = (data) => dispatch({ type: "SET_ROLE", data });
  const setIsLogged = (data) => dispatch({ type: "SET_IS_LOGGED", data });
  return ({ token = "", role = "" }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    axios.defaults.headers["x-auth-token"] = token;
    setRole(role);
    setIsLogged(true);
  };
}

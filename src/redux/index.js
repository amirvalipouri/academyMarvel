import { combineReducers, createStore } from "redux";
import loading from "./reducers/loading";
import isLogged from "./reducers/isLogged";
import role from "./reducers/role";
import profile from "./reducers/profile";
const rootReducer = combineReducers({
  loading,
  isLogged,
  role,
  profile,
});
const store = createStore(rootReducer);
export default store;

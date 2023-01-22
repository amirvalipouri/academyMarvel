import cloneDeep from "lodash/cloneDeep";
const loading = { show: [], progress: null };
export default function reducer(state = loading, action) {
  const loading = cloneDeep(state);
  switch (action.type) {
    case "SET_LOADING":
      return action.data;
    case "SHOW_LOADING":
      loading.show.push("");
      loading.progress = null;
      return loading;
    case "HIDE_LOADING":
      loading.show.pop();
      loading.progress = null;
      return loading;
    case "SET_LOADING_PROGRESS":
      loading.progress = action.progress;
      return loading;
    default:
      return state;
  }
}

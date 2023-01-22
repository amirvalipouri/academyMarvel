const profile = {};
export default function reducer(state = profile, action) {
  switch (action.type) {
    case "SET_PROFILE":
      return action.data;
    default:
      return state;
  }
}

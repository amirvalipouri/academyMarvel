const roles = [
  {
    id: "super",
  },
  {
    id: "admin",
  },
  {
    id: "student",
  },
  {
    id: "unregistered",
  },
  // {
  //   id: "spotAndFutures",
  // },
  // {
  //   id: "spot",
  // },
  // {
  //   id: "diamond",
  // },
  // {
  //   id: "school",
  // },
  // {
  //   id: "free",
  // },
  // {
  //   id: "tortoise",
  // },
].map((i) => ({ ...i, name: i.id }));
export default roles;

const categoryTypes = [
  {
    name: "فروشگاه",
    id: "/shop",
  },
  {
    name: "دوره‌های رایگان",
    id: "",
  },
].map((e) => ({ ...e, url: e.id }));
export default categoryTypes;

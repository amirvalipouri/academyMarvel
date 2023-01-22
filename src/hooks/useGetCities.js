import { useState } from "react";
// import { axios } from "../boot";
import { cities as allCities } from "../constants";

export default function useGetCities() {
  const [cities, setCities] = useState([]);
  const getCities = (id = null) => {
    if (!Boolean(id)) return;
    setCities(allCities.filter((e) => e.province === id));
    // const url = `/pub/shop/provinces/${id}`;
    // axios.get(url).then(({ data }) => {
    //   setCities(data);
    // });
  };
  return [cities, getCities];
}

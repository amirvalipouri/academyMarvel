// import { useState } from "react";
// import { axios } from "../boot";
import { states as provinces } from "../constants";

export default function useGetProvinces() {
  // const [provinces, setProvinces] = useState([]);
  // const getProvinces = () => {
  //   const url = "/pub/shop/provinces";
  //   axios.get(url).then(({ data }) => {
  //     setProvinces(data);
  //   });
  // };
  return [provinces];
}

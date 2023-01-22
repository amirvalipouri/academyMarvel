import { useEffect, useState } from "react";
import { axios } from "../boot";
import { convertPhone } from "../methods";

export default function useGetSenderInfo() {
  const [senderInfo, setSenderInfo] = useState({});
  const getData = () => {
    const url = "/admins/pub/shop/sender-info";
    axios.get(url).then((res) => {
      const data = { ...res.data };
      data.senderMobile = convertPhone(data.senderMobile);
      setSenderInfo(data);
    });
  };
  useEffect(getData, []);
  return [senderInfo, setSenderInfo];
}

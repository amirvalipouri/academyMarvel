import React, { useEffect, useState } from "react";
import { axios } from "../boot";
export const CartCountContext = React.createContext({});

export default function CartCountProvider({ children }) {
  const [count, setCount] = useState(0);
  const getCount = () => {
    const url = "/purchases/cart/count";
    axios.get(url).then(({ data }) => {
      setCount(data);
    });
  };
  useEffect(getCount, []);
  return (
    <CartCountContext.Provider value={{ count, setCount }}>
      {children}
    </CartCountContext.Provider>
  );
}

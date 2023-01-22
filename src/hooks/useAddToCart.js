import { useContext } from "react";
import { axios } from "../boot";
import { CartCountContext } from "../contexts/CartCount";
import { toast } from "../methods";
export default function useAddToCart() {
  const { setCount } = useContext(CartCountContext);
  const addToCart = async (productId = "", count = 1) => {
    const url = "/purchases/cart";
    const body = {
      productId,
      count,
    };
    const response = await axios.post(url, body);
    if (response.status === 200) {
      setCount((p) => p + 1);
      toast({});
    }
    return response;
  };
  return addToCart;
}

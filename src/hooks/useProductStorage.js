import { toast } from "../methods";
import useAddToCart from "./useAddToCart";
import { useDispatch , useSelector } from "react-redux";
export default function useProductStorage() {
  const countSell = useSelector((state) => state.countSell)
  const dispatch = useDispatch();
  const addToCart = useAddToCart();
  const get = () => {
    const cart = sessionStorage.getItem("cart");
    return JSON.parse(cart) || [];
  };
  const set = (product = {}) => {
    const list = get();
    const index = list.findIndex((e) => e.product?._id === product._id);
    const has = index !== -1;
    if (has) {
      list[index].count++;
      dispatch({type : "INCREMENT"})

    } else {
      list.push({ product, count: 1, _id: product._id });
      dispatch({type : "INCREMENT"})
    }
    const text = "محصول به سبد خرید شما اضافه شد"
    toast({text});
    const value = JSON.stringify(list);
    sessionStorage.setItem("cart", value);
  };
  const remove = (product) => {
    const list = get();
    const index = list.findIndex((e) => e.product?._id === product._id);
    const has = list[index].count > 1;
    if (has) {
      list[index].count--;
      dispatch({type : "DECREMENT"})
    } else {
      list.splice(index, 1);
      dispatch({type : "DECREMENT"})
    }
    const text = "محصول از سبد خرید شما حذف شد"
    toast({text});
    const value = JSON.stringify(list);
    sessionStorage.setItem("cart", value);
  };
  const clear = () => {
    sessionStorage.removeItem("cart");
    dispatch({type : "RESET"})
  };
  const getCartInfo = () => {
    const items = get();
    const totalCount = items.map((e) => e.count).reduce((a, b) => a + b, 0);
    const totalPrice = items
      .map((e) => e.count * e.product.price)
      .reduce((a, b) => a + b, 0);
    const totalPriceUsd = items
      .map((e) => e.count * e.product.priceUsd)
      .reduce((a, b) => a + b, 0);
    const cartInfo = {
      items,
      totalCount,
      totalPrice,
      totalPriceUsd,
    };
    return cartInfo;
  };
  const addListToCart = async () => {
    const items = get().map((e) => ({ count: e.count, _id: e._id }));
    const requests = items.map(async (e) => await addToCart(e._id, e.count));
    return await Promise.all(requests);
  };
  const has = () => {
    return !!get().length;
  };
  const productStorage = {
    set,
    get,
    clear,
    getCartInfo,
    addListToCart,
    remove,
    has,
  };
  return productStorage;
}

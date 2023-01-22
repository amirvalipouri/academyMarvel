import { useContext } from "react";
import { ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { showActiveImg, source } from "../../../methods";
import { axios } from "../../../boot";
import { useProductStorage } from "../../../hooks";
import { CartCountContext } from "../../../contexts/CartCount";

export default function Products({ cartItems = [], setCartInfo = () => {} }) {
  const productStorage = useProductStorage();
  const isLogged = useSelector((s) => s.isLogged);
  const { setCount } = useContext(CartCountContext);
  const cartCount = cartItems.map((e) => e.count).reduce((a, b) => a + b);
  const handleCount = (productId, count) => {
    if (!isLogged) {
      const product = { _id: productId };
      const type = count < 0 ? "remove" : "set";
      productStorage[type](product);
      setCartInfo(productStorage.getCartInfo());
      return;
    }
    const url = "/purchases/cart";
    const body = { productId, count };
    axios.post(url, body).then(({ data }) => {
      setCount((p) => p + count);
      setCartInfo(data);
    });
  };
  return (
    <div className="wrapper">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="text-dark">مرسولات انتخابی شما</h6>
        <h6 className="text-dark">{cartCount} کالا</h6>
      </div>
      {/* <p className="my-2">
        <i className="bi bi-box-seam ms-1 text-primary" />
        ارسال توسط انتشارات جهاد دانشگاهی
      </p> */}
      <div className="d-flex align-items-start gap-4 overflow-auto w-full p-2">
        {cartItems.map((e, i) => (
          <div
            key={i}
            className="cart-item border border-light-gray shadow-sm rounded"
          >
            <img
              height="135"
              className="object-fit-cover w-100 d-block rounded"
              src={source(showActiveImg(e.product?.img))}
              alt={`cart-item-${i}`}
            />
            <ButtonGroup className="w-100">
              <button
                className="bi bi-dash-lg text-danger flex-1"
                onClick={() => handleCount(e._id, -1)}
              />
              <button className="btn flex-1">{e.count}</button>
              <button
                onClick={() => handleCount(e._id, 1)}
                className="bi bi-plus-lg text-success flex-1"
              />
            </ButtonGroup>
          </div>
        ))}
      </div>
    </div>
  );
}

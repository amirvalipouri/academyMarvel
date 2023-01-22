import { Link } from "react-router-dom";
import { offCal, showActiveImg, source } from "../../methods";
import Badge from "../Badge";
import "./index.scss";
export default function ProductCard({
  _id = "",
  isAdmin = false,
  title_fa = "",
  count = 0,
  img = [],
  category = [],
  price = 0,
  priceUsd = 0,
  off = 0,
  offUsd = 0,
}) {
  // const [activeImgIndex, setActiveImgIndex] = useState(0);
  // const isActiveImg = (index = 0) => {
  //   const isActive = activeImgIndex === index;
  //   return isActive;
  // };
  const activeImg = showActiveImg(img);
  const showPrice = () => {
    const prices = [
      {
        price: priceUsd,
        off: offUsd,
        curr: "USD",
      },
      {
        price,
        off,
        curr: "تومان",
      },
    ];
    return prices.map((e) => (
      <span key={e.curr} className="fw-bold">
        {e.off !== 0 && (
          <sub className="text-decoration-line-through text-secondary">
            {e.price.toLocaleString()}
          </sub>
        )}
        {offCal(e.price, e.off).toLocaleString()}{" "}
        <sub className="fw-normal">{e.curr}</sub>
      </span>
    ));
  };
  return (
    <Link
      to={_id}
      className="ProductCard d-block w-100 rounded border border-dark-gray transition"
    >
      <div className="img-box w-100 p-3 border-bottom border-dark-gray position-relative">
        {/* {img.map((e, i) => (
          <img
            key={i}
            src={source(e)}
            alt="defaultUrl"
            className={`w-100 h-100 object-fit-contain ${
              isActiveImg(i) && "active"
            }`}
          />
        ))} */}
        {activeImg && (
          <img
            src={source(activeImg)}
            alt={activeImg}
            className="w-100 h-100 object-fit-contain"
          />
        )}
        {/* {img.lenght > 1 && (
          <div className="indicator position-absolute bottom-0 left-0 w-100 d-flex flex-center gap-1">
            {img.map((e, i) => (
              <button
                key={i}
                className={`bi bi-circle${isActiveImg(i) ? "-fill" : ""}`}
              />
            ))}
          </div>
        )} */}
      </div>
      <div className="p-3">
        <h6 className="text-truncate">{title_fa}</h6>
        <h6 className="text-secondary mt-1 text-truncate">تعداد: {count}</h6>
        <div className="categories mt-2 w-100 text-truncate">
          {category.map((e) => (
            <Badge key={e._id} label={e.title_fa} />
          ))}
        </div>
        <div className="d-flex align-items-center justify-content-between mt-4">
          {showPrice()}
        </div>
      </div>
    </Link>
  );
}

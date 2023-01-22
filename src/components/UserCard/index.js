import { Link } from "react-router-dom";
import { convertPhone } from "../../methods";
import "./index.scss";
export default function UserCard({
  //   createdAt = "",
  firstName = "",
  lastName = "",
  phone = "",
  role = "",
  _id = "",
}) {
  return (
    <div className="UserCard h-100 position-relative w-100 d-flex flex-column flex-center text-justify text-last-center rounded shadow-sm border border-light overflow-hidden space-y p-2">
      <i className="bi bi-person h1 d-flex flex-center rounded-circle bg-light" />
      <h5>{`${firstName} ${lastName}`}</h5>
      <h6>
        <span className="text-secondary">شماره موبایل</span>
        {": "}
        <span dir="ltr">{convertPhone(phone)}</span>
      </h6>
      <h6>
        <span className="text-secondary">سطح دسترسی</span>
        {": "}
        {role}
      </h6>
      <Link to={_id} className="btn btn-primary btn-sm">
        مشاهده جزئیات
      </Link>
    </div>
  );
}

import { Link } from "react-router-dom";
import { moment } from "../../boot";
import { showNumber } from "../../methods";
import "./index.scss";
export default function CourseCard({
  _id = "",
  title = "",
  description = "",
  index = 0,
  createdAt = "",
  instructor = "",
  // maxTime = 0,
  // minTime = 0,
}) {
  return (
    <div className="CourseCard position-relative w-100 rounded bg-white shadow-sm overflow-hidden border border-light p-2 pt-4">
      <div className="bg-div position-absolute inset-0"></div>
      <div className="position-relative content d-flex flex-column flex-center">
        <div className="index d-flex flex-center h1 rounded border border-2 border-info">
          <span className="font-en">{showNumber(index)}</span>
        </div>
        <h5>{title}</h5>
        <h6>{`مدرس دوره: ${instructor}`}</h6>
        <p className="text-justify w-100">{description}</p>
        <Link to={_id} className="btn btn-primary btn-sm">
          مشاهده جزئیات
        </Link>
        <span className="date fs-7 me-auto text-secondary">
          {moment.miladiToShamsi({ date: createdAt })}
        </span>
      </div>
    </div>
  );
}

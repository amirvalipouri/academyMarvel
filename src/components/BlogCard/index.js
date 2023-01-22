import { Link } from "react-router-dom";
import "./index.scss";
export default function BlogCard({
  _id = "",
  img = "",
  title = "",
  description = "",
}) {
  return (
    <Link
      to={_id}
      className="blog-card bg-white text-start d-block w-100 rounded shadow-sm overflow-hidden"
    >
      <div className="img-box w-100 bg-dark">
        <img className="w-100 h-100 object-fit-cover" src={img} alt={title} />
      </div>
      <div className="body p-2 d-flex flex-column gap-2">
        <h5 className="h6 text-info w-100 text-truncate">{title}</h5>
        <p className="text-justify line-clamp-3">{description}</p>
      </div>
    </Link>
  );
}

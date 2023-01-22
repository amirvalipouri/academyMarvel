import { BgImage } from "..";
export default function CommentCard({
  active = false,
  userName = "",
  userPost = "",
  comment = "",
}) {
  return (
    <button
      className={`position-relative p-3 h-100 rounded border border-light-gray shadow-sm d-flex flex-column row-gap-3 h-100 bg-${
        active ? "primary" : "white"
      }`}
    >
      {active && (
        <BgImage
          type={2}
          objectFit="cover"
          className="w-100 h-100 top-0 left-0"
        />
      )}
      <div className="w-100 d-flex col-gap-3">
        <i
          style={{ width: "50px", height: "50px" }}
          className="bi bi-person d-flex flex-center fs-1 bg-light text-white rounded-circle shadow-sm"
        />
        <div className="d-flex flex-column row-gap-1 text-start">
          <h5 className={`lh-normal fs-6 text-${active ? "white" : "info"}`}>
            {userName}
          </h5>
          <h6
            className={`lh-normal fs-6 text-${active ? "white" : "secondary"}`}
          >
            {userPost}
          </h6>
        </div>
      </div>
      <p className={`text-${active ? "white" : "dark"} text-justify`}>
        {comment}
      </p>
    </button>
  );
}

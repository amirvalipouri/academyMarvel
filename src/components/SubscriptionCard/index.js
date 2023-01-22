import BgImage from "../BgImage";
import Button from "../Button";

export default function SubscriptionCard({
  active = false,
  icon = "",
  title = "",
  price = 0,
}) {
  return (
    <div
      className={`position-relative d-flex flex-column flex-center row-gap-5 rounded shadow-sm rounded p-4 ${
        active ? "bg-primary text-white" : "bg-white"
      }`}
    >
      {active && (
        <BgImage
          type={3}
          objectFit="cover"
          className="w-100 h-100 top-0 left-0"
        />
      )}
      <div className="d-flex flex-center col-gap-3 w-100">
        <img
          width="75"
          height="75"
          className={`p-3 bg-${
            active ? "white" : "primary"
          } rounded bg-opacity-25`}
          src={icon}
          alt={title}
        />
        <div className="d-flex flex-column flex-1 row-gap-3 text-start">
          <h5
            className={`lh-normal m-0 text-${active ? "white" : "dark-blue"}`}
          >
            {title}
          </h5>
          <h4
            className={`lh-normal m-0 text-${active ? "white" : "primary"}`}
          >{`${price.toLocaleString()} تومان`}</h4>
        </div>
      </div>
      <div className="w-100 d-flex flex-column text-center row-gap-3">
        {[...Array(7)].map((item, i) => (
          <div key={i} className="d-flex flex-center col-gap-2 w-100">
            <i
              style={{ width: "25px", height: "25px" }}
              className={`d-flex flex-center rounded-circle bi bi-check-lg bg-${
                active ? "white" : "primary"
              } bg-opacity-25`}
            />
            <span className={`text-${active ? "white" : "dark-blue"}`}>
              متن مورد نظر در اینجا قرار میگیرد
            </span>
          </div>
        ))}
      </div>
      <Button
        size="md"
        variant={active ? "white text-primary" : "primary text-white"}
      >
        انتخاب
      </Button>
    </div>
  );
}

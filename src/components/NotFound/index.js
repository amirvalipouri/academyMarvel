// import notFoundIcon from "../../assets/icons/error 404.svg";
export default function NotFound() {
  return (
    <div className="w-100 d-flex flex-column flex-center text-center row-gap-3">
      {/* <img
        className="mx-100 object-fit-contain"
        width="500"
        src={notFoundIcon}
        alt="NotFound"
      /> */}
      <p className="fs-2 my-4 text-primary">موردی یافت نشد!</p>
    </div>
  );
}

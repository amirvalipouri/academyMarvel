export default function ImgBox({ src = "", onRemove = () => {} }) {
  return (
    <div className="d-flex flex-center position-relative">
      <img
        className="w-100 aspect-ratio-square object-fit-contain bg-light rounded"
        src={src}
        alt={src}
      />
      <button
        style={{ width: "30px", height: "30px" }}
        onClick={onRemove}
        className="bi bi-x-lg text-white bg-danger rounded-circle position-absolute"
      />
    </div>
  );
}

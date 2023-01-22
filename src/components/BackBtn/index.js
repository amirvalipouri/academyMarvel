import { useNavigate } from "react-router";

export default function BackBtn() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <button onClick={goBack} className="text-info d-block w-fit me-auto">
      بازگشت
      <i className="bi bi-chevron-left me-1" />
    </button>
  );
}

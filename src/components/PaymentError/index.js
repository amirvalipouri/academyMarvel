import { ButtonGroup } from "react-bootstrap";
import toast from "react-hot-toast";
import { whatsappLink } from "../../constants";

export default function PaymentError({ id = "", tryAgain = () => {} }) {
  return (
    <div>
      <button
        className="bi bi-x-lg d-block ms-auto text-danger"
        onClick={() => toast.dismiss(id)}
      />
      <p className="text-dark text-center">
        به علت حجم بالای سفارشات درگاه پرداخت زرین پال قادر به پاسخگویی نیست.
        لطفا مجددا تلاش کنید. در غیر اینصورت از طریق واتساپ اقدام به خرید
        نمایید.
      </p>
      <ButtonGroup className="mt-4 d-flex w-fit mx-auto">
        <a
          className="btn btn-success btn-sm text-white"
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
        >
          خرید از طریق واتساپ
        </a>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => {
            tryAgain();
            toast.dismiss(id);
          }}
        >
          تلاش مجدد
        </button>
      </ButtonGroup>
    </div>
  );
}

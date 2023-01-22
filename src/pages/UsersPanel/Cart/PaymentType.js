import { useState } from "react";
import { Dropdown, FormControl, InputGroup } from "react-bootstrap";
import { axios } from "../../../boot";
import cardIcon from "../../../assets/icons/card.svg";
import discountIcon from "../../../assets/icons/discount.svg";
import { toast } from "../../../methods";
import { paymentMethods } from "../../../constants";
import { useSelector } from "react-redux";

export default function PaymentType({
  paymentType = "",
  setPaymentType = () => {},
  setCartInfo = () => {},
}) {
  const isLogged = useSelector((s) => s.isLogged);
  const [voucher, setVoucher] = useState("");
  const submitDiscountCode = (e) => {
    e.preventDefault();
    const errorText =
      "برای اعمال کردن کد تخفیف لطفا وارد حساب کاربری خود شوید.";
    if (!isLogged) return toast({ text: errorText, type: "error" });
    const text = "کد تخفیف الزامی است.";
    const type = "error";
    if (!voucher) return toast({ text, type });
    const url = "/purchases/cart/apply-voucher";
    const body = { voucher };
    axios.post(url, body).then(({ data }) => {
      const text = "کد تخفیف با موفقیت اعمال شد";
      toast({ text });
      setVoucher("");
      setCartInfo(data);
    });
  };
  return (
    <div className="wrapper">
      <h6 className="text-danger text-center mb-2">
        شیوه پرداخت را انتخاب کنید.
      </h6>
      <Dropdown onSelect={setPaymentType} className="mx-auto w-fit">
        <Dropdown.Toggle
          as="button"
          className="w-fit d-flex align-items-center text-primary fw-bold"
        >
          <img width="30" src={cardIcon} alt="cardIcon" className="ms-2" />
          {paymentMethods.find((e) => e.id === paymentType)?.name}
          <i className="bi bi-chevron-down me-2" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {paymentMethods.map((e) => (
            <Dropdown.Item
              key={e.id}
              eventKey={e.id}
              as="button"
              className="text-center"
            >
              {e.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <h6 className="text-dark mt-4 mb-2">تخفیف</h6>
      <form
        onSubmit={submitDiscountCode}
        className="d-flex align-items-center gap-2"
      >
        <img width="30" src={discountIcon} alt="discountIcon" />
        <span className="white-space-nowrap">کد تخفیف</span>
        <InputGroup>
          <InputGroup.Text
            as="button"
            className="text-primary border-light-gray"
          >
            ثبت
          </InputGroup.Text>
          <FormControl
            value={voucher}
            onChange={({ target }) => setVoucher(target.value)}
            className="border-light-gray"
          />
          <InputGroup.Text className="text-secondary d-none d-lg-flex border-light-gray">
            افزودن
          </InputGroup.Text>
        </InputGroup>
      </form>
    </div>
  );
}

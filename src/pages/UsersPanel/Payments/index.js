import { Col, FormControl, InputGroup, Row } from "react-bootstrap";
import { Table } from "../../../components";

export default function Payments() {
  const tableItems = [
    {
      label: "موفق",
      color: "success",
    },
    {
      label: "نا موفق",
      color: "danger",
    },
    {
      label: "موفق",
      color: "success",
    },
  ];
  return (
    <div className="wrapper">
      <h1 className="h6">پرداختی‌های شما</h1>
      <Table className="text-center">
        <thead>
          <tr>
            <td className="text-start">نوع اشتراک</td>
            <td>مبلغ</td>
            <td>مدت زمان اشتراک</td>
            <td>زمان</td>
            <td>وضعیت</td>
          </tr>
        </thead>
        <tbody>
          {tableItems.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="w-fit d-flex flex-center col-gap-2">
                  <span className="px-2 py-1 rounded bg-primary">
                    <i className="text-white fs-5 bi bi-receipt" />
                  </span>
                  خرید اشتراک ویژه
                </div>
              </td>
              <td>13,000 تومان</td>
              <td>1 ماهه</td>
              <td>دوشنبه 13 مرداد - 09:41</td>
              <td>
                <span
                  className={`rounded text-${item.color} bg-${item.color} bg-opacity-25 px-4`}
                >
                  {item.label}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

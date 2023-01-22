import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { axios } from "../../../boot";
import { Badge, Table } from "../../../components";
import { blogStatus } from "../../../constants";

export default function Vouchers() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const getData = () => {
    const url = "/admins/pub/shop/vouchers";
    axios.get(url).then(({ data }) => {
      setData(data.data);
    });
  };
  const showStatus = (status = "") => {
    const { name, color } = blogStatus.find((e) => e.id === status);
    return <Badge variant={color} label={name} />;
  };
  useEffect(getData, []);
  return (
    <Row>
      <div className="col-12 d-flex justify-content-end">
        <Link
          to="new"
          className="bi bi-plus-lg d-flex flex-center fs-4 text-success"
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>کد</th>
            <th>درصد تخفیف</th>
            <th>درصد تخفیف (تتر)</th>
            <th>وضعیت</th>
            <th>تعداد دفعات قابل استفاده</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr key={e._id} onClick={() => navigate(e._id)}>
              <td>{e.title}</td>
              <td>{e.off}%</td>
              <td>{e.offUsd}%</td>
              <td>{showStatus(e.status)}</td>
              <td>{e.count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  );
}

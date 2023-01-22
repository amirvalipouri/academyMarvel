import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { axios, moment } from "../../../boot";
import { Badge, Table } from "../../../components";
import { notificationsPriority } from "../../../constants";

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const getNotifications = () => {
    const url = "/admins/notifications";
    axios.get(url).then(({ data }) => {
      setNotifications(data.data);
    });
  };
  const showTime = (date) => {
    return moment.miladiToShamsi({ date });
  };
  const showPriority = (id = 0) => {
    const { name, color } = notificationsPriority.find((e) => e.id === id);
    return <Badge variant={color} label={name} />;
  };
  useEffect(getNotifications, []);
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
            <th>موضوع</th>
            <th>زمان</th>
            <th>سطح اهمیت</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((e) => (
            <tr key={e._id} onClick={() => navigate(e._id)}>
              <th>{e.title}</th>
              <th>{`${showTime(e.startDate)} - ${showTime(e.expireDate)}`}</th>
              <th>{showPriority(e.priority)}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  );
}

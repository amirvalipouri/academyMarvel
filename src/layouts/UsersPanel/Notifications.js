import { useState, useEffect } from "react";
import { axios } from "../../boot";
import { notificationsPriority } from "../../constants";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const getNotifications = () => {
    const url = "/notifications";
    axios.get(url).then((res) => {
      const data = res.data.data.map((e) => ({
        ...e,
        variant: showVariant(e.priority),
      }));
      setNotifications(data);
    });
  };
  const showVariant = (id = "") => {
    const color = notificationsPriority.find((e) => e.id === id)?.color;
    return color;
  };
  useEffect(getNotifications, []);
  return (
    !!notifications.length && (
      <div className="Notifications position-relative">
        <button className="position-relative">
          <span className="new-alert animation-ping position-absolute bg-warning rounded-circle" />
          <span className="new-alert position-absolute bg-warning rounded-circle" />
          <i className="bi bi-bell-fill fs-4 text-primary" />
        </button>
        <div className="menu position-absolute bg-white p-3 pt-4 rounded">
          {notifications.map((e) => (
            <div
              key={e._id}
              style={{ "--variant": `var(--bs-${e.variant})` }}
              className="position-relative white-space-nowrap pb-3 px-4"
            >
              <div className="d-flex align-items-center col-gap-3 mb-1">
                <h6 className="">{e.title}</h6>
                {/* <span className="rounded text-danger bg-danger bg-opacity-25 px-1 fs-7">
                  18 دقیقه
                </span> */}
              </div>
              <p className="white-space-normal fs-7 lh-md">{e.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

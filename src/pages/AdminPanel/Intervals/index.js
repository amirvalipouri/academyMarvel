import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axios, moment } from "../../../boot";
import { Table } from "../../../components";
import { showNumber } from "../../../methods";

export default function Intervals() {
  const navigate = useNavigate();
  const [intervals, setIntervals] = useState([]);
  const getIntervals = () => {
    const url = "/admins/registers";
    axios.get(url).then(({ data }) => {
      setIntervals(data.data);
    });
  };
  useEffect(getIntervals, []);
  return (
    <React.Fragment>
      <div className="w-100 d-flex justify-content-end">
        <Link
          to="new"
          className="bi bi-plus-lg d-flex flex-center fs-4 text-success"
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>نام بازه</th>
            <th>ظرفیت</th>
            <th>تاریخ شروع</th>
            <th>تاریخ پایان</th>
          </tr>
        </thead>
        <tbody>
          {intervals.map((interval) => (
            <tr key={interval._id} onClick={() => navigate(interval._id)}>
              <td>{interval.title}</td>
              <td>{showNumber(interval.capacity)} نفر</td>
              <td>
                {moment.miladiToShamsi({ date: interval.registerStartDate })}
              </td>
              <td>
                {moment.miladiToShamsi({ date: interval.registerEndDate })}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
}

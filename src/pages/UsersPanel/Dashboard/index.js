import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { axios } from "../../../boot";
import Chart from "./Chart";
export default function Dashboard() {
  const [data, setData] = useState([]);
  const getData = () => {
    const url = "/activity-logs/me/0";
    axios.get(url).then(({ data }) => {
      setData(data);
    });
  };
  const showTimeRange = () => {
    const arr = data
      .map((e) => new Date(e.createdAt))
      .map((e) =>
        e.toLocaleDateString("fa-IR", { day: "numeric", month: "long" })
      );
    if (arr.length === 1) return arr[0];
    return [arr.at(0), arr.at(-1)].join(" - ");
  };
  useEffect(getData, []);
  return (
    <Row>
      <Col xs="12">
        <div className="d-flex flex-column row-gap-3 w-100 bg-white rounded shadow-sm p-2">
          <h6 className="text-info">نمودار میزان پیشرفت</h6>
          <p className="text-primary">
            <i className="bi bi-calendar4 ms-2" />
            {showTimeRange()}
          </p>
          <Chart dataList={data} />
        </div>
      </Col>
      {/* <Col xs="12">
        <div className="shadow bg-white rounded p-1">
          <Table>
            <thead>
              <tr>
                <td>شماره جلسه</td>
                <td>نام جلسه</td>
                <td>مدت جلسه</td>
                <td>وضعیت</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {tableItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="w-fit d-flex flex-center col-gap-2">
                      <span className="px-2 py-1 rounded bg-primary">
                        <i className="text-white fs-5 bi bi-file-earmark-play-fill" />
                      </span>
                      جلسه {item.index}
                    </div>
                  </td>
                  <td>آشنایی با دنیای ارز</td>
                  <td>
                    <div className="w-fit d-flex flex-center col-gap-2">
                      <i className="bi bi-alarm-fill fs-5 text-primary" />2 ساعت
                    </div>
                  </td>
                  <td>
                    <div className="w-fit d-flex flex-center col-gap-2">
                      <div
                        className="progress-bar"
                        style={{
                          "--color": `var(--bs-${item.color})`,
                          "--width": `${item.progress}%`,
                        }}
                      />
                      <span className={`text-${item.color}`}>
                        {item.progress}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`text-${item.color}`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col> */}
    </Row>
  );
}

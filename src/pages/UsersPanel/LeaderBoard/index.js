import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { BgImage, Table } from "../../../components";
import { axios } from "../../../boot";
import medal1 from "../../../assets/icons/medal-1.svg";
import medal2 from "../../../assets/icons/medal-2.svg";
import medal3 from "../../../assets/icons/medal-3.svg";
import trophyIcon from "../../../assets/icons/trophy.svg";
import testImage from "../../../assets/images/comments1.png";

export default function LeaderBoard() {
  const rankIcons = [medal1, medal2, medal3];
  const [scoreInfo, setScoreInfo] = useState({});
  const [data, setData] = useState([]);
  const getData = () => {
    const url = "/pub/high-scores";
    axios.get(url).then(({ data }) => {
      setData(data.data);
      getScoreInfo();
    });
  };
  const getScoreInfo = () => {
    const url = "/pub/high-scores/me";
    axios.get(url).then(({ data }) => {
      setScoreInfo(data);
    });
  };
  const showFullName = ({ firstName = "", lastName = "" }) => {
    return `${firstName} ${lastName}`;
  };
  useEffect(getData, []);
  return (
    <Row className="align-items-start">
      <Col xs="12" lg="8">
        <div className="wrapper">
          <Table>
            <tbody>
              {data.map((item) => (
                <tr key={item.rank}>
                  <td>
                    <div className="w-fit d-flex flex-center col-gap-4">
                      {item.rank <= 3 ? (
                        <img
                          width="32.5"
                          src={rankIcons[item.rank - 1]}
                          alt={`rank-${item.rank}`}
                        />
                      ) : (
                        <span
                          style={{ width: "32.5px" }}
                          className="font-en text-center h5"
                        >
                          {item.rank}
                        </span>
                      )}
                      <img
                        width="42"
                        height="42"
                        src={testImage}
                        alt="testImage"
                      />
                      <h6>{showFullName(item?.user[0] ?? {})}</h6>
                    </div>
                  </td>
                  {/* <td>درس 1234</td> */}
                  <td>امتیاز {item.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
      <Col xs="12" lg="4" className="d-flex flex-column row-gap-3">
        <div className="position-relative bg-primary rounded shadow-sm px-3 py-4 d-flex flex-column flex-center row-gap-4 text-center">
          <BgImage
            type={1}
            objectFit="cover"
            className="w-100 h-100 top-0 left-0"
          />
          <img width="175" src={trophyIcon} alt="trophy" />
          <h4 className="text-white">بهترین دانشجوها را بشناسید</h4>
          <p className="text-white">
            مارول به شما کمک میکند تا آگاهانه‌تر دنیای ارز دیجیتال را بشناسید و
            ازش استفاده کنید
          </p>
        </div>
        <div className="wrapper row h6 text-info">
          <Col
            xs="12"
            className="px-0 d-flex align-items-center justify-content-between"
          >
            <img width="65" height="65" src={testImage} alt="testImage" />
            <span className="text-primary bg-primary bg-opacity-10 rounded-pill px-3">
              اشتراک ویژه
            </span>
          </Col>
          <Col
            xs="12"
            className="px-0 d-flex align-items-center justify-content-between"
          >
            <span>رتبه شما در لیدربرد مارول:</span>
            <span>{scoreInfo.rank}</span>
          </Col>
          <Col
            xs="12"
            className="px-0 d-flex align-items-center justify-content-between"
          >
            <span>امتیاز شما در مارول:</span>
            <span>{scoreInfo.score}</span>
          </Col>
        </div>
      </Col>
    </Row>
  );
}

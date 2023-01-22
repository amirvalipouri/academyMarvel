import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axios } from "../../../boot";
import { source } from "../../../methods";

export default function FreeTutorials() {
  const [videos, setVideos] = useState([]);
  const getVideos = () => {
    const url = `/admins/pub/videos`;
    const params = { sort: "createdAt:-1" };
    axios.get(url, { params }).then(({ data }) => {
      setVideos(data.data);
    });
  };
  useEffect(getVideos, []);
  return (
    <Row>
      <div className="col-12 d-flex justify-content-end">
        <Link
          to="new"
          className="bi bi-plus-lg d-flex flex-center fs-4 text-success"
        />
      </div>
      {videos.map((video) => (
        <Col key={video._id} xs="12" md="6" lg="4">
          <Card>
            <Card.Img
              variant="top"
              src={source(video.thumbnail)}
              height="175"
              className="object-fit-cover"
            />
            <Card.Body>
              <Card.Title as="h6" className="text-truncate">
                {video.title}
              </Card.Title>
              <Card.Text as="p" className="line-clamp-3 my-3">
                {video.description}
              </Card.Text>
              <Link to={video._id} className="btn btn-sm btn-primary w-100">
                مشاهده جزئیات
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

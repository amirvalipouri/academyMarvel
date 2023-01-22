import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router";
import { BackBtn, Video } from "../../../components";
import { axios } from "../../../boot";
import { source } from "../../../methods";
import { useObserved } from "../../../hooks";
export default function FreeTutorial() {
  const { setNewId } = useObserved();
  const location = useLocation();
  const params = useParams();
  const [activeId, setActiveId] = useState(params.id);
  const tutorials = location.state?.tutorials ?? [];
  const showPagination = Boolean(tutorials.length);
  const activeIndex = tutorials.findIndex((e) => e._id === activeId);
  const nextId = tutorials[activeIndex + 1]?._id;
  const prevId = tutorials[activeIndex - 1]?._id;
  const [data, setData] = useState({});
  const getActiveTutorial = () => {
    const url = `/pub/videos/${activeId}`;
    axios.get(url).then(({ data }) => {
      setNewId(activeId);
      setData(data);
    });
  };
  useEffect(getActiveTutorial, [activeId]);
  return (
    <Container>
      <BackBtn />
      <Row>
        <Col xs="12" md="10" lg="8">
          <h1 className="h4">{data.title}</h1>
        </Col>
        <Col xs="12" md="10" lg="10" className="d-flex gap-3 flex-center">
          {showPagination && (
            <button
              disabled={!nextId}
              onClick={() => setActiveId(nextId)}
              className="text-info fs-5 white-space-nowrap"
            >
              <i className="bi bi-chevron-right" />
              بعدی
            </button>
          )}
          <div className="flex-1">
            <Video
              width="100%"
              thumbnail={source(data.thumbnail)}
              sources={[
                {
                  src: source(data.path),
                  size: 720,
                },
              ]}
            />
          </div>
          {showPagination && (
            <button
              disabled={!prevId}
              onClick={() => setActiveId(prevId)}
              className="text-info fs-5 white-space-nowrap"
            >
              قبلی
              <i className="bi bi-chevron-left" />
            </button>
          )}
        </Col>
        <Col xs="12" md="10" lg="8">
          <p>{data.description}</p>
        </Col>
      </Row>
    </Container>
  );
}

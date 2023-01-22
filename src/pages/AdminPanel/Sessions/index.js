import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Table } from "../../../components";
import { axios } from "../../../boot";
import { indexTitles } from "../../../constants";
import { ButtonGroup } from "react-bootstrap";
import { toast } from "../../../methods";

export default function Sessions() {
  const tbody = useRef();
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const [sessions, setSessions] = useState([]);
  const [draggable, setDraggable] = useState(false);
  const courseId = query.get("courseId");
  const getSessions = () => {
    const url = "/admins/sessions";
    const ByCourseIdUrl = `/admins/sessions/course/${courseId}`;
    axios.get(courseId ? ByCourseIdUrl : url).then(({ data }) => {
      setSessions(data.data);
    });
  };
  const submitChangeIndex = () => {
    const reIndex = [...tbody.current.querySelectorAll("tr")].map((item) =>
      Number(item.getAttribute("data-index"))
    );
    const url = "/admins/sessions/reindex";
    const body = {
      courseId,
      reIndex,
    };
    axios.post(url, body).then(() => {
      toast({});
      setDraggable(false);
    });
  };
  const getDragAfterElement = (container, y) => {
    const draggableElements = [
      ...container.querySelectorAll("tr:not(.dragging)"),
    ];
    return draggableElements.reduce(
      (closest, child, index) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child, index };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    const currentTarget = e.currentTarget;
    const afterElement = getDragAfterElement(currentTarget, e.clientY);
    const draggable = currentTarget.querySelector(".dragging");
    if (afterElement) {
      currentTarget.insertBefore(draggable, afterElement);
    } else {
      currentTarget.appendChild(draggable);
    }
  };
  const handleDragStart = ({ target }) => {
    target.classList.add("dragging");
  };
  const handleDragEnd = ({ target }) => {
    target.classList.remove("dragging");
  };
  useEffect(getSessions, []);
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
            <th>شماره جلسه</th>
            <th>نام جلسه</th>
            <th>نام مدرس</th>
          </tr>
        </thead>
        <tbody ref={tbody} onDragOver={handleDragOver}>
          {sessions.map((session) => (
            <tr
              key={session._id}
              draggable={draggable}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              onClick={() => navigate(session._id)}
              data-index={session.index}
            >
              <td>
                <div className="d-flex flex-center gap-2 w-fit">
                  {draggable && <button className="bi bi-record-circle" />}
                  <span className="px-2 py-1 rounded bg-primary">
                    <i className="text-white fs-5 bi bi-file-earmark-play-fill" />
                  </span>
                  جلسه {indexTitles[session.index]}
                </div>
              </td>
              <td>{session.title}</td>
              <td>{session.instructor}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {courseId && (
        <ButtonGroup className="w-fit d-flex mx-auto">
          {draggable ? (
            <React.Fragment>
              <Button variant="danger" onClick={() => setDraggable(false)}>
                لغو
              </Button>
              <Button onClick={submitChangeIndex} variant="success">
                ثبت
              </Button>
            </React.Fragment>
          ) : (
            <Button variant="dark" onClick={() => setDraggable(true)}>
              ویرایش ترتیب جلسات
            </Button>
          )}
        </ButtonGroup>
      )}
    </React.Fragment>
  );
}

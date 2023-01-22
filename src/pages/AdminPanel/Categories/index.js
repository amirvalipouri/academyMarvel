import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonGroup } from "react-bootstrap";
import { axios } from "../../../boot";
import { Badge, Table, Button } from "../../../components";
import { blogStatus, categoryTypes } from "../../../constants";

export default function Categories() {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState(categoryTypes.at(-1).url);
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    const url = `/admins/pub${activeType}/categories`;
    axios.get(url).then(({ data }) => {
      setCategories(data.data);
    });
  };
  const showStatus = (id = "") => {
    const { color, name } = blogStatus.find((e) => e.id === id);
    return <Badge variant={color} label={name} />;
  };
  const state = { type: activeType };
  useEffect(getCategories, [activeType]);
  return (
    <React.Fragment>
      <div className="w-100 d-flex justify-content-end">
        <Link
          to="new"
          state={state}
          className="bi bi-plus-lg d-flex flex-center fs-4 text-success"
        />
      </div>
      <div className="d-flex flex-center">
        <ButtonGroup>
          {categoryTypes.map((e) => (
            <Button
              key={e.id}
              outline={e.url !== activeType}
              onClick={() => setActiveType(e.url)}
            >
              {e.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <Table>
        <thead>
          <tr>
            <td>موضوع</td>
            <td>کلمه کلیدی</td>
            <td>وضعیت</td>
          </tr>
        </thead>
        <tbody>
          {categories.map((e) => (
            <tr key={e._id} onClick={() => navigate(e._id, { state })}>
              <td>{e.title_fa}</td>
              <td>{e.title}</td>
              <td>{showStatus(e.status)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
}

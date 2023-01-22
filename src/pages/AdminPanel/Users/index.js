import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axios } from "../../../boot";
import { SearchBox, UserCard } from "../../../components";
import { toast } from "../../../methods";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [params, setParams] = useState({});
  const getUsers = () => {
    const url = "/admins/users";
    axios.get(url, { params }).then(({ data }) => {
      setUsers(data.data);
    });
  };
  const handleSetParams = (search = "") => {
    if (search.length === 0) return setParams({});
    if (search.length <= 3) {
      const text = "جستجو باید از 3 حرف بزرگتر باشد.";
      toast({ text, type: "error" });
      return;
    }
    setParams({ search });
  };
  useEffect(getUsers, [params]);
  return (
    <Row className="align-items-stretch">
      <div className="col-12 d-flex justify-content-end">
        <Link
          to="new"
          className="bi bi-plus-lg d-flex flex-center fs-4 text-success"
        />
      </div>
      <div className="d-flex flex-center col-12">
        <Col xs="12" md="6" lg="4">
          <SearchBox onSubmit={handleSetParams} />
        </Col>
      </div>
      {users.map((user) => (
        <Col key={user._id} xs="12" md="6" lg="4" xl="3">
          <UserCard {...user} />
        </Col>
      ))}
    </Row>
  );
}

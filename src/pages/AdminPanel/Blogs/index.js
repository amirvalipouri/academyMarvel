import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axios } from "../../../boot";
import { Badge, Table } from "../../../components";
import { blogStatus, indexTitles } from "../../../constants";
import { showNumber } from "../../../methods";

export default function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const getBlogs = () => {
    const url = "/admins/pub/blog";
    axios.get(url).then(({ data }) => {
      setBlogs(data.data);
    });
  };
  const showStatus = (status = "") => {
    const { name, color } = blogStatus.find((e) => e.id === status);
    return <Badge variant={color} label={name} />;
  };
  useEffect(getBlogs, []);
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
            <th>شماره بلاگ</th>
            <th>موضوع</th>
            <th>وضعیت</th>
            <th>تعداد کامنت‌ها</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} onClick={() => navigate(blog._id)}>
              <td>بلاگ {indexTitles[blog.index]}</td>
              <td>{blog.title}</td>
              <td>{showStatus(blog.status)}</td>
              <td>{showNumber(blog.comments)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
}

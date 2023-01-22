import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ButtonGroup, Col } from "react-bootstrap";
import { Form, Input, Select, Button } from "../../../components";
import { rules, indexTitles, blogStatus, accept } from "../../../constants";
import { fileToBase64, isFile, showNumber, toast } from "../../../methods";
import { axios } from "../../../boot";
export default function Blog() {
  const params = useParams();
  const navigate = useNavigate();
  const isNewBlog = params.blogId === "new";
  const formControls = [
    {
      label: "موضوع",
      state: "title",
    },
    {
      label: "نویسنده",
      state: "author",
    },
    {
      tag: Select,
      label: "وضعیت",
      state: "status",
      items: blogStatus,
    },
    {
      label: "عکس اصلی",
      state: "img",
      type: "file",
      accept: accept.img,
      rules: [...rules.required, ...rules.imgSize],
    },
    {
      as: "textarea",
      label: "توضیحات",
      state: "description",
      rules: rules.description,
    },
  ];
  const fullFormControls = [
    {
      label: "موضوع",
      state: "header",
    },
    {
      label: "عکس",
      state: "img",
      type: "file",
      accept: accept.img,
      rules: rules.imgSize,
    },
    {
      label: "فیلم",
      state: "vid",
      type: "file",
      accept: accept.video,
      rules: rules.videoSize,
    },
    {
      as: "textarea",
      label: "متن",
      state: "body",
    },
  ];
  const [data, setData] = useState({});
  const [full, setFull] = useState([]);
  const addNewBlog = async () => {
    const url = "/admins/pub/blog";
    const body = { ...data };
    body.img = await fileToBase64(body.img[0]);
    body.full = await handleFullFile();
    axios.post(url, body).then(() => {
      toast({});
      navigate("/admin/blogs", { replace: true });
    });
  };
  const updateBlog = async () => {
    const url = "/admins/pub/blog";
    const body = { ...data };
    const keys = ["createdAt", "comments", "modifiedAt"];
    keys.forEach((key) => delete body[key]);
    const mainImg = body.img[0];
    if (isFile(mainImg)) {
      body.img = await fileToBase64(mainImg);
    } else {
      body.img = undefined;
    }
    body.full = await handleFullFile();
    axios.put(url, body).then(() => {
      toast({});
    });
  };
  const deleteBlog = () => {
    const message = "آیا از درخواست خود اطمیمان دارید؟";
    if (!window.confirm(message)) return;
    const url = "/admins/pub/blog";
    const body = { data: { _id: params.blogId } };
    axios.delete(url, body).then(() => {
      toast({});
      navigate("/admin/blogs", { replace: true });
    });
  };
  const getData = () => {
    if (isNewBlog) return;
    const url = `/admins/pub/blog/${params.blogId}`;
    axios.get(url).then(({ data }) => {
      setData({ ...data, full: undefined });
      setFull(data.full);
    });
  };
  const handleFullFile = async () => {
    const bodyFull = await Promise.all(
      full.map(async (e) => {
        const img = e.img?.at(0);
        const vid = e.vid?.at(0);
        return {
          ...e,
          img: isFile(img) ? await fileToBase64(img) : undefined,
          vid: isFile(vid) ? await fileToBase64(vid) : undefined,
        };
      })
    );
    return bodyFull;
  };
  const handleAddNewTitle = () => {
    setFull((p) => [...p, { header: "", body: "", img: "" }]);
  };
  const handleDeleteTitle = (index = 0) => {
    setFull((p) => {
      const full = [...p];
      full.splice(index, 1);
      return full;
    });
  };
  const checkFullLength = () => {
    if (full.length === 0) {
      const text = "لظفا یک تیتر اضافه کنید";
      toast({ text, type: "error" });
      return () => {};
    }
    return isNewBlog ? addNewBlog() : updateBlog();
  };
  useEffect(getData, []);
  return (
    <Form onSubmit={checkFullLength} className="row">
      {formControls.map((item, index) => (
        <Col key={index} xs="12" lg={index === 4 ? "12" : "6"}>
          {React.createElement(item.tag ?? Input, {
            ...item,
            value: data[item.state],
            setValue: (val) => setData((p) => ({ ...p, [item.state]: val })),
          })}
        </Col>
      ))}
      <h3 className="col-12 text-center">تیترها - {showNumber(full.length)}</h3>
      {full.map((item, fullIndex) => (
        <React.Fragment key={fullIndex}>
          <div className="col-12 d-flex flex-center gap-2">
            <button
              onClick={() => handleDeleteTitle(fullIndex)}
              className="bi bi-x-lg d-flex flex-center text-danger"
            />
            <h5>{`تیتر ${indexTitles[fullIndex + 1]}`}</h5>
          </div>
          {fullFormControls.map((props, i) => (
            <Col key={i} xs="12" lg={i === 3 ? "12" : "6"}>
              <Input
                {...props}
                value={item[props.state]}
                setValue={(val) =>
                  setFull((p) => {
                    const full = [...p];
                    full[fullIndex][props.state] = val;
                    return full;
                  })
                }
              />
            </Col>
          ))}
        </React.Fragment>
      ))}
      <div className="col-12">
        <button
          type="button"
          className="bi bi-plus-lg text-success"
          onClick={handleAddNewTitle}
        >
          افزودن تیتر جدید
        </button>
      </div>
      <div className="col-12 d-flex flex-center">
        <ButtonGroup>
          {!isNewBlog && (
            <Button variant="danger" onClick={deleteBlog}>
              حذف
            </Button>
          )}
          <Button type="submit">ثبت</Button>
        </ButtonGroup>
      </div>
    </Form>
  );
}

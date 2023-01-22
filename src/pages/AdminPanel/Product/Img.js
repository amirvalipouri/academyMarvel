import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { fileToBase64, source, toast } from "../../../methods";
import { axios } from "../../../boot";
import ImgBox from "./ImgBox";
import { Button } from "../../../components";
import { accept } from "../../../constants";

export default function Img({ img = [], productId = "" }) {
  const inputFileRef = useRef(null);
  const [imgs, setImgs] = useState([]);
  const clickInputFile = () => {
    inputFileRef.current.click();
  };
  const clearInputFile = () => {
    inputFileRef.current.value = "";
  };
  const addNewImg = async ({ target = {} }) => {
    const file = target.files[0];
    if (!file) return;
    const url = "/admins/pub/shop/products/images";
    const body = {
      productId,
      index: img.length,
      img: await fileToBase64(file),
    };
    await axios.post(url, body).then(() => {
      const src = URL.createObjectURL(file);
      setImgs((p) => [...p, src]);
      toast({});
    });
    clearInputFile();
  };
  const removeImg = (index = 0) => {
    const url = "/admins/pub/shop/products/images";
    const data = { productId, index };
    axios.delete(url, { data }).then(() => {
      setImgs((p) => {
        const imgs = [...p];
        imgs.splice(index, 1);
        return imgs;
      });
      toast({});
    });
  };

  useEffect(() => {
    if (img.length === 0) return;
    const imgs = img.filter((e) => e).map((e) => source(e));
    setImgs(imgs);
  }, [img]);
  return (
    <React.Fragment>
      <Row>
        {imgs.map((e, i) => (
          <Col key={i} xs="12" md="4" lg="3">
            <ImgBox src={e} onRemove={() => removeImg(i)} />
          </Col>
        ))}
      </Row>
      <div className="d-flex flex-center w-100 my-3">
        {imgs.length < 1 && (
          <Button onClick={clickInputFile}>آپلود عکس جدید</Button>
        )}
        <input
          ref={inputFileRef}
          type="file"
          accept={accept.img}
          className="d-none"
          onChange={addNewImg}
        />
      </div>
    </React.Fragment>
  );
}

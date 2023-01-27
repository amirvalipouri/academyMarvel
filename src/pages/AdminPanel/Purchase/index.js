import React, { useEffect, useState } from "react";
import { ButtonGroup, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { axios } from "../../../boot";
import { Button, Form, Input, Modal } from "../../../components";
import { rules, purchaseStatus } from "../../../constants";
import { toast } from "../../../methods";
import MailingLabel from "./MailingLabel";
import PayInfo from "./PayInfo";
import ShowInfo from "./ShowInfo";


export default function Purchase({ data = {}, onUpdate = () => {} }) {
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  // const [info, setInfo] = useState(data);
  const [reason, setReason] = useState("");
  // const [address, setAddress] = useState("")
  // const getInfo = () => {
  //   const url = `/admins/shop/purchases/${params.id}`;
  //   axios.get(url).then(({ data }) => {
  //     setInfo(data);
  //   });
  // };
  const updateStatus = (status = "") => {
    data = { ...data, status };
  };
  const verifyPurchase = (status = "") => {
    const url = "/admins/shop/purchases/verify";
    const body = {
      _id: data._id,
      status,
      reason,
    };
    axios.post(url, body).then(() => {
      toast({});
      updateStatus(status);
      setShowModal(false);
      setReason("")
      onUpdate(p => p+1)
    });
  };
  const updatePurchase = (status = "") => {
    const url = "/admins/shop/purchases/update-purchase";
    const body = { _id: data._id, status };
    axios.post(url, body).then(() => {
      toast({});
      updateStatus(status);
      onUpdate(p => p+1)
    });
  };

  const showChangeStatus = !purchaseStatus
    .filter((e) => e.isUpdateStatus)
    .map((e) => e.id)
    .includes(data?.status);

  const handlePrint = (id) => {
    const url = "/admins/shop/purchases/report";
    const body = {
      _id: id,
    };
    axios.post(url, body).then(({ data }) => {
      const address = data.address
      //   const url = window.URL.createObjectURL(new Blob([`https://api.academymarvel.com${address}`], {
      //     type: "application/pdf"
      // }));
      const url = `https://api.academymarvel.com${address}`
      const link = document.createElement('a');
      link.href = url;
      link.target = "_blank"
      link.setAttribute('download', 'file.pdf'); //or any other extension
      document.body.appendChild(link);
      setTimeout(()=>{
        link.click();
      },3000)
      

    });
  }
  return (
    <div style={{ overflow: "hidden" }}>
      <Row className="row-gap-4 d-print-none PURCHASE">
        <ShowInfo data={data} />
        {data?.pay && <PayInfo pay={data?.pay} />}
        {data?.status !== "rejected" && (
          <Col xs="12" className="d-print-none d-flex flex-center">
            <ButtonGroup>
              {showChangeStatus ? (
                <React.Fragment>
                  <Button
                    variant="success"
                    onClick={() => verifyPurchase("accepted")}
                  >
                    تایید پرداخت
                  </Button>
                  <Button variant="danger" onClick={() => setShowModal(p => p = !p)}>
                    رد پرداخت
                  </Button>
                </React.Fragment>
              ) : (
                purchaseStatus
                  .filter((e) => e.updatable)
                  .map((e) => (
                    <Button
                      key={e.id}
                      variant={e.color}
                      onClick={() => updatePurchase(e.id)}
                    >
                      {e.name}
                    </Button>
                  ))
              )}
            </ButtonGroup>
          </Col>
        )}
      </Row>
      <MailingLabel info={data} />
      <Button
        className="d-print-none mt-5 d-block mx-auto"
        onClick={() => handlePrint(data._id)}
      >
        پرینت برچسب پستی و فاکتور
      </Button>
      {/* <Modal
        show={showModal}
        onHide={setShowModal}
        title="دلیل رد پرداخت"
        type="danger"
      > */}
      {showModal &&
        <Form className="d-block d-print-none row" onSubmit={() => verifyPurchase("rejected")} >
          <Col xs="12">
            <Input
              label="توضیحات"
              as="textarea"
              value={reason}
              setValue={setReason}
              rules={rules.required}
            />
          </Col>
          <Col xs="12">
            <Button type="submit" className="w-100">
              ثبت دلیل و رد پرداخت
            </Button>
          </Col>
        </Form>
      }

      {/* </Modal> */}
    </div>
  );
}

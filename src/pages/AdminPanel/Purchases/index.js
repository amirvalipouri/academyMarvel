import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Form } from "react-bootstrap";
import { Input, Select, Table, Pagination, PrintModal, Button } from "../../../components";
import { paymentMethods, purchaseStatus } from "../../../constants";
import { convertPhone, jsonToXlsx, scrollToTop } from "../../../methods";
import { axios, moment } from "../../../boot";
import Purchase from "../Purchase";
import { toast } from "../../../methods";

export default function Purchases() {
  const basicParams = JSON.parse(sessionStorage.getItem("params")) ?? {};
  const navigate = useNavigate();
  const [params, setParams] = useState({ page: 1, ...basicParams });
  const [purchases, setPurchases] = useState([]);
  const [pages, setPages] = useState({});
  const [modalInfo, setModalInfo] = useState(null)
  const [id, setId] = useState([])
  const [reason, setReason] = useState(null)
  const [ update , setUpdate ] = useState(0)

  const saveParams = () => {
    const value = JSON.stringify(params);
    sessionStorage.setItem("params", value);
  };
  const getPurchases = () => {
    saveParams();
    const url = "/admins/shop/purchases";
    const config = {
      params: {
        sort: "createdAt:-1",
        perPage: 20,
        ...params,
      },
    };
    params.date &&
      ([config.params.startDate, config.params.endDate] = params.date);
    delete config.params.date;
    axios.get(url, config).then(({ data }) => {
      setPurchases(data.data);
      setPages(data.pages);
      scrollToTop();
    });
  };
  const downloadXlsx = async () => {
    const url = "/admins/shop/purchases";
    const perPage = 100;
    const totalPages = Math.ceil(pages.totalItems / perPage);
    const config = (page) => ({ params: { ...params, perPage, page } });
    const getAllData = await [...Array(totalPages)]
      .map((e, i) => i + 1)
      .map(
        async (page) => await (await axios.get(url, config(page))).data?.data
      );
    const allData = await Promise.all(getAllData);
    const title = "report";
    const json = allData.flat().map((e) => ({
      "نام کاربر": `${e.shipping?.firstName} ${e.shipping?.lastName}`,
      "شماره موبایل": `${convertPhone(e.shipping?.phone)}`,
      تاریخ: moment.miladiToShamsi({ date: e.createdAt }),
      آدرس: e.shipping?.address,
      قیمت: `${e.totalPrice} تومان -  ${e.totalPriceUsd} تتر`,
      تخفیف: !!e.voucher
        ? `${e.offPrice} تومن -  ${e.offPriceUsd} تتر`
        : "بدون تخفیف",
      کالاها: e.items
        ?.map((e) => `${e.product?.title_fa} ${e.count} عدد`)
        .join(" - "),
      "نوع پرداخت": paymentMethods.find((mt) => mt.id === e.paymentMethod)
        ?.name,
      وضعیت: purchaseStatus.find((it) => it.id === e.status)?.name,
    }));
    jsonToXlsx({ json, title });
  };
  const formControls = [
    {
      label: "تاریخ",
      state: "date",
      type: "date",
      cancelBtn: true,
    },
    {
      label: "نام",
      state: "firstName",
      type: "text",
      clear: true,
    },
    {
      label: "نام خانوادگی",
      state: "lastName",
      type: "text",
      clear: true,
    },
    {
      label: "شماره پیگیری",
      state: "refId",
      type: "number",
      clear: true,
    },
    {
      tag: Select,
      label: "نوع پرداخت",
      state: "paymentMethod",
      cancelBtn: true,
      items: paymentMethods,
    },
    {
      tag: Select,
      label: "وضعیت",
      state: "status",
      cancelBtn: true,
      items: purchaseStatus.filter((e) => e.filterable),
    },
  ];
  const handleVerify = (status , reason = "") => {
    const url = "/admins/shop/purchases/verifyall";
    const body = {
      _id: id.toString(),
      status,
      reason
    };
    axios.post(url, body).then(({ data }) => {
      setUpdate(p => p+1)
      toast({});
      setId([])
      setReason(null)

    });
  }


  const handleRej = () => { setReason("") }


  const handlePrint = (status) => {
    const url = "/admins/shop/purchases/reportall";
    const body = { _id: id.toString() };
    axios.post(url, body).then(({ data }) => {
      
      const url = window.URL.createObjectURL(new Blob([data.address]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); //or any other extension
      document.body.appendChild(link);
      setTimeout(()=>{
        link.click();
      },3000)
      
      toast({});

    });
  }

  
  const handleSend = (status) => {
    const url = "/admins/shop/purchases/update-purchaseall";
    const body = {
      _id: id.toString(),
      status
    };
    axios.post(url, body).then(({ data }) => {
      setUpdate(p => p+1)
      toast({});

    });
  }

  const handleBtn = [
    {
      id: "acc",
      label: "تایید پرداخت ها",
      status: "accepted",
      func: handleVerify,
      variant: "success"
    },
    {
      id: "rej",
      label: "رد پرداخت ها",
      status: "rejected",
      func: handleRej,
      variant: "danger"
    },
    {
      id: "print",
      label: "پرینت پرداخت ها",
      status: "",
      func: handlePrint,
      vavariantrient: "info"
    },
    {
      id: "send",
      label: "ارسال شده",
      status: "shipping",
      func: handleSend,
      vavariantrient: "primary"
    },
  ]

  const showStatus = (id = 0) => {
    const { color, name } = purchaseStatus.find((e) => e.id === id) ?? {};
    return <span className={`text-${color} fw-bold`}>{name}</span>;
  };

  const handleChecked = (event) => {
    let checkbox = document.getElementById(event).checked;
    let data = id
    setId([])
    if (checkbox) {
      data.push(event)
    } else {
      if (data.length > 0) {
        const a = data.indexOf(event);
        data.splice(a, 1)
      }
    }
    setId([...data])
  }


  useEffect(getPurchases, [params,update]);
  return (
    <React.Fragment>
      <PrintModal show={modalInfo != null} onHide={() => setModalInfo(null)} size="lg">
        <Purchase data={modalInfo} onUpdate={setUpdate} />
      </PrintModal>

      <PrintModal show={reason != null} onHide={() => setReason(null)} size="lg">
        <Form className="d-block d-print-none row"  >
          <Col xs="12">
            <Input
              label="توضیحات"
              as="textarea"
              value={reason}
              setValue={setReason}
            />
          </Col>
          <Col xs="12">
            <Button onClick={() => handleVerify("rejected" , reason)} type="button" className="w-100">
              ثبت دلیل و رد پرداخت
            </Button>
          </Col>
        </Form>
      </PrintModal>
      <div>
        <button
          className="bi bi-filetype-xlsx fs-3 text-success"
          onClick={downloadXlsx}
        />
      </div>
      <Row className="d-print-none">
        {formControls.map((e) => (
          <Col key={e.state} xs="12" md="6" lg="4">
            {React.createElement(e.tag ?? Input, {
              ...e,
              value: params[e.state],
              setValue: (val) => {
                setPurchases([]);
                setParams((p) => ({ ...p, page: 1, [e.state]: val }));
              },
            })}
          </Col>
        ))}
      </Row>
      <Row className="d-print-none my-4">
        {handleBtn.map((e) => (
          <Col key={e.id} xs="12" md="6" lg="3">
            <Button className="w-100" disabled={id.length < 1} onClick={() => e.func(e.status)} variant={e.variant}>{e.label}</Button>
          </Col>
        ))}
      </Row>
      <Table className="d-print-none">
        <thead>
          <tr>
            <th>شماره پیگیری</th>
            <th>نام خریدار</th>
            <th>تاریخ</th>
            <th>مبلغ نهایی</th>
            <th>تخفیف</th>
            <th>نوع پرداخت</th>
            <th>وضعیت</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((e, i) => (
            <tr key={e._id + i}  >
              <td>{e?.refId ? e.refId : ""}</td>
              <td onClick={() => setModalInfo(e)}>
                {e.shipping?.firstName} {e.shipping?.lastName}
              </td>
              <td onClick={() => setModalInfo(e)}>
                <span dir="ltr">
                  {moment.miladiToShamsi({
                    date: e.createdAt,
                    format: "jYYYY/jMM/jDD - HH:mm:ss",
                  })}
                </span>
              </td>
              <td onClick={() => setModalInfo(e)} className="text-success">{`${e.totalPrice} تومان -  ${e.totalPriceUsd} تتر`}</td>
              <td onClick={() => setModalInfo(e)} className="text-danger">
                {!!e.voucher
                  ? `${e.offPrice} تومن -  ${e.offPriceUsd} تتر`
                  : "بدون تخفیف"}
              </td>
              <td onClick={() => setModalInfo(e)} className="fw-bold">
                {paymentMethods.find((mt) => mt.id === e.paymentMethod)?.name}
              </td>
              <td onClick={() => setModalInfo(e)}>{showStatus(e.status)}</td>
              <td>
                <Form>
                  <Form.Check
                    type="checkbox"
                    value={e._id}
                    id={e._id}
                    checked={id.find(p => p == e._id) ? true : false}
                    onChange={() => handleChecked(e._id)}
                  />
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        totalPages={pages.totalPages}
        activePage={params.page}
        setActivePage={(page) => setParams((p) => ({ ...p, page }))}
      />
      {/* {params.page < pages.totalPages && (
        <button
          className="d-block mx-auto w-fit text-primary"
          onClick={() => {
            setParams((p) => ({ ...p, page: p.page + 1 }));
          }}
        >
          نمایش بیشتر...
        </button>
      )} */}
    </React.Fragment>
  );
}

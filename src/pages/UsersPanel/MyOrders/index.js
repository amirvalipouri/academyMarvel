import React ,{useState , useEffect} from 'react'
import { Table , Pagination } from '../../../components'
import { convertPhone, jsonToXlsx, scrollToTop } from "../../../methods";
import { axios, moment } from "../../../boot";
import { Col, Row } from "react-bootstrap";
import { paymentMethods, purchaseStatus } from "../../../constants";

const MyOrders = () => {
    const basicParams = JSON.parse(sessionStorage.getItem("params")) ?? {};
    const [ myOrder , setMyOrder ] = useState([])
    const [pages, setPages] = useState({});
    const [params, setParams] = useState({ page: 1, ...basicParams });

    const getPurchases = () => {
        const url = "/pub/shop/purchases";
        axios.get(url).then(({ data }) => {
          // console.log("my order : ",data)
          setMyOrder(data.data)
          setPages(data.pages);
          scrollToTop();
        });
      };
      useEffect(getPurchases , [])
      const showStatus = (id = 0) => {
        const { color, name } = purchaseStatus.find((e) => e.id === id) ?? {};
        return <span className={`text-${color} fw-bold`}>{name}</span>;
      };
  return (
    <React.Fragment>
      {/* <Row className="d-print-none">
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
      </Row> */}
      <Table className="d-print-none">
        <thead>
          <tr>
            <th>شماره پیگیری سفارش</th>
            <th>محصولات</th>
            <th>تاریخ</th>
            <th>قیمت</th>
            <th>تخفیف</th>
            <th>وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {myOrder?.map((e, i) => (
            <tr key={e._id + i}>
              <td>
                {e.refId}
              </td>
              
              <td className="text-success">{e.items[0]?.title_fa}</td>
              <td>
                <span dir="ltr">
                  {moment.miladiToShamsi({
                    date: e.createdAt,
                    format: "jYYYY/jMM/jDD - HH:mm:ss",
                  })}
                </span>
              </td>
              <td className="text-danger">{e.totalPrice}  {paymentMethods.find((mt) => mt.id === e.paymentMethod)?.unit}</td>
              <td className="text-danger">{e.voucher}</td>
              <td>{showStatus(e.status)}</td>
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
  )
}

export default MyOrders
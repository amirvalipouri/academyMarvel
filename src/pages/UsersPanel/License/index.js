import { useEffect, useState } from 'react'
import { Button, Table } from '../../../components'
import { scrollToTop, toast, copyText } from "../../../methods";
import { axios } from "../../../boot";
import { Col, Row } from "react-bootstrap"

const License = () => {
    const [ license, setLicense ] = useState([])
    const [ checkPurchase , setCheckPurchase ] = useState([])
    const getPurchases = () => {
        const url = "/pub/shop/purchases";
        axios.get(url).then(({ data }) => {
            setCheckPurchase([])
            setLicense(data.data)
            for (let i of data.data) {

                if (i.spotLisence?.length > 0) {
                    setCheckPurchase([...i.spotLisence[0]])
                }
            }
            scrollToTop();
        });
    };
    useEffect(getPurchases, [])

    const copyCode = (id) => {
        const value = id;
        copyText(value)
            .then(() => {
                const text = "کپی شد.";
                toast({ text });
            })
            .catch(() => {
                const text = "خطا در کپی کد معرف لطفا مجددا تلاش کنید.";
                toast({ text, type: "error" });
            });
    };

    if (checkPurchase.length === 0)
        return <h4 className="text-primary text-center">شما تا به حال سفارشی نداشتید</h4>;

    return (
        <div>
            <Row className="my-4">
                <Col className="flex-center" xs="12" lg="6">
                    <a className='btn btn-primary' target="_blank" href='https://app.spotplayer.ir/assets/bin/spotplayer/setup.apk'>لینک دانلود اسپات پلیر برای اندروید</a>
                </Col>
                <Col className="flex-center" xs="12" lg="6">
                    <a className='btn btn-primary' target="_blank" href='https://app.spotplayer.ir/assets/bin/spotplayer/setup.exe'>لینک دانلود اسپات پلیر برای ویندوز</a>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th>عنوان</th>
                        <th>لایسنس</th>
                    </tr>
                </thead>
                <tbody>
                    {license?.map((e, i) => (
                        e.spotLisence?.length > 0 &&
                        <tr key={e._id + i}>
                            <td className="text-black">{e.items?.map((e) => e.product?.title_fa).join(" - ")}</td>
                            <td className="text-danger">
                                <Button onClick={() => copyCode(e.spotLisence[0])} variant='success' label='کپی' />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default License
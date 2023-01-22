import { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { Button, CommentCard } from "../../../components";
import { rules, comments } from "../../../constants";
import { toast } from "../../../methods";
import coin1 from "../../../assets/icons/coin-1.png";
import coin2 from "../../../assets/icons/coin-2.png";
import coin3 from "../../../assets/icons/coin-3.png";
import coin4 from "../../../assets/icons/coin-4.png";
import coin5 from "../../../assets/icons/coin-5.png";
import coin6 from "../../../assets/icons/coin-6.png";
import coin7 from "../../../assets/icons/coin-7.png";
import coin8 from "../../../assets/icons/coin-8.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

export default function Comments() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const login = (e) => {
    e.preventDefault();
    const valid = rules.phoneNumber.find((rule) => rule(phone) !== true);
    if (!valid) {
      navigate({ pathname: "/sign-in", search: `phone=${phone}` });
      return;
    }
    const text = valid(phone);
    toast({ text, type: "error" });
  };
  return (
    <div className="Comments bg-transparent bg-lg-white rounded-10 py-4">
      <Container className="d-flex flex-column flex-center text-center row-gap-2">
        <h4 className="text-info">نظرات مشتریان درباره ما</h4>

        <Swiper
          loop
          modules={[Autoplay]}
          className="w-100"
          spaceBetween={50}
          breakpoints={{
            992: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
          autoplay={{
            delay: 3500,
          }}
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
        >
          {comments.map((item, index) => (
            <SwiperSlide key={index} className="h-auto">
              <CommentCard active={index === 0} {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Row className="align-items-stretch justify-content-around bg-primary bg-opacity-10 rounded shadow-sm py-4 mt-5">
          <Col lg="2" className="position-relative d-none d-lg-block">
            {[coin1, coin2, coin3, coin4].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`coin-${index}`}
                className="coin-icon"
              />
            ))}
          </Col>
          <Col
            xs="12"
            md="10"
            lg="5"
            className="d-flex flex-column flex-center row-gap-3"
          >
            <h5 className="text-dark-blue">
              ﺑﻪ ﺟﻤﻊ ﺑﯿﺶ از 3000 دانشجو مارول ﺑﭙﯿﻮﻧﺪﯾﺪ!
            </h5>
            <p>
              از آنجایی امروزه که اعتماد به آموزش در زمینه ترید بسیار سخت شده
              است. ما تلاش کرده ایم تا به شما به گونه ای آموزش دهیم که واقعا
              بتوانید از علمی که به شما میدهیم استفاده کنید و سود ببرید. ما
              تضمین میکنیم که شما همه ی آنچه که لازم است در زمینه ترید بدانید را
              آموزش میدهیم و میتوانید به تیم مارول به راحتی اعتماد کنید
            </p>
            <form
              onSubmit={login}
              className="d-flex flex-center w-100 bg-white p-2 rounded shadow"
            >
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                placeholder="شماره موبایل خود را وارد کنید"
                className="form-control border-0 flex-1"
              />
              <Button type="submit" className="px-3 rounded">
                پیوستن
              </Button>
            </form>
          </Col>
          <Col lg="2" className="position-relative d-none d-lg-block">
            {[coin5, coin6, coin7, coin8].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`coin-${index}`}
                className="coin-icon"
              />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

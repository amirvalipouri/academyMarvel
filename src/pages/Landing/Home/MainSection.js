import { Container } from "react-bootstrap";
import mainSectionImg from "../../../assets/images/Home/man.png";
import scrollIcon from "../../../assets/icons/Home/scroll.svg";
import { BgImage } from "../../../components";

export default function MainSection() {
  return (
    <Container className="main-section position-relative">
      <div className="title">
        <h1 className="position-relative text-info lh-md text-center text-lg-start">
          با مارول آگاهانه تر
          <br />
          ترید کردن را یاد بگیرید!
          <BgImage
            width={40}
            type={8}
            position="static"
            className="d-none d-lg-inline"
          />
        </h1>
        <div className="d-none d-lg-flex align-items-center col-gap-3">
          <img src={scrollIcon} alt="scrollIcon" />
          <p>برای آشنایی بیشتر اسکرول کنید</p>
        </div>
      </div>
      <div
        style={{ minHeight: "200px" }}
        className="position-relative overflow-hidden d-flex flex-center"
      >
        <img className="main-img" src={mainSectionImg} alt="mainSectionImg" />
      </div>
    </Container>
  );
}

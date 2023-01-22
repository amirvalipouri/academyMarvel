import bgImg1 from "../../assets/bg-imgs/bg-img-1.png";
import bgImg2 from "../../assets/bg-imgs/bg-img-2.png";
import bgImg3 from "../../assets/bg-imgs/bg-img-3.png";
import bgImg4 from "../../assets/bg-imgs/bg-img-4.png";
import bgImg5 from "../../assets/bg-imgs/bg-img-5.png";
import bgImg6 from "../../assets/bg-imgs/bg-img-6.png";
import bgImg7 from "../../assets/bg-imgs/bg-img-7.png";
import bgImg8 from "../../assets/bg-imgs/bg-img-8.png";
import bgImg9 from "../../assets/bg-imgs/bg-img-9.png";
import bgImg10 from "../../assets/bg-imgs/bg-img-10.png";
import logo from "../../assets/bg-imgs/logo.png";
import "./index.scss";
export default function BgImage({
  type = 0,
  width = 200,
  objectFit = "unset",
  height = "auto",
  className = "",
  position = "absolute",
  fullSize = false,
}) {
  const images = [
    bgImg1,
    bgImg2,
    bgImg3,
    bgImg4,
    bgImg5,
    bgImg6,
    bgImg7,
    bgImg8,
    bgImg9,
    bgImg10,
    logo,
  ];
  return (
    <img
      className={`BgImage position-${position} object-fit-${objectFit} ${
        fullSize ? "top-0 left-0 w-100 h-100" : ""
      } ${className}`}
      width={width}
      height={height}
      src={images[type]}
      alt="background"
    />
  );
}

import testImage from "../../assets/images/image.png";
import "./index.scss";
export default function CommentBox() {
  return (
    <div className="CommentBox w-100 shadow-sm rounded p-2">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex flex-center col-gap-2">
          <img
            className="object-fit-cover rounded-circle"
            width="50"
            height="50"
            src={testImage}
            alt="testImage"
          />
          <h6 className="text-info">امین دسومی</h6>
        </div>
        <div className="score w-fit d-flex flex-center col-gap-1">
          {[...Array(5)].map((i, index) => (
            <i key={index} className="bi bi-star-fill fs-7 text-gold" />
          ))}
        </div>
      </div>
      <div className="body d-flex flex-column row-gap-3">
        <p className="text-info fs-7">2 اردیبهشت 1400</p>
        <p className="text-justify">
          اﻃﻤﯿﻨﺎن ﺣﺎﺻﻞ ﻧﻤﺎﯾﯿﺪ. ﺑﺎ ﻣﻄﺎﻟﻌﻪ‌ی راﻫﻨﻤﺎی ﺧﺮﯾﺪ اﻣﻦ، آﺳﻮده‌ﺗﺮ ﻣﻌﺎﻣﻠﻪ
          ﮐﻨﯿﺪ. ﻟﻄﻔﺎ ﭘﯿﺶ از اﻧﺠﺎم ﻣﻌﺎﻣﻠﻪ و ﻫﺮ ﻧﻮع ﭘﺮداﺧﺖ وﺟﻪ، از ﺻﺤﺖ ﮐﺎﻟﺎ ﯾﺎ
          ﺧﺪﻣﺎت اراﺋﻪ ﺷﺪه، ﺑﻪ ﺻﻮرت ﺣﻀﻮری
        </p>
      </div>
      <div className="d-flex align-items-center justify-content-between justify-content-lg-end col-gap-3 mt-3">
        <p>آیا این دیدگاه برایتان مفید بود؟</p>
        <div className="like-section d-flex align-items-center justify-content-between">
          <button className="bg-transparent border-0 text-secondary">
            2
            <i className="bi bi-hand-thumbs-up" />
          </button>
          <button className="bg-transparent border-0 text-secondary">
            0
            <i className="bi bi-hand-thumbs-down" />
          </button>
        </div>
      </div>
    </div>
  );
}

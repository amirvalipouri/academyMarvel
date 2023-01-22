import { BgImage } from "../../components";

export default function SupportSection() {
  return (
    <div className="SupportSection position-relative d-flex flex-column row-gap-3 bg-primary rounded mt-5 p-3 w-100">
      <BgImage
        type={3}
        objectFit="cover"
        className="w-100 h-100 top-0 left-0"
      />
      <div className="p-2 bg-white rounded d-flex flex-center">
        <i className="text-primary bi bi-question-circle-fill fs-5" />
      </div>
      <p className="text-white lh-lg">
        جهت اطلاع از اخبار و تحلیل‌های بروز مالی عضو کانال تلگرام مارول شوید.
      </p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://t.me/marveltradegroup"
        className="Button btn btn-white text-primary"
      >
        عضویت
      </a>
    </div>
  );
}

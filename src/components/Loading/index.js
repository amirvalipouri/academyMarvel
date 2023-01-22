import { useSelector } from "react-redux";
import "./index.scss";
export default function Loading() {
  const {show,progress} = useSelector((s) => s.loading);
  return (
    show.length!==0 && (
      <div className="Loading position-fixed d-flex flex-center w-100 h-100">
        <div className="lds-ring d-flex flex-center">
          {progress && <h3 className="font-en text-primary">{progress}%</h3>}
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-primary"></div>
          ))}
        </div>
      </div>
    )
  );
}

import "./index.scss";
export default function Radio({
  label = null,
  variant = "primary",
  className = "",
  name = "",
  value = "",
  option = "",
  setValue = () => {},
}) {
  return (
    <div className={`Radio w-100 ${className}`}>
      <label className="d-flex align-items-center col-gap-2">
        <input
          className="d-none"
          type="radio"
          name={name}
          checked={`${value}` === `${option}`}
          onChange={() => {
            setValue(option);
          }}
        />
        <div
          style={{ "--variant": `var(--bs-${variant})` }}
          className="position-relative transition rounded-circle"
        >
          <div className={`position-absolute transition bg-${variant}`} />
        </div>
        {label && <span>{label}</span>}
      </label>
    </div>
  );
}

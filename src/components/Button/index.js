import BButtom from "react-bootstrap/Button";
import "./index.scss";
export default function Button({
  variant = "primary",
  outline = false,
  label = "",
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  disabled = false,
  className = "",
  size = "md",
  type = "button",
  //   loading = false,
  children = null,
}) {
  const showVariant = () => {
    if (outline) {
      return `outline-${variant}`;
    }
    return `${variant} text-white`;
  };
  return (
    <BButtom
      size={size}
      variant={showVariant()}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      className={`Button ${className}`}
      type={type}
    >
      {label}
      {children}
    </BButtom>
  );
}

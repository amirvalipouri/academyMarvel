import BForm from "react-bootstrap/Form";
export default function Form({
  onSubmit = () => {},
  className = "",
  children = "",
}) {
  const submit = (e) => {
    e.preventDefault();
    const fields = e.target.getElementsByClassName("check-valid");
    const isAllValid = [...fields].map((field) => {
      const isValid = field.isValid ?? (() => true);
      return isValid();
    });
    isAllValid.every((e) => e) && onSubmit(true);
  };
  return (
    <BForm className={className} onSubmit={submit}>
      {children}
    </BForm>
  );
}

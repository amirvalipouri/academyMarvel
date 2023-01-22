import { logout, toast } from "../../methods";
// import { errors } from "../../constants";
export default function handleErrors(error) {
  console.log(error?.response);
  const response = error?.response;
  if (!response) return toast({ text: "Network error", type: "error" });
  const errorsList = response.data.errors ?? [];
  const errorCode = response.data.code;
  const isPaymentError = response?.status === 504 || errorCode === 166;
  if (isPaymentError) return;
  if (errorCode === 141) logout(true);
  errorsList.forEach((error) => {
    const text = Object.values(error)[0];
    toast({ text, type: "error" });
  });
  // const text = errors[errorCode];
  // if (text) return toast({ text, type: "error" });
}

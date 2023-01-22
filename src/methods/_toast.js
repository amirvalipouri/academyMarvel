import hotToast from "react-hot-toast";
export default function toast({
  text = null,
  type = "success",
  duration = 5000,
}) {
  const defaultMessages = {
    success: "عملیات با موفقیت انجام شد.",
    error: "",
  };
  const message = text ?? defaultMessages[type];
  hotToast[type](message, {
    duration,
  });
}

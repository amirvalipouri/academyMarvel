const purchaseStatus = [
  {
    name: "جدید",
    id: "new",
    color: "primary",
  },
  {
    name: "در انتظار تایید",
    id: "pending",
    color: "warning",
    filterable: true,
  },
  {
    name: "تایید شده",
    id: "accepted",
    color: "success",
    isUpdateStatus: true,
  },
  {
    name: "تایید شده",
    id: "paid",
    color: "success",
    isUpdateStatus: true,
    filterable: true,
  },
  {
    name: "ارسال شده",
    id: "shipping",
    color: "info",
    updatable: true,
    isUpdateStatus: true,
    filterable: true,
  },
  {
    name: "پرداخت ناموفق",
    id: "failed",
    color: "danger",
    filterable: true,
  },
  {
    name: "رد شده",
    id: "rejected",
    color: "danger",
    filterable: true,
  },
  {
    name: "تحویل داده شده",
    id: "done",
    color: "primary",
    updatable: false,
    isUpdateStatus: true,
  },
  
];
export default purchaseStatus;

export default function Steps({ activeStep = 0, setActiveStep = () => {} }) {
  const steps = [
    {
      name: "نحوه پرداخت",
    },
    {
      name: "اطلاعات ارسال",
    },
    {
      // name: "اتمام خرید و ارسال",
      name: "اتمام خرید",
    },
  ].map((e, i) => ({ ...e, id: i }));
  const activeWidth = (activeStep / (steps.length - 1)) * 100;
  const isActive = (id = 0) => {
    const active = activeStep >= id;
    if (active) return "active";
    return "";
  };
  return (
    <div className="steps w-100 wrapper">
      <div className="d-flex align-items-start position-relative">
        <div
          style={{ "--width": `${activeWidth}%` }}
          className="step-line position-absolute"
        />
        {steps.map((e) => (
          <div
            key={e.id}
            className={`step ${isActive(
              e.id
            )} d-flex flex-column flex-center text-center`}
          >
            <button
              onClick={() => e.id < activeStep && setActiveStep(e.id)}
              className="rounded-circle mb-3 position-relative"
            />
            <h6 className="text-truncate">{e.name}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

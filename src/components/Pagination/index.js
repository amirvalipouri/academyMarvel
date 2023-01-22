import "./index.scss";
export default function Pagination({
  activePage = 1,
  totalPages = 1,
  setActivePage = () => {},
}) {
  const min = 1;
  const max = totalPages;
  const showItemsLen = 2;

  const renderItems = () => {
    const items = [];
    for (let i = min; i <= max; i++) {
      const conditions = [
        i === min,
        i === max,
        i >= activePage - showItemsLen && i <= activePage + showItemsLen,
      ];
      const isActive = +activePage === i;
      const className = [
        "border-0",
        "rounded-pill",
        isActive ? "bg-primary" : "bg-transparent",
        isActive ? "bg-opacity-10" : "",
        isActive ? "text-primary" : "text-secondary",
      ].join(" ");
      const element = conditions.some((e) => e)
        ? () => (
            <button className={className} onClick={() => setActivePage(i)}>
              {i}
            </button>
          )
        : i <= activePage + showItemsLen
        ? "prev"
        : "next";
      items.push(element);
    }
    const Ellipsis = () => <span className="text-secondary">...</span>;
    return [...new Set(items)].map((Item, index) => {
      if (Item === "prev" || Item === "next") return <Ellipsis key={index} />;
      return <Item key={index} />;
    });
  };

  return (
    max !== 1 && (
      <div className="Pagination w-fit mx-auto d-flex fs-6 flex-center col-gap-1 d-print-none">
        <button
          disabled={+activePage === min}
          onClick={() => setActivePage(+activePage - 1)}
          className="bi bi-arrow-right text-primary p-0 border-0 bg-transparent"
        />
        {renderItems()}
        <button
          disabled={+activePage === max}
          onClick={() => setActivePage(+activePage + 1)}
          className="bi bi-arrow-left text-primary p-0 border-0 bg-transparent"
        />
      </div>
    )
  );
}

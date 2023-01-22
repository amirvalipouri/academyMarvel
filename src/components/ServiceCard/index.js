export default function ServiceCard({ title = "", image = "" }) {
  return (
    <div className="ServiceCard d-flex flex-column align-items-start text-center row-gap-3 p-4 rounded-10 bg-white shadow-sm border border-light-gray">
      <img width="50" src={image} alt={title} />
      <h6 className="text-dark-blue">{title}</h6>
    </div>
  );
}

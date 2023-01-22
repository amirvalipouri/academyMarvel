export default function useObserved() {
  const observed = JSON.parse(localStorage.getItem("observed")) ?? [];
  const setNewId = (id = "") => {
    const list = [...new Set([...observed, id])];
    localStorage.setItem("observed", JSON.stringify(list));
  };
  return { observed, setNewId };
}

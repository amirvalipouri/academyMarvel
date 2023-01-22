import { Line } from "react-chartjs-2";
import { Chart as CahrtJs, registerables } from "chart.js";
CahrtJs.register(...registerables);
export default function Chart({ dataList = [] }) {
  const showWeekday = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("fa-IR", { weekday: "long" });
  };
  const labels = dataList.map((e) => showWeekday(e.createdAt));
  const data = dataList.map((e) => Math.ceil(e.time / 60));
  return (
    <div className="chart-container position-relative ">
      <Line
        height="300"
        data={{
          labels,
          datasets: [
            {
              backgroundColor: "#2e51db",
              borderColor: "#2e51db",
              data,
              fill: {
                target: "origin",
                above: "#2e51db11",
              },
              lineTension: 0.25,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: { legend: false },
          scales: {
            y: {
              min: 0,
              grid: { display: false },
              title: { display: true, text: "دقیقه" },
            },
            x: { grid: { display: false } },
          },
        }}
      />
    </div>
  );
}

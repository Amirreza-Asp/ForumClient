import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "number of topics per months",
    },
  },
};

interface Props {
  numberOfTopicsPerMonth: [
    {
      month: string;
      count: number;
    }
  ];
}

export default function DashboardContentChart({
  numberOfTopicsPerMonth,
}: Props) {
  const data = {
    labels: numberOfTopicsPerMonth.map((item) => item.month),
    datasets: [
      {
        fill: true,
        label: "",
        data: numberOfTopicsPerMonth.map((item) => item.count),
        borderColor: "yellow",
        backgroundColor: "rgba(92, 77, 0 , .15)",
      },
    ],
  };

  return (
    <div className="bg-item">
      <Line
        width={window.innerWidth - 240}
        height={200}
        options={options}
        data={data}
      />
    </div>
  );
}

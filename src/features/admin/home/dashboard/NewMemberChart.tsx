import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "New member joined",
    },
  },
};

interface Props {
  newMembersJoined: [
    {
      month: string;
      count: string;
    }
  ];
}

export default function NewMemberChart({ newMembersJoined }: Props) {
  const data = {
    labels: newMembersJoined.map((item) => item.month),
    datasets: [
      {
        fill: true,
        label: "Dataset 1",
        data: newMembersJoined.map((item) => item.count),
        borderColor: "rgba(3, 227, 252 , 1)",
        borderWidth: 2,
        backgroundColor: "rgba(3, 227, 252 , .1)",
      },
    ],
  };

  return (
    <div className="bg-item">
      <Bar
        width={(window.innerWidth - 275) / 3}
        options={options}
        data={data}
      />
    </div>
  );
}

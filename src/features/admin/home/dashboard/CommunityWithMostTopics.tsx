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
      display: false,
    },
    title: {
      display: true,
      text: "Community with most topics",
    },
  },
};

interface Props {
  communitiesWithMostTopics: [
    {
      community: string;
      topicsCount: number;
    }
  ];
}

export default function CommunityWithMostTopics({
  communitiesWithMostTopics,
}: Props) {
  const data = {
    labels: communitiesWithMostTopics.map((item) => item.community),
    datasets: [
      {
        fill: true,
        label: "",
        data: communitiesWithMostTopics.map((item) => item.topicsCount),
        borderColor: "rgb(85, 255, 79)",
        backgroundColor: "rgba(85, 255, 79, .1)",
      },
    ],
  };

  return (
    <div className="bg-item">
      <Line
        width={(window.innerWidth - 275) / 3}
        height={200}
        options={options}
        data={data}
      />
    </div>
  );
}

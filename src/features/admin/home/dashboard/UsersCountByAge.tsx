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
      text: "Users count by age",
    },
  },
};

interface Props {
  userCountByAge: [
    {
      age: number;
      count: number;
    }
  ];
}

const getSum = (
  userCountByAge: [
    {
      age: number;
      count: number;
    }
  ],
  from: number,
  to: number
): number => {
  let sum: number = 0;

  userCountByAge.forEach((item) => {
    if (item.age >= from && item.age < to) {
      sum += item.count;
    }
  });

  return sum;
};

export default function UsersCountByAge({ userCountByAge }: Props) {
  const labels = ["under 15"];
  const values = [getSum(userCountByAge, 0, 15)];

  for (let i = 15; i < 50; i += 5) {
    labels.push(`${i} to ${i + 5}`);
    values.push(getSum(userCountByAge, i, i + 5));
  }

  labels.push("over 50");
  values.push(getSum(userCountByAge, 50, 99));

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "",
        data: values,
        borderColor: "rgb(255, 89, 205)",
        backgroundColor: "rgba(255, 89, 205, .1)",
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

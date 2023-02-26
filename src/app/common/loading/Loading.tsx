import { ThreeCircles } from "react-loader-spinner";

interface Props {
  width: number;
  containerHeight?: number;
  color?: string;
}

export default function Loading({ width, containerHeight, color }: Props) {
  return (
    <ThreeCircles
      height={`${width}`}
      width={`${width}`}
      color={color ?? "rgb(24, 178, 255)"}
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: containerHeight ? `${containerHeight}` : "calc(100vh - 90px)",
      }}
      wrapperClass=""
      visible={true}
      ariaLabel="Loading"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  );
}

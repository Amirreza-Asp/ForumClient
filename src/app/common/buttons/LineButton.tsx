import React from "react";

interface Props {
  value?: string;
  icon?: string;
  color: string;
  type?: "button" | "submit";
  size: "sm" | "md" | "lg";
  loading?: boolean;
  onClick?: () => void;
}

const lines = ["", "270deg , ", "-0 , ", "90deg , "];

export default function LineButton({
  value,
  icon,
  color,
  size,
  type = "button",
  onClick,
  loading,
}: Props) {
  const padding = size === "sm" ? "1.5rem" : size === "md" ? "2rem" : "3rem";

  const [btnStyle, setBtnStyle] = React.useState({
    color: color,
    paddingInline: padding,
    backgroundColor: "transparent",
  });

  function Hover() {
    setBtnStyle({
      color: "black",
      paddingInline: padding,
      backgroundColor: color,
    });
  }

  function Leave() {
    setBtnStyle({
      color: color,
      paddingInline: padding,
      backgroundColor: "transparent",
    });
  }

  if (loading)
    return (
      <button
        className="line-button"
        style={{
          color: color,
          paddingInline: padding,
          backgroundColor: "transparent",
          opacity: 0.8,
        }}
        type={"button"}
      >
        <div
          className="load-rotate"
          style={{
            width: "1rem",
            borderColor: color,
            borderTopColor: "rgba(100,100,100,.7)",
          }}
        ></div>
        {lines.map((deg, index) => (
          <span
            key={index}
            className={`line-${index + 1}`}
            style={{
              background: `linear-gradient(${deg} ${color} , transparent)`,
            }}
          ></span>
        ))}
      </button>
    );

  return (
    <button
      onMouseOver={Hover}
      onMouseLeave={Leave}
      className="line-button"
      style={btnStyle}
      onClick={onClick}
      type={type}
    >
      {value}
      {icon && <i className={icon}></i>}
      {lines.map((deg, index) => (
        <span
          key={index}
          className={`line-${index + 1}`}
          style={{
            background: `linear-gradient(${deg} ${color} , transparent)`,
          }}
        ></span>
      ))}
    </button>
  );
}

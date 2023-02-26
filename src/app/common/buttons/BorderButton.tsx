import React, { useEffect } from "react";

interface Props {
  color: string;
  icon?: string;
  value?: string;
  className?: string;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "button" | "submit";
}

export default function BorderButton({
  value,
  color,
  icon,
  className,
  loading,
  type = "button",
  onClick,
}: Props) {
  const [btnStyle, setBtnStyle] = React.useState({
    border: `2px solid ${color}`,
    color: color,
    backgroundColor: "transparent",
  });

  function Hover() {
    setBtnStyle({
      border: `2px solid ${color}`,
      color: "black",
      backgroundColor: color,
    });
  }
  function Leave() {
    setBtnStyle({
      border: `2px solid ${color}`,
      color: color,
      backgroundColor: "transparent",
    });
  }

  return (
    <button
      onMouseOver={() => Hover()}
      onMouseLeave={() => Leave()}
      className={`border-button ${className}`}
      style={btnStyle}
      onClick={onClick}
      type={type}
    >
      {loading ? <span className="spinner"></span> : value}
      {icon && <i className={icon}></i>}
    </button>
  );
}

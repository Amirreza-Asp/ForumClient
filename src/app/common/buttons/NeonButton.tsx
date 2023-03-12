import React from "react";

interface Props {
  value: string;
  isLoading?: boolean;
  onClick?: () => void;
  shadow?: boolean;
  type: "submit" | "button" | "reset";
  color?: string;
}

export default function NeonButton({
  value,
  isLoading = false,
  type,
  shadow = true,
  onClick,
  color,
}: Props) {
  return (
    <div className="neon-btn-container">
      <button
        onClick={onClick ? onClick : undefined}
        className={shadow ? "shadow" : ""}
        type={type}
        style={{
          borderColor: color ?? "",
          boxShadow:
            shadow && color
              ? `inset 0 0 20px ${color},0 0 20px 1px ${color}`
              : `inset 0 0 20px ${color}, 0 0 10px 1px ${color}`,
          color: color ?? "",
        }}
      >
        {isLoading ? (
          <span className="neon-btn-loader-container">
            Loading
            <span className="neon-btn-loader"></span>
          </span>
        ) : (
          value
        )}
      </button>
    </div>
  );
}

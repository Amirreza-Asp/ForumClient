import React from "react";

interface Props {
  value: string;
  isLoading?: boolean;
  onClick?: () => void;
  shadow?: boolean;
  type: "submit" | "button" | "reset";
}

export default function NeonButton({
  value,
  isLoading = false,
  type,
  shadow = true,
  onClick,
}: Props) {
  return (
    <div className="neon-btn-container">
      <button
        onClick={onClick ? onClick : undefined}
        className={shadow ? "shadow" : ""}
        type={type}
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

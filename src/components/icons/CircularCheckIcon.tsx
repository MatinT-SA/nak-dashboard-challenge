import React from "react";

interface Props {
  color?: string; // default color
  size?: number; // icon size in px
}

const CircularCheckIcon: React.FC<Props> = ({ color = "#999", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <path
      d="M8 12.5L11 15.5L16 10.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CircularCheckIcon;

import React from "react";

interface ProfileIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // optional size override
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ size = 70, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="70" height="70" rx="35" fill="white" />
      <path
        d="M35 35C37.3206 35 39.5462 34.0781 41.1872 32.4372C42.8281 30.7962 43.75 28.5706 43.75 26.25C43.75 23.9294 42.8281 21.7038 41.1872 20.0628C39.5462 18.4219 37.3206 17.5 35 17.5C32.6794 17.5 30.4538 18.4219 28.8128 20.0628C27.1719 21.7038 26.25 23.9294 26.25 26.25C26.25 28.5706 27.1719 30.7962 28.8128 32.4372C30.4538 34.0781 32.6794 35 35 35ZM24.375 37.5C23.2147 37.5 22.1019 37.9609 21.2814 38.7814C20.4609 39.6019 20 40.7147 20 41.875V42.5C20 45.4912 21.9037 48.0212 24.6062 49.7412C27.3238 51.4712 31.0025 52.5 35 52.5C38.9975 52.5 42.675 51.4712 45.3938 49.7412C48.0963 48.0212 50 45.4912 50 42.5V41.875C50 40.7147 49.5391 39.6019 48.7186 38.7814C47.8981 37.9609 46.7853 37.5 45.625 37.5H24.375Z"
        fill="#04131C"
      />
    </svg>
  );
};

export default ProfileIcon;

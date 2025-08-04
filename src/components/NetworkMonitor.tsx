import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const ToastContainer = styled.div<{ show: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #dc3545;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  transform: translateX(${(props) => (props.show ? "0" : "400px")});
  transition: transform 0.3s ease-in-out;
  max-width: 350px;
`;

const ToastTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ToastMessage = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

export const NetworkMonitor = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowToast(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowToast(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (!navigator.onLine) {
      setShowToast(true);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline && showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, showToast]);

  return (
    <ToastContainer show={showToast && !isOnline}>
      <ToastTitle>No Internet Connection</ToastTitle>
      <ToastMessage>
        Please check your network connection and try again.
      </ToastMessage>
    </ToastContainer>
  );
};

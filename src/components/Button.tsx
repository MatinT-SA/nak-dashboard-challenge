import styled from "@emotion/styled";
import type { CSSProperties, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  style?: CSSProperties;
}

const StyledButton = styled.button<{
  variant: "primary" | "secondary" | "danger";
  size: "small" | "medium" | "large";
}>`
  border: none;
  border-radius: 10000px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${(props) => {
    switch (props.size) {
      case "small":
        return `
          padding: 0.5rem 1rem;
          font-size: 14px;
        `;
      case "large":
        return `
          padding: 1rem 2rem;
          font-size: 18px;
        `;
      default:
        return `
          padding: 0.5rem 1.5rem;
          font-size: 16px;
        `;
    }
  }}

  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background: #1e1e2f;
          color: white;
          
          &:hover:not(:disabled) {
            background: #2a2a3a;
            transform: translateY(-1px);
          }
        `;
      case "danger":
        return `
          background: #dc3545;
          color: white;
          
          &:hover:not(:disabled) {
            background: #c82333;
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.8);
          color: #333;
          border: 1px solid rgba(0, 0, 0, 0.1);
          
          &:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.9);
            transform: translateY(-1px);
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "secondary",
  size = "medium",
}: ButtonProps) => (
  <StyledButton
    type={type}
    onClick={onClick}
    disabled={disabled}
    variant={variant}
    size={size}
  >
    {children}
  </StyledButton>
);

export const PrimaryButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="primary" />
);

export const DangerButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="danger" />
);

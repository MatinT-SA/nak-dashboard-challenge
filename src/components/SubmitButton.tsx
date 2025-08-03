import styled from "@emotion/styled";
import type { ButtonHTMLAttributes } from "react";
import ArrowRightIcon from "../components/icons/ArrowRightIcon";

const StyledButton = styled.button<{ disabled?: boolean }>`
  background-color: black;
  border: 2px solid black;
  border-radius: 10000px;
  padding: 0.5rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all.2s ease-in;

  svg {
    stroke: white;
    fill: white;
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: white;
    border: 2px solid black;

    svg {
      stroke: black;
      fill: black;
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton(props: SubmitButtonProps) {
  return (
    <StyledButton {...props}>
      <ArrowRightIcon />
    </StyledButton>
  );
}

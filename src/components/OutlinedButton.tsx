import styled from "@emotion/styled";

const OutlinedButton = styled.button`
  background: transparent;
  border: 1px solid black;
  color: black;
  font-size: 20px;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: 10000px;
  cursor: pointer;
  transition: 0.2s ease-in;

  &:hover {
    background-color: black;
    color: white;
  }
`;

export default OutlinedButton;

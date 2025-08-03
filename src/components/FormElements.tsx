import styled from "@emotion/styled";

export const Title = styled.h2`
  margin: 0;
  font-size: 30px;
  font-weight: 800;
  text-align: left;
  color: black;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 40px;
  border: none;
  font-size: 20px;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.02);
  color: black;
  transition: border-color 0.2s;

  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }

  &:focus {
    border-color: #1e1e2f;
    outline: none;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  font-weight: 600;
  margin: 0 0 0.2rem 1rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

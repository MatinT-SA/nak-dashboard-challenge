/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

import ArrowRightIcon from "../components/icons/ArrowRightIcon";

interface FormData {
  username: string;
  password: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: transparent;
`;

const Box = styled.form`
  background-color: rgba(255, 255, 255, 0.4);
  padding: 2rem;
  border-radius: 40px;
  border: 1px solid white;
  width: 700px;
  height: 456px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin: 1rem 0;
  font-size: 30px;
  font-weight: 800;
  text-align: left;
  color: black;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledInput = styled.input`
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignUpBtn = styled.button`
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

const SubmitBtn = styled.button`
  background-color: black;
  border: 2px solid black;
  border-radius: 10000px;
  padding: 0.5rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

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
`;

export default function SignIn() {
  const { t } = useTranslation();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    login();
    navigate("/");
  };

  return (
    <Container>
      <Box onSubmit={handleSubmit(onSubmit)}>
        <Title>{t("Sign In")}</Title>

        <InputsWrapper>
          <StyledInput
            placeholder={t("Username")}
            {...register("username", { required: true })}
          />
          <StyledInput
            type="password"
            placeholder={t("Password")}
            {...register("password", { required: true })}
          />
        </InputsWrapper>

        <Row>
          <SignUpBtn type="button">{t("Sign Up")}</SignUpBtn>

          <SubmitBtn type="submit" aria-label="submit login">
            <ArrowRightIcon />
          </SubmitBtn>
        </Row>
      </Box>
    </Container>
  );
}

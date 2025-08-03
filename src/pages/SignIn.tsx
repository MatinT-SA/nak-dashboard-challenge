/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

import ArrowRightIcon from "../components/icons/ArrowRightIcon";
import OutlinedButton from "../components/OutlinedButton";

import SubmitButton from "../components/SubmitButton";

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
  width: 90%;
  max-width: 500px;

  height: auto;
  aspect-ratio: 500 / 400;

  background-color: rgba(255, 255, 255, 0.4);
  padding: 2rem;
  border-radius: 40px;
  border: 1px solid white;

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

const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
  margin: 0 0 0.5rem 1rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubmitBtn = styled.button<{ disabled?: boolean }>`
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default function SignIn() {
  const { t } = useTranslation();
  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await login(data.username, data.password);

    if (useAuthStore.getState().isLoggedIn) {
      navigate("/");
    }
  };

  return (
    <Container>
      <Box onSubmit={handleSubmit(onSubmit)}>
        <Title>{t("Sign In")}</Title>

        <InputsWrapper>
          <StyledInput
            placeholder={t("Username")}
            {...register("username", { required: t("Username is required") })}
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}

          <StyledInput
            type="password"
            placeholder={t("Password")}
            {...register("password", { required: t("Password is required") })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}

          {/* Show API login error */}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputsWrapper>

        <Row>
          <OutlinedButton type="button" onClick={() => navigate("/signup")}>
            {t("Sign Up")}
          </OutlinedButton>

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            aria-label="submit signin"
          />
        </Row>
      </Box>
    </Container>
  );
}

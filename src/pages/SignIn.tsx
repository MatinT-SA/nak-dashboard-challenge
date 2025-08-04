/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

import OutlinedButton from "../components/OutlinedButton";
import SubmitButton from "../components/SubmitButton";
import {
  Title,
  InputsWrapper,
  StyledInput,
  ErrorMessage,
  Row,
} from "../components/FormElements";

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

export default function SignIn() {
  const { t } = useTranslation();
  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);
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

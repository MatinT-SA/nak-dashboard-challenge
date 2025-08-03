/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

import ArrowRightIcon from "../components/icons/ArrowRightIcon";
import CircularCheckIcon from "../components/icons/CircularCheckIcon";
import OutlinedButton from "../components/OutlinedButton";

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
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
  aspect-ratio: 500 / 600;

  background-color: rgba(255, 255, 255, 0.4);
  padding: 2rem;
  border-radius: 40px;
  border: 1px solid white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin: 0;
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

export default function SignUp() {
  const [usernameValue, setUsernameValue] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  // Watch password to validate confirmPassword
  const password = watch("password", "");

  const onSubmit = async (data: FormData) => {
    try {
      // call your signup API here
      const response = await fetch("/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          userName: data.username,
          password: data.password,
        }),
      });

      if (response.status === 201) {
        // After successful signup, automatically login or navigate to signin
        await login(data.username, data.password);
        if (useAuthStore.getState().isLoggedIn) {
          navigate("/");
        }
      } else {
        const resData = await response.json();
        throw new Error(resData.message || t("Sign up failed"));
      }
    } catch (err: any) {
      alert(err.message); // You can handle better with toast or error display state
    }
  };

  const validateUsername = (value: string) => {
    setIsUsernameValid(value.length >= 4);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUsernameValue(val);
    validateUsername(val);
  };

  return (
    <Container>
      <Box onSubmit={handleSubmit(onSubmit)} noValidate>
        <Title>{t("Sign Up")}</Title>

        <InputsWrapper>
          <StyledInput
            placeholder={t("Name")}
            {...register("firstName", {
              required: t("First name is required"),
            })}
          />
          {errors.firstName && (
            <ErrorMessage>{errors.firstName.message}</ErrorMessage>
          )}

          <StyledInput
            placeholder={t("Last Name")}
            {...register("lastName", { required: t("Last name is required") })}
          />
          {errors.lastName && (
            <ErrorMessage>{errors.lastName.message}</ErrorMessage>
          )}

          <div
            css={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <StyledInput
              placeholder={t("Username")}
              {...register("username", { required: t("Username is required") })}
              value={usernameValue}
              onChange={handleUsernameChange}
              css={{ paddingRight: 40 }} // extra right padding for icon space
            />
            <div
              css={{
                position: "absolute",
                right: 12,
                pointerEvents: "none", // so icon doesn't block clicks
              }}
              aria-hidden="true"
            >
              <CircularCheckIcon
                color={isUsernameValid ? "green" : "#999"}
                size={24}
              />
            </div>
          </div>

          <StyledInput
            type="password"
            placeholder={t("Password")}
            {...register("password", {
              required: t("Password is required"),
              minLength: {
                value: 6,
                message: t("Password must be at least 6 characters"),
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}

          <StyledInput
            type="password"
            placeholder={t("Confirm Password")}
            {...register("confirmPassword", {
              required: t("Please confirm your password"),
              validate: (value) =>
                value === password || t("Passwords do not match"),
            })}
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </InputsWrapper>

        <Row>
          <OutlinedButton type="button" onClick={() => navigate("/signin")}>
            {t("Sign In")}
          </OutlinedButton>

          <SubmitBtn
            type="submit"
            disabled={isSubmitting}
            aria-label="submit signup"
          >
            <ArrowRightIcon />
          </SubmitBtn>
        </Row>
      </Box>
    </Container>
  );
}

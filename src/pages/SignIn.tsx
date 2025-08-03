import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

type SignInForm = {
  username: string;
  password: string;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: transparent;
`;

const Box = styled.form`
  background-color: background-color: #FAFAFA;;
  padding: 2rem;
  border-radius: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  text-align: left;
  color: #222;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.2s;

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
  border: 1px solid transparent;
  color: #222;
  font-size: 0.9rem;
  padding: 0.5rem 0.9rem;
  border-radius: 50%;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background-color: #f0f0f0;
    color: #000;
  }
`;

const SubmitBtn = styled.button`
  background-color: #1e1e2f;
  border: none;
  border-radius: 50%;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    stroke: white;
  }

  &:hover {
    background-color: #2b2b44;
  }
`;

export default function SignIn() {
  const { t } = useTranslation();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<SignInForm>();

  const onSubmit = () => {
    login();
    navigate("/");
  };

  return (
    <Container>
      <Box onSubmit={handleSubmit(onSubmit)}>
        <Title>{t("signIn")}</Title>

        <StyledInput
          placeholder={t("username")}
          {...register("username", { required: true })}
        />
        <StyledInput
          placeholder={t("password")}
          type="password"
          {...register("password", { required: true })}
        />

        <Row>
          <SignUpBtn type="button" onClick={() => navigate("/signup")}>
            {t("signUp")}
          </SignUpBtn>

          <SubmitBtn type="submit">
            {/* Replace this with your actual SVG */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 5L19 12L12 19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </SubmitBtn>
        </Row>
      </Box>
    </Container>
  );
}

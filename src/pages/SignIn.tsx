import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Sign In</h1>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSignup = () => {
    login();
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Sign Up</h1>
      <button onClick={handleSignup}>Register</button>
    </div>
  );
}

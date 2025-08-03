import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Attributes from "./pages/Attributes";
import Products from "./pages/Products";

function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        {!isLoggedIn && (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/signin" />} />
          </>
        )}

        {/* Private routes */}
        {isLoggedIn && (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attributes" element={<Attributes />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

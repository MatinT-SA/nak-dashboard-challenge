/** @jsxImportSource @emotion/react */
import { Global } from "@emotion/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import globalStyles from "./styles/global";

import Attributes from "./pages/Attributes";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useAuthStore } from "./store/authStore";
import Layout from "./layout/Layout";
import { NetworkMonitor } from "./components/NetworkMonitor";

function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <>
      <Global styles={globalStyles} />
      <NetworkMonitor />

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
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/attributes" element={<Attributes />} />
              <Route path="/products" element={<Products />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

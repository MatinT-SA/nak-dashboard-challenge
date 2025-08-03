import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import Sidebar from "../components/Sidebar";

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background: linear-gradient(
    to bottom,
    var(--color-background-light-1),
    var(--color-background-light-2)
  );
`;

const Layout = () => {
  return (
    <LayoutWrapper>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout;

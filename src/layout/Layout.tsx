import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: #1e1e2f;
  color: #fff;
  padding: 1rem;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f9f9f9;
`;

const Layout = () => {
  return (
    <LayoutWrapper>
      <Sidebar>
        {/* Replace with nav links later */}
        <p>Sidebar</p>
      </Sidebar>
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import ProfileIcon from "../components/icons/ProfileIcon";

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: rgba(255, 255, 255, 0.4);
  color: black;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 0 40px 40px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
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
      <Sidebar>
        <ProfileIcon size={50} style={{ marginBottom: "1rem" }} />
        <p>Sidebar</p>
      </Sidebar>
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout;

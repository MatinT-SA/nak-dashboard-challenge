import styled from "@emotion/styled";
import ProfileIcon from "./icons/ProfileIcon";
import AttributesIcon from "./icons/AttributesIcon";
import ProductsIcon from "./icons/ProductsIcon";
import LogoutIcon from "./icons/LogoutIcon";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarWrapper = styled.aside`
  width: 250px;
  background-color: rgba(255, 255, 255, 0.4);
  color: black;
  padding: 1.5rem 1rem;
  border: 1px solid white;
  border-radius: 0 40px 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;

const Name = styled.p`
  font-weight: 600;
  margin-top: 1.5rem;
`;

const Nav = styled.nav`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  opacity: 40%;
`;

const NavItem = styled.button<{ active?: boolean }>`
  background: ${(props) => (props.active ? "rgba(0, 0, 0, 0.2)" : "none")};
  border: none;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 500;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;

  :hover {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
`;

const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  const firstName = useAuthStore((state) => state.firstName);
  const lastName = useAuthStore((state) => state.lastName);
  const username = useAuthStore((state) => state.username);

  return (
    <SidebarWrapper>
      <div>
        <TopSection>
          <ProfileIcon size={50} />
          <Name>
            {firstName || lastName
              ? `${firstName ?? ""} ${lastName ?? ""}`.trim()
              : username || "User"}
          </Name>
        </TopSection>

        <Nav>
          <NavItem
            active={currentPath === "/attributes"}
            onClick={() => navigate("/attributes")}
          >
            <AttributesIcon style={{ marginRight: "0.5rem" }} />
            Attributes
          </NavItem>

          <NavItem
            active={currentPath === "/products"}
            onClick={() => navigate("/products")}
          >
            <ProductsIcon style={{ marginRight: "0.5rem" }} />
            Products
          </NavItem>
        </Nav>
      </div>

      <LogoutButton onClick={() => logout()}>
        <LogoutIcon style={{ marginRight: "0.5rem" }} />
        Logout
      </LogoutButton>
    </SidebarWrapper>
  );
};

export default Sidebar;

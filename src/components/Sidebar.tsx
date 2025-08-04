import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import ProfileIcon from "./icons/ProfileIcon";
import AttributesIcon from "./icons/AttributesIcon";
import ProductsIcon from "./icons/ProductsIcon";
import LogoutIcon from "./icons/LogoutIcon";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

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

const NavItem = styled.button`
  background: none;
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

  :hover {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
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
  const { t } = useTranslation();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <SidebarWrapper>
      <div>
        <TopSection>
          <ProfileIcon size={50} />
          <Name>Parnia Zandieh</Name>
        </TopSection>

        <Nav>
          <NavItem onClick={() => navigate("/skus")}>
            <ProductsIcon style={{ marginRight: "0.5rem" }} />
            SKUs
          </NavItem>
          <NavItem onClick={() => navigate("/attributes")}>
            <AttributesIcon style={{ marginRight: "0.5rem" }} />
            {t('navigation.attributes')}
          </NavItem>
          <NavItem onClick={() => navigate("/products")}>
            <ProductsIcon style={{ marginRight: "0.5rem" }} />
            {t('navigation.products')}
          </NavItem>
        </Nav>
      </div>

      <LogoutButton onClick={() => logout()}>
        <LogoutIcon style={{ marginRight: "0.5rem" }} />
        {t('navigation.logout')}
      </LogoutButton>
    </SidebarWrapper>
  );
};

export default Sidebar;

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "../components/Button";
import DynamicForm from "../components/DynamicForm";
import { PlusIcon } from "../components/icons/PlusIcon";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../components/Table";
import { useAttributesStore } from "../store/attributesStore";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  padding: 2rem 2rem 0;
  border-radius: 7px;
  color: #000433;
  max-width: 1288px;
  margin: 3rem 2rem 0rem;
  height: 80vh;
`;

const Content = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 800;
  margin: 0;
  color: black;
`;

const BottomBar = styled.div`
  background: transparent;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  box-shadow: none;
  z-index: 10;
`;

export default function Attributes() {
  const { t } = useTranslation();
  const { attributes, isLoading, fetchAttributes } = useAttributesStore();

  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    fetchAttributes();
  }, []);

  const onCancel = () => {
    setIsFormActive(false);
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>{t("pages.attributes.title")}</Title>
        </div>
        {!isFormActive && (
          <PrimaryButton onClick={() => setIsFormActive(true)}>
            {t("pages.attributes.addAttribute")}
            <PlusIcon style={{ marginLeft: 14, verticalAlign: "middle" }} />
          </PrimaryButton>
        )}
      </Header>

      {!isFormActive && (
        <Table>
          <TableHeader>
            <TableHeaderCell width="40px" align="center">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </TableHeaderCell>
            <TableHeaderCell>{t("pages.attributes.name")}</TableHeaderCell>
            <TableHeaderCell>{t("pages.attributes.values")}</TableHeaderCell>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell align="center" style={{ gridColumn: "1 / -1" }}>
                  Loading...
                </TableCell>
              </TableRow>
            ) : attributes.length === 0 ? (
              <TableRow>
                <TableCell
                  align="center"
                  style={{ gridColumn: "1 / -1", padding: "2rem" }}
                >
                  {t("pages.attributes.noAttributes")}
                </TableCell>
              </TableRow>
            ) : (
              attributes.map((attribute, index) => (
                <TableRow key={attribute.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>{attribute.name}</TableCell>
                  <TableCell>{attribute.values?.join(", ")}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {isFormActive && (
        <form
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
          onSubmit={(e) => e.preventDefault()} // prevent default submit
        >
          <Content>
            {/* Removed onSave prop here */}
            <DynamicForm />
          </Content>
          <BottomBar>
            <PrimaryButton
              type="button"
              onClick={onCancel}
              style={{
                backgroundColor: "#ccc",
                color: "#000",
                flex: 1,
                marginRight: "1rem",
                minWidth: "140px",
              }}
            >
              {t("cancel")}
            </PrimaryButton>
          </BottomBar>
        </form>
      )}
    </Container>
  );
}

import styled from "@emotion/styled";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import type { Attribute } from "../store/attributesStore";
import { useAttributesStore } from "../store/attributesStore";

const Container = styled.div`
  background-color: transparent;
  padding: 2rem;
  border-radius: 7px;
  color: #000433;
  max-width: 1288px;
  margin: 3rem 2rem;
  height: auto;
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
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 1288px;
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

interface AttributeFormData {
  name: string;
  type: "text" | "number" | "select" | "boolean";
  values?: string[];
}

export default function Attributes() {
  const { t } = useTranslation();
  const { attributes, addAttribute, updateAttribute, deleteAttribute } =
    useAttributesStore();

  const [isFormActive, setIsFormActive] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AttributeFormData>();

  const onSubmit = (data: AttributeFormData) => {
    addAttribute(data);
    setIsFormActive(false);
    reset();
  };

  const onCancel = () => {
    setIsFormActive(false);
    reset();
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
            {attributes.length === 0 ? (
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
                  <TableCell>
                    {attribute.type.charAt(0).toUpperCase() +
                      attribute.type.slice(1)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {isFormActive && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <DynamicForm register={register} errors={errors} />
          <BottomBar>
            <PrimaryButton
              type="button"
              onClick={onCancel}
              style={{ backgroundColor: "#ccc", color: "#000" }}
            >
              {t("cancel")}
            </PrimaryButton>
            <PrimaryButton type="submit">{t("save")}</PrimaryButton>
          </BottomBar>
        </form>
      )}
    </Container>
  );
}

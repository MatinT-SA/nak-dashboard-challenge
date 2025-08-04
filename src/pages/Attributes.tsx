import { useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAttributesStore } from "../store/attributesStore";
import type { Attribute } from "../store/attributesStore";
import { Modal } from "../components/Modal";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "../components/Table";
import { Button, PrimaryButton, DangerButton } from "../components/Button";
import { Select } from "../components/Select";
import {
  StyledInput,
  InputsWrapper,
  ErrorMessage,
} from "../components/FormElements";

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

const ActionsCell = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`;

const ValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ValueRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const RemoveValueButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: #c82333;
  }
`;

const AddValueButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 14px;
  margin-top: 0.5rem;

  &:hover {
    background: #218838;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(
    null
  );
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [values, setValues] = useState<string[]>([""]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AttributeFormData>();
  const selectedType = watch("type");

  const openModal = (attribute?: Attribute) => {
    if (attribute) {
      setEditingAttribute(attribute);
      setValue("name", attribute.name);
      setValue("type", attribute.type);
      setValues(attribute.values || [""]);
    } else {
      setEditingAttribute(null);
      reset();
      setValues([""]);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAttribute(null);
    reset();
    setValues([""]);
  };

  const onSubmit = (data: AttributeFormData) => {
    const attributeData = {
      ...data,
      values:
        selectedType === "select" ? values.filter((v) => v.trim()) : undefined,
    };

    if (editingAttribute) {
      updateAttribute(editingAttribute.id, attributeData);
    } else {
      addAttribute(attributeData);
    }
    closeModal();
  };

  const handleDeleteConfirm = (id: string) => {
    deleteAttribute(id);
    setDeleteConfirmId(null);
  };

  const addValue = () => {
    setValues([...values, ""]);
  };

  const removeValue = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  const updateValue = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const typeOptions = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "select", label: "Select" },
    { value: "boolean", label: "Boolean" },
  ];

  return (
    <Container>
      <Header>
        <div>
          <Title>{t("pages.attributes.title")}</Title>
        </div>
        <PrimaryButton onClick={() => openModal()}>
          {t("pages.attributes.addAttribute")}
        </PrimaryButton>
      </Header>

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
                {/* Number column */}
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

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          editingAttribute
            ? t("pages.attributes.editAttribute")
            : t("pages.attributes.addAttribute")
        }
        maxWidth="600px"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputsWrapper>
            <FormGroup>
              <Label>{t("pages.attributes.name")}</Label>
              <StyledInput
                {...register("name", { required: t("forms.required") })}
                placeholder={t("pages.attributes.name")}
              />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>{t("pages.attributes.type")}</Label>
              <Select
                {...register("type", { required: t("forms.required") })}
                options={typeOptions}
                placeholder={t("pages.attributes.type")}
              />
              {errors.type && (
                <ErrorMessage>{errors.type.message}</ErrorMessage>
              )}
            </FormGroup>

            {selectedType === "select" && (
              <FormGroup>
                <Label>{t("pages.attributes.values")}</Label>
                <ValuesContainer>
                  {values.map((value, index) => (
                    <ValueRow key={index}>
                      <StyledInput
                        value={value}
                        onChange={(e) => updateValue(index, e.target.value)}
                        placeholder={`Value ${index + 1}`}
                      />
                      {values.length > 1 && (
                        <RemoveValueButton
                          type="button"
                          onClick={() => removeValue(index)}
                        >
                          ✕
                        </RemoveValueButton>
                      )}
                    </ValueRow>
                  ))}
                  <AddValueButton type="button" onClick={addValue}>
                    + Add Value
                  </AddValueButton>
                </ValuesContainer>
              </FormGroup>
            )}
          </InputsWrapper>

          <ModalActions>
            <Button type="button" onClick={closeModal}>
              {t("common.cancel")}
            </Button>
            <PrimaryButton type="submit">
              {editingAttribute
                ? t("pages.attributes.update")
                : t("pages.attributes.create")}
            </PrimaryButton>
          </ModalActions>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title={t("pages.attributes.deleteAttribute")}
      >
        <p>{t("pages.attributes.deleteConfirmation")}</p>
        <ModalActions>
          <Button onClick={() => setDeleteConfirmId(null)}>
            {t("common.cancel")}
          </Button>
          <DangerButton
            onClick={() =>
              deleteConfirmId && handleDeleteConfirm(deleteConfirmId)
            }
          >
            {t("pages.attributes.confirm")}
          </DangerButton>
        </ModalActions>
      </Modal>
    </Container>
  );
}

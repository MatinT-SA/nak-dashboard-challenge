import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import styled from "@emotion/styled";
import { PlusIcon } from "./icons/PlusIcon";

import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";

type Field = {
  name: string;
  value: string;
};

type DynamicFormProps = {
  onCancel: () => void;
  onSave: (fields: Field[]) => void;

  register: UseFormRegister<Field>;
  control: Control<Field>;
  errors: FieldErrors<Field>;
};

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const FloatingLabel = styled.label`
  position: absolute;
  top: -10px;
  left: 12px;
  background: white;
  padding: 0 6px;
  font-size: 0.8rem;
  color: #666;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  border-radius: 40px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &::placeholder {
    color: transparent;
  }
`;

const PlusButton = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  flex-shrink: 0;

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const CancelButton = styled.button`
  background-color: #eee;
  border: none;
  padding: 10px 30px;
  border-radius: 40px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #ccc;
  }
`;

const SaveButton = styled.button`
  background-color: #007bff;
  border: none;
  padding: 10px 30px;
  border-radius: 40px;
  color: white;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #0056b3;
  }
`;

const DynamicForm: React.FC<DynamicFormProps> = ({
  onCancel,
  onSave,
  register,
  control,
  errors,
}) => {
  const [fields, setFields] = useState<Field[]>([{ name: "", value: "" }]);

  const addField = () => {
    setFields([...fields, { name: "", value: "" }]);
  };

  const handleChange = (
    index: number,
    key: keyof Field,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newFields = [...fields];
    newFields[index][key] = e.target.value;
    setFields(newFields);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(fields);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field, i) => (
        <Row key={i}>
          <InputWrapper>
            <FloatingLabel htmlFor={`name-${i}`}>Name</FloatingLabel>
            <Input
              id={`name-${i}`}
              type="text"
              value={field.name}
              onChange={(e) => handleChange(i, "name", e)}
              placeholder=" "
            />
          </InputWrapper>

          <InputWrapper>
            <FloatingLabel htmlFor={`value-${i}`}>Value</FloatingLabel>
            <Input
              id={`value-${i}`}
              type="text"
              value={field.value}
              onChange={(e) => handleChange(i, "value", e)}
              placeholder=" "
            />
          </InputWrapper>

          {i === fields.length - 1 && (
            <PlusButton
              type="button"
              aria-label="Add new field"
              onClick={addField}
            >
              <PlusIcon />
            </PlusButton>
          )}
        </Row>
      ))}

      <ButtonsRow>
        <CancelButton type="button" onClick={onCancel}>
          Cancel
        </CancelButton>
        <SaveButton type="submit">Save</SaveButton>
      </ButtonsRow>
    </Form>
  );
};

export default DynamicForm;

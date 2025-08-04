import styled from "@emotion/styled";
import type { ChangeEvent, FormEvent } from "react";
import React, { useState } from "react";
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
  max-width: 1000px;
  margin-left: 0;
  margin-right: auto;
  padding: 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 1.2rem;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const FloatingLabel = styled.label`
  position: absolute;
  top: -1rem;
  left: 6rem;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 40px;
  padding: 0.2rem 1rem;
  font-size: 20px;
  font-weight: 600;
  color: #666;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 40px;
  border: 2px solid #00000066;
  font-size: 1rem;
  background-color: #ffffff66;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &::placeholder {
    color: transparent;
  }
`;

const PlusButton = styled.button`
  background-color: rgba(0, 0, 0, 0.02);
  color: black;
  border: 2px solid black;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
  // Initially one full row: name & value empty
  const [fields, setFields] = useState<Field[]>([{ name: "", value: "" }]);

  const addField = () => {
    const updated = [...fields];

    // Check if last field is partial: name empty, value filled or empty?
    const lastField = updated[updated.length - 1];
    const isPartial = lastField.name === "" && lastField.value !== "";

    if (isPartial) {
      // Expand partial row to full row (show name & value)
      updated[updated.length - 1] = { name: "", value: lastField.value };
      // Add new partial row (only value field)
      updated.push({ name: "", value: "" });
    } else {
      // Add partial row if last is full row
      updated.push({ name: "", value: "" });
    }

    setFields(updated);
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
    // Filter out partial rows with empty name and empty value (optional)
    const filtered = fields.filter((f) => !(f.name === "" && f.value === ""));
    onSave(filtered);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field, i) => {
        const isFirstRow = i === 0;
        const isLastRow = i === fields.length - 1;
        const isPartial = field.name === "" && field.value !== "";

        return (
          <Row key={i}>
            {/* Show name input only if not partial */}
            {!isPartial && (
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
            )}

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

            {/* Show plus button for the second row (index 1) and subsequent rows */}
            {i === 1 && (
              <PlusButton
                type="button"
                aria-label="Add new field"
                onClick={addField}
              >
                <PlusIcon />
              </PlusButton>
            )}
          </Row>
        );
      })}
    </Form>
  );
};

export default DynamicForm;
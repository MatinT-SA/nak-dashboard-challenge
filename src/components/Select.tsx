import styled from '@emotion/styled';
import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const StyledSelect = styled.select`
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 40px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.02);
  color: black;
  transition: border-color 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 3rem;
  
  &:focus {
    border-color: #1e1e2f;
    outline: none;
  }
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, ...props }, ref) => (
    <StyledSelect ref={ref} {...props}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  )
);
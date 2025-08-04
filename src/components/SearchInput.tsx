/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { forwardRef } from 'react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-dark);
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchIcon = styled.svg`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #9ca3af;
`;

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <SearchWrapper className={className}>
        {label && <Label>{label}</Label>}
        <InputWrapper>
          <SearchIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="21 21-4.35-4.35" />
          </SearchIcon>
          <StyledInput ref={ref} type="search" {...props} />
        </InputWrapper>
      </SearchWrapper>
    );
  }
);

SearchInput.displayName = 'SearchInput';
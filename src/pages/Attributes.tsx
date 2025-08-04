/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAttributesStore } from '../store/attributesStore';
import { SearchInput } from '../components/SearchInput';
import { Select } from '../components/Select';

// Main container
const AttributesContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 2rem;
`;

// Filters section
const FiltersSection = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.8);
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  ${props => props.variant === 'primary' ? `
    background: #3b82f6;
    color: white;
    
    &:hover {
      background: #2563eb;
    }
  ` : `
    background: white;
    color: #374151;
    border: 1px solid #d1d5db;
    
    &:hover {
      background: #f9fafb;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Attributes list section
const AttributesSection = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.8);
`;

const AttributesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-dark);
`;

const AttributesTable = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background: #f8fafc;
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
  
  &:hover {
    background: #f9fafb;
  }
`;

const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
`;

const TableCell = styled.td`
  padding: 12px 16px;
  color: #374151;
  font-size: 14px;
`;

const TypeBadge = styled.span<{ type: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  
  ${props => {
    switch (props.type) {
      case 'text':
        return 'background: #dbeafe; color: #1e40af;';
      case 'number':
        return 'background: #dcfce7; color: #166534;';
      case 'boolean':
        return 'background: #fef3c7; color: #92400e;';
      case 'date':
        return 'background: #fce7f3; color: #be185d;';
      case 'dropdown':
        return 'background: #f3e8ff; color: #7c2d12;';
      default:
        return 'background: #f3f4f6; color: #374151;';
    }
  }}
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 14px;
  color: #6b7280;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
`;

const RequiredBadge = styled.span`
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  background: #fee2e2;
  color: #991b1b;
  margin-left: 8px;
`;

interface AttributeFilters {
  search: string;
  type: string;
  required: string;
}

export default function Attributes() {
  const { t } = useTranslation();
  const {
    attributes,
    types,
    loading,
    fetchAttributes,
    fetchTypes,
    setFilters,
    resetFilters,
  } = useAttributesStore();

  const { register, handleSubmit, reset, watch } = useForm<AttributeFilters>({
    defaultValues: {
      search: '',
      type: '',
      required: '',
    },
  });

  // Watch form values for real-time filtering
  const watchedValues = watch();

  useEffect(() => {
    fetchAttributes();
    fetchTypes();
  }, [fetchAttributes, fetchTypes]);

  // Apply filters when form values change
  useEffect(() => {
    const delayedFilter = setTimeout(() => {
      setFilters({
        search: watchedValues.search,
        type: watchedValues.type,
      });
    }, 300); // Debounce search

    return () => clearTimeout(delayedFilter);
  }, [watchedValues, setFilters]);

  const handleResetFilters = () => {
    reset();
    resetFilters();
  };

  const typeOptions = [
    { value: '', label: t('attributes.allTypes') },
    ...types.map(type => ({ value: type, label: t(`attributes.${type}`) })),
  ];

  const requiredOptions = [
    { value: '', label: 'All Attributes' },
    { value: 'true', label: 'Required Only' },
    { value: 'false', label: 'Optional Only' },
  ];

  // Filter attributes locally based on the required filter since it's not in the store
  const filteredAttributes = attributes.filter(attr => {
    if (watchedValues.required === '') return true;
    const isRequired = attr.required;
    return watchedValues.required === 'true' ? isRequired : !isRequired;
  });

  return (
    <AttributesContainer>
      <PageTitle>{t('attributes.title')}</PageTitle>
      
      {/* Filters Section - 3 Selectors as requested */}
      <FiltersSection>
        <form onSubmit={handleSubmit(() => {})}>
          <FiltersGrid>
            <SearchInput
              {...register('search')}
              placeholder={t('attributes.searchAttributes')}
            />
            
            <Select
              {...register('type')}
              options={typeOptions}
              label={t('attributes.filterByType')}
            />
            
            <Select
              {...register('required')}
              options={requiredOptions}
              label="Required Status"
            />
          </FiltersGrid>
          
          <FilterActions>
            <ActionButton type="button" onClick={handleResetFilters}>
              {t('common.reset')}
            </ActionButton>
          </FilterActions>
        </form>
      </FiltersSection>

      {/* Attributes List */}
      <AttributesSection>
        <AttributesHeader>
          <SectionTitle>{t('attributes.attributeList')}</SectionTitle>
        </AttributesHeader>

        {loading ? (
          <LoadingSpinner>{t('common.loading')}</LoadingSpinner>
        ) : filteredAttributes.length === 0 ? (
          <EmptyState>
            <h3>{t('common.noResults')}</h3>
            <p>Try adjusting your filters to see more attributes.</p>
          </EmptyState>
        ) : (
          <AttributesTable>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>{t('attributes.name')}</TableHeaderCell>
                  <TableHeaderCell>{t('attributes.type')}</TableHeaderCell>
                  <TableHeaderCell>{t('attributes.value')}</TableHeaderCell>
                  <TableHeaderCell>Required</TableHeaderCell>
                  <TableHeaderCell>Created</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <tbody>
                {filteredAttributes.map((attribute) => (
                  <TableRow key={attribute.id}>
                    <TableCell>
                      <strong>{attribute.name}</strong>
                      {attribute.required && <RequiredBadge>Required</RequiredBadge>}
                    </TableCell>
                    <TableCell>
                      <TypeBadge type={attribute.type}>
                        {t(`attributes.${attribute.type}`)}
                      </TypeBadge>
                    </TableCell>
                    <TableCell>
                      {attribute.type === 'dropdown' && attribute.options ? (
                        <span>{attribute.options.join(', ')}</span>
                      ) : attribute.value ? (
                        <span>{String(attribute.value)}</span>
                      ) : (
                        <span style={{ color: '#9ca3af' }}>—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {attribute.required ? (
                        <span style={{ color: '#dc2626' }}>Yes</span>
                      ) : (
                        <span style={{ color: '#6b7280' }}>No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(attribute.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </AttributesTable>
        )}
      </AttributesSection>
    </AttributesContainer>
  );
}

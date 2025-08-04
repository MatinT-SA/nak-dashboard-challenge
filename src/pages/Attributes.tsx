/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAttributesStore } from '../store/attributesStore';
import { SearchInput } from '../components/SearchInput';

// Main container
const AttributesContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 2.5rem;
`;

// Filters section
const FiltersSection = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
`;

const FiltersTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
  align-items: end;
`;



const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
  ` : `
    background: white;
    color: #4a5568;
    border: 2px solid #e2e8f0;
    
    &:hover {
      background: #f7fafc;
      border-color: #cbd5e0;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Attributes list section
const AttributesSection = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
`;

const AttributesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #2d3748;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

const AttributesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const AttributeCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const AttributeName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const ValuesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ValueBadge = styled.span`
  background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%);
  color: #234e52;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #81e6d9;
`;

const AttributeId = styled.div`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  background: #f7fafc;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  color: #718096;
  margin-top: 1rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  font-size: 16px;
  color: #718096;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #718096;
  
  h3 {
    margin-bottom: 1rem;
    color: #4a5568;
  }
`;

interface AttributeFilters {
  search: string;
}

export default function Attributes() {
  const { t } = useTranslation();
  const {
    attributes,
    loading,
    fetchAttributes,
    setFilters,
    resetFilters,
    filters,
  } = useAttributesStore();

  const { register, handleSubmit, reset, watch } = useForm<AttributeFilters>({
    defaultValues: {
      search: '',
    },
  });

  // Watch form values for real-time filtering
  const watchedValues = watch();

  useEffect(() => {
    fetchAttributes();
  }, [fetchAttributes]);

  // Apply filters when form values change
  useEffect(() => {
    const delayedFilter = setTimeout(() => {
      setFilters({
        search: watchedValues.search,
      });
    }, 300); // Debounce search

    return () => clearTimeout(delayedFilter);
  }, [watchedValues, setFilters]);

  const handleResetFilters = () => {
    reset();
    resetFilters();
  };

  // Filter attributes locally based on the search filter
  const filteredAttributes = attributes.filter(attr => {
    if (!filters.search) return true;
    const searchLower = filters.search.toLowerCase();
    return attr.name.toLowerCase().includes(searchLower) ||
           attr.values.some(value => value.toLowerCase().includes(searchLower));
  });

  return (
    <AttributesContainer>
      <PageTitle>{t('attributes.title')}</PageTitle>
      
      {/* Filters Section - Simplified for Attributes API */}
      <FiltersSection>
        <FiltersTitle>Search Attributes</FiltersTitle>
        <form onSubmit={handleSubmit(() => {})}>
          <FiltersGrid>
            <SearchInput
              {...register('search')}
              placeholder={t('attributes.searchAttributes')}
            />
            
            <ActionButton type="button" onClick={handleResetFilters}>
              {t('common.reset')}
            </ActionButton>
          </FiltersGrid>
        </form>
      </FiltersSection>

      {/* Attributes List */}
      <AttributesSection>
        <AttributesHeader>
          <SectionTitle>{t('attributes.attributeList')} ({filteredAttributes.length})</SectionTitle>
          <AddButton>+ Add New Attribute</AddButton>
        </AttributesHeader>

        {loading ? (
          <LoadingSpinner>{t('common.loading')}</LoadingSpinner>
        ) : filteredAttributes.length === 0 ? (
          <EmptyState>
            <h3>{t('common.noResults')}</h3>
            <p>Try adjusting your search or add your first attribute.</p>
          </EmptyState>
        ) : (
          <AttributesGrid>
            {filteredAttributes.map((attribute) => (
              <AttributeCard key={attribute.id}>
                <AttributeName>{attribute.name}</AttributeName>
                <ValuesContainer>
                  {attribute.values.map((value, index) => (
                    <ValueBadge key={index}>{value}</ValueBadge>
                  ))}
                </ValuesContainer>
                <AttributeId>ID: {attribute.id}</AttributeId>
              </AttributeCard>
            ))}
          </AttributesGrid>
        )}
      </AttributesSection>
    </AttributesContainer>
  );
}

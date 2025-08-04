/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useProductsStore } from '../store/productsStore';
import { SearchInput } from '../components/SearchInput';

// Main container
const ProductsContainer = styled.div`
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

// Products list section
const ProductsSection = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
`;

const ProductsHeader = styled.div`
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

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
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

const ProductName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const SKUsContainer = styled.div`
  margin-bottom: 1rem;
`;

const SKUsLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const SKUsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SKUBadge = styled.span`
  background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%);
  color: #234e52;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid #81e6d9;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
`;

const AttributesContainer = styled.div`
  margin-bottom: 1rem;
`;

const AttributesLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const AttributesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const AttributeItem = styled.div`
  font-size: 12px;
  color: #4a5568;
`;

const ProductId = styled.div`
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

interface ProductFilters {
  search: string;
}

export default function Products() {
  const { t } = useTranslation();
  const {
    products,
    loading,
    fetchProducts,
    setFilters,
    resetFilters,
    filters,
  } = useProductsStore();

  const { register, handleSubmit, reset, watch } = useForm<ProductFilters>({
    defaultValues: {
      search: '',
    },
  });

  // Watch form values for real-time filtering
  const watchedValues = watch();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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

  // Filter products locally based on search
  const filteredProducts = products.filter(product => {
    if (!filters.search) return true;
    const searchLower = filters.search.toLowerCase();
    return product.name.toLowerCase().includes(searchLower) ||
           product.id.toLowerCase().includes(searchLower) ||
           product.skusIds.some(skuId => skuId.toLowerCase().includes(searchLower));
  });

  return (
    <ProductsContainer>
      <PageTitle>{t('products.title')}</PageTitle>
      
      {/* Filters Section */}
      <FiltersSection>
        <FiltersTitle>Search Products</FiltersTitle>
        <form onSubmit={handleSubmit(() => {})}>
          <FiltersGrid>
            <SearchInput
              {...register('search')}
              placeholder={t('products.searchProducts')}
            />
            
            <ActionButton type="button" onClick={handleResetFilters}>
              {t('common.reset')}
            </ActionButton>
          </FiltersGrid>
        </form>
      </FiltersSection>

      {/* Products List */}
      <ProductsSection>
        <ProductsHeader>
          <SectionTitle>{t('products.productList')} ({filteredProducts.length})</SectionTitle>
          <AddButton>+ Add New Product</AddButton>
        </ProductsHeader>

        {loading ? (
          <LoadingSpinner>{t('common.loading')}</LoadingSpinner>
        ) : filteredProducts.length === 0 ? (
          <EmptyState>
            <h3>{t('common.noResults')}</h3>
            <p>Try adjusting your search or add your first product.</p>
          </EmptyState>
        ) : (
          <ProductsGrid>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id}>
                <ProductName>{product.name}</ProductName>
                
                {product.skusIds.length > 0 && (
                  <SKUsContainer>
                    <SKUsLabel>SKUs ({product.skusIds.length})</SKUsLabel>
                    <SKUsList>
                      {product.skusIds.map((skuId, index) => (
                        <SKUBadge key={index}>{skuId}</SKUBadge>
                      ))}
                    </SKUsList>
                  </SKUsContainer>
                )}
                
                {product.attributes.length > 0 && (
                  <AttributesContainer>
                    <AttributesLabel>Attributes ({product.attributes.length})</AttributesLabel>
                    <AttributesList>
                      {product.attributes.map((attr, index) => (
                        <AttributeItem key={index}>
                          <strong>{attr.name}:</strong> {attr.values.join(', ')}
                        </AttributeItem>
                      ))}
                    </AttributesList>
                  </AttributesContainer>
                )}
                
                <ProductId>ID: {product.id}</ProductId>
              </ProductCard>
            ))}
          </ProductsGrid>
        )}
      </ProductsSection>
    </ProductsContainer>
  );
}

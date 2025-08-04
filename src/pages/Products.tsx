/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useProductsStore } from '../store/productsStore';
import { SearchInput } from '../components/SearchInput';
import { Select } from '../components/Select';

// Main container
const ProductsContainer = styled.div`
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

// Products list section
const ProductsSection = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.8);
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-dark);
`;

const ProductsTable = styled.div`
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

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  
  ${props => {
    switch (props.status) {
      case 'active':
        return 'background: #dcfce7; color: #166534;';
      case 'inactive':
        return 'background: #fef3c7; color: #92400e;';
      case 'out_of_stock':
        return 'background: #fee2e2; color: #991b1b;';
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

interface ProductFilters {
  search: string;
  category: string;
  brand: string;
  status: string;
  priceRange: string;
  stockLevel: string;
}

export default function Products() {
  const { t } = useTranslation();
  const {
    products,
    categories,
    brands,
    loading,
    fetchProducts,
    fetchCategories,
    fetchBrands,
    setFilters,
    resetFilters,
  } = useProductsStore();

  const { register, handleSubmit, reset, watch } = useForm<ProductFilters>({
    defaultValues: {
      search: '',
      category: '',
      brand: '',
      status: '',
      priceRange: '',
      stockLevel: '',
    },
  });

  // Watch form values for real-time filtering
  const watchedValues = watch();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, [fetchProducts, fetchCategories, fetchBrands]);

  // Apply filters when form values change
  useEffect(() => {
    const delayedFilter = setTimeout(() => {
      setFilters({
        search: watchedValues.search,
        category: watchedValues.category,
        brand: watchedValues.brand,
        status: watchedValues.status,
      });
    }, 300); // Debounce search

    return () => clearTimeout(delayedFilter);
  }, [watchedValues, setFilters]);

  const handleResetFilters = () => {
    reset();
    resetFilters();
  };

  const categoryOptions = [
    { value: '', label: t('products.allCategories') },
    ...categories.map(cat => ({ value: cat, label: cat })),
  ];

  const brandOptions = [
    { value: '', label: t('products.allBrands') },
    ...brands.map(brand => ({ value: brand, label: brand })),
  ];

  const statusOptions = [
    { value: '', label: t('products.allStatuses') },
    { value: 'active', label: t('products.active') },
    { value: 'inactive', label: t('products.inactive') },
    { value: 'out_of_stock', label: t('products.outOfStock') },
  ];

  const priceRangeOptions = [
    { value: '', label: 'All Prices' },
    { value: '0-50', label: '$0 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-500', label: '$100 - $500' },
    { value: '500+', label: '$500+' },
  ];

  const stockLevelOptions = [
    { value: '', label: 'All Stock Levels' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock (< 10)' },
    { value: 'out-of-stock', label: 'Out of Stock' },
  ];

  return (
    <ProductsContainer>
      <PageTitle>{t('products.title')}</PageTitle>
      
      {/* Filters Section - 6 Selectors as requested */}
      <FiltersSection>
        <form onSubmit={handleSubmit(() => {})}>
          <FiltersGrid>
            <SearchInput
              {...register('search')}
              placeholder={t('products.searchProducts')}
            />
            
            <Select
              {...register('category')}
              options={categoryOptions}
              label={t('products.filterByCategory')}
            />
            
            <Select
              {...register('brand')}
              options={brandOptions}
              label={t('products.filterByBrand')}
            />
            
            <Select
              {...register('status')}
              options={statusOptions}
              label={t('products.filterByStatus')}
            />
            
            <Select
              {...register('priceRange')}
              options={priceRangeOptions}
              label="Price Range"
            />
            
            <Select
              {...register('stockLevel')}
              options={stockLevelOptions}
              label="Stock Level"
            />
          </FiltersGrid>
          
          <FilterActions>
            <ActionButton type="button" onClick={handleResetFilters}>
              {t('common.reset')}
            </ActionButton>
          </FilterActions>
        </form>
      </FiltersSection>

      {/* Products List - SKU List */}
      <ProductsSection>
        <ProductsHeader>
          <SectionTitle>{t('products.productList')}</SectionTitle>
        </ProductsHeader>

        {loading ? (
          <LoadingSpinner>{t('common.loading')}</LoadingSpinner>
        ) : products.length === 0 ? (
          <EmptyState>
            <h3>{t('common.noResults')}</h3>
            <p>Try adjusting your filters to see more products.</p>
          </EmptyState>
        ) : (
          <ProductsTable>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>{t('products.sku')}</TableHeaderCell>
                  <TableHeaderCell>{t('products.name')}</TableHeaderCell>
                  <TableHeaderCell>{t('products.category')}</TableHeaderCell>
                  <TableHeaderCell>{t('products.brand')}</TableHeaderCell>
                  <TableHeaderCell>{t('products.price')}</TableHeaderCell>
                  <TableHeaderCell>{t('products.stock')}</TableHeaderCell>
                  <TableHeaderCell>{t('products.status')}</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <tbody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <strong>{product.sku}</strong>
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <StatusBadge status={product.status}>
                        {t(`products.${product.status}`)}
                      </StatusBadge>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </ProductsTable>
        )}
      </ProductsSection>
    </ProductsContainer>
  );
}

/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import styled from '@emotion/styled';

import { useForm } from 'react-hook-form';
import { useSKUsStore } from '../store/skusStore';
import { SearchInput } from '../components/SearchInput';
import { Select } from '../components/Select';

// Main container matching Figma design
const SKUsContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: transparent;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 2.5rem;
  text-align: left;
`;

// Filters section - Figma style
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
  grid-template-columns: 2fr 1fr 1fr 1fr;
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
  min-width: 100px;
  
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

// SKUs list section matching Figma
const SKUsSection = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
`;

const SKUsHeader = styled.div`
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

const SKUsTable = styled.div`
  overflow-x: auto;
  border-radius: 16px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
  
  &:hover {
    background: rgba(102, 126, 234, 0.02);
  }
`;

const TableHeaderCell = styled.th`
  padding: 20px 24px;
  text-align: left;
  font-weight: 700;
  color: #2d3748;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableCell = styled.td`
  padding: 20px 24px;
  color: #4a5568;
  font-size: 14px;
  font-weight: 500;
`;

const SKUId = styled.span`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  background: #f7fafc;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  color: #2d3748;
  font-weight: 600;
`;

const ModelName = styled.span`
  font-weight: 600;
  color: #2d3748;
`;

const Price = styled.span`
  font-weight: 700;
  color: #38a169;
  font-size: 16px;
`;

const StockBadge = styled.span<{ stock: number }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  
  ${props => {
    if (props.stock === 0) {
      return 'background: #fed7d7; color: #c53030;';
    } else if (props.stock < 10) {
      return 'background: #fef3c7; color: #d69e2e;';
    } else {
      return 'background: #c6f6d5; color: #38a169;';
    }
  }}
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

interface SKUFilters {
  search: string;
  priceRange: string;
  stockLevel: string;
}

export default function SKUs() {
  const {
    skus,
    loading,
    fetchSKUs,
    setFilters,
    resetFilters,
    filters,
  } = useSKUsStore();

  const { register, handleSubmit, reset, watch } = useForm<SKUFilters>({
    defaultValues: {
      search: '',
      priceRange: '',
      stockLevel: '',
    },
  });

  // Watch form values for real-time filtering
  const watchedValues = watch();

  useEffect(() => {
    fetchSKUs();
  }, [fetchSKUs]);

  // Apply filters when form values change
  useEffect(() => {
    const delayedFilter = setTimeout(() => {
      setFilters({
        search: watchedValues.search,
        priceRange: watchedValues.priceRange,
        stockLevel: watchedValues.stockLevel,
      });
    }, 300); // Debounce search

    return () => clearTimeout(delayedFilter);
  }, [watchedValues, setFilters]);

  const handleResetFilters = () => {
    reset();
    resetFilters();
  };

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

  // Filter SKUs based on current filters
  const filteredSKUs = skus.filter(sku => {
    const matchesSearch = !filters.search || 
      sku.model.toLowerCase().includes(filters.search.toLowerCase()) ||
      sku.id.toLowerCase().includes(filters.search.toLowerCase());
    
    const price = parseFloat(sku.price);
    let matchesPriceRange = true;
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case '0-50':
          matchesPriceRange = price >= 0 && price <= 50;
          break;
        case '50-100':
          matchesPriceRange = price > 50 && price <= 100;
          break;
        case '100-500':
          matchesPriceRange = price > 100 && price <= 500;
          break;
        case '500+':
          matchesPriceRange = price > 500;
          break;
      }
    }
    
    const stock = parseInt(sku.numberInStock);
    let matchesStockLevel = true;
    if (filters.stockLevel) {
      switch (filters.stockLevel) {
        case 'in-stock':
          matchesStockLevel = stock > 0;
          break;
        case 'low-stock':
          matchesStockLevel = stock > 0 && stock < 10;
          break;
        case 'out-of-stock':
          matchesStockLevel = stock === 0;
          break;
      }
    }
    
    return matchesSearch && matchesPriceRange && matchesStockLevel;
  });

  return (
    <SKUsContainer>
      <PageTitle>SKU Management</PageTitle>
      
      {/* Filters Section */}
      <FiltersSection>
        <FiltersTitle>Search & Filter SKUs</FiltersTitle>
        <form onSubmit={handleSubmit(() => {})}>
          <FiltersGrid>
            <SearchInput
              {...register('search')}
              placeholder="Search SKUs by model or ID..."
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
            
            <ActionButton type="button" onClick={handleResetFilters}>
              Reset Filters
            </ActionButton>
          </FiltersGrid>
        </form>
      </FiltersSection>

      {/* SKUs List */}
      <SKUsSection>
        <SKUsHeader>
          <SectionTitle>SKU List ({filteredSKUs.length})</SectionTitle>
          <AddButton>+ Add New SKU</AddButton>
        </SKUsHeader>

        {loading ? (
          <LoadingSpinner>Loading SKUs...</LoadingSpinner>
        ) : filteredSKUs.length === 0 ? (
          <EmptyState>
            <h3>No SKUs found</h3>
            <p>Try adjusting your filters or add your first SKU.</p>
          </EmptyState>
        ) : (
          <SKUsTable>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>SKU ID</TableHeaderCell>
                  <TableHeaderCell>Model</TableHeaderCell>
                  <TableHeaderCell>Price</TableHeaderCell>
                  <TableHeaderCell>Stock</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <tbody>
                {filteredSKUs.map((sku) => {
                  const stock = parseInt(sku.numberInStock);
                  return (
                    <TableRow key={sku.id}>
                      <TableCell>
                        <SKUId>{sku.id}</SKUId>
                      </TableCell>
                      <TableCell>
                        <ModelName>{sku.model}</ModelName>
                      </TableCell>
                      <TableCell>
                        <Price>${parseFloat(sku.price).toFixed(2)}</Price>
                      </TableCell>
                      <TableCell>{stock} units</TableCell>
                      <TableCell>
                        <StockBadge stock={stock}>
                          {stock === 0 ? 'Out of Stock' : stock < 10 ? 'Low Stock' : 'In Stock'}
                        </StockBadge>
                      </TableCell>
                      <TableCell>
                        <ActionButton variant="secondary">Edit</ActionButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>
          </SKUsTable>
        )}
      </SKUsSection>
    </SKUsContainer>
  );
}
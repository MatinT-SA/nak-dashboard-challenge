import { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useProductsStore } from '../store/productsStore';
import type { Product } from '../store/productsStore';
import { useAttributesStore } from '../store/attributesStore';
import { Modal } from '../components/Modal';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHeaderCell } from '../components/Table';
import { Button, PrimaryButton, DangerButton } from '../components/Button';
import { Select } from '../components/Select';
import { StyledInput, InputsWrapper, ErrorMessage } from '../components/FormElements';

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
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

const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0.5rem 0 0 0;
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

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const StatusBadge = styled.span<{ status: 'active' | 'inactive' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  ${props => props.status === 'active'
    ? 'background: #d4edda; color: #155724;'
    : 'background: #f8d7da; color: #721c24;'
  }
`;

const PriceCell = styled.span`
  font-weight: 600;
  color: #28a745;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.02);
  color: black;
  transition: border-color 0.2s;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
  
  &:focus {
    border-color: #1e1e2f;
    outline: none;
  }
`;

const AttributesSection = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
`;

const AttributesTitle = styled.h4`
  margin: 0 0 1rem 0;
  color: #333;
`;

const AttributeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

interface ProductFormData {
  name: string;
  price: number;
  category: string;
  description: string;
  status: 'active' | 'inactive';
  attributes?: { [key: string]: any };
}

export default function Products() {
  const { t } = useTranslation();
  const { products, addProduct, updateProduct, deleteProduct } = useProductsStore();
  const { attributes } = useAttributesStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProductFormData>();

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setValue('name', product.name);
      setValue('price', product.price);
      setValue('category', product.category);
      setValue('description', product.description);
      setValue('status', product.status);
      // Set attribute values
      if (product.attributes) {
        attributes.forEach(attr => {
          if (product.attributes?.[attr.name]) {
            setValue(`attributes.${attr.name}` as any, product.attributes[attr.name]);
          }
        });
      }
    } else {
      setEditingProduct(null);
      reset();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    reset();
  };

  const onSubmit = (data: ProductFormData) => {
    const productData = {
      ...data,
      price: Number(data.price),
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    closeModal();
  };

  const handleDeleteConfirm = (id: string) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
  };

  const statusOptions = [
    { value: 'active', label: t('pages.products.active') },
    { value: 'inactive', label: t('pages.products.inactive') }
  ];

  const categoryOptions = [
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Footwear', label: 'Footwear' },
    { value: 'Accessories', label: 'Accessories' },
    { value: 'Home', label: 'Home' },
    { value: 'Sports', label: 'Sports' }
  ];

  const getAttributeOptions = (attributeId: string) => {
    const attr = attributes.find(a => a.id === attributeId);
    if (attr?.type === 'select' && attr.values) {
      return attr.values.map(value => ({ value, label: value }));
    }
    return [];
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('pages.products.title')}</Title>
          <Description>{t('pages.products.description')}</Description>
        </div>
        <PrimaryButton onClick={() => openModal()}>
          {t('pages.products.addProduct')}
        </PrimaryButton>
      </Header>

      <Table>
        <TableHeader>
          <TableHeaderCell>{t('pages.products.name')}</TableHeaderCell>
          <TableHeaderCell>{t('pages.products.price')}</TableHeaderCell>
          <TableHeaderCell>{t('pages.products.category')}</TableHeaderCell>
          <TableHeaderCell>{t('pages.products.status')}</TableHeaderCell>
          <TableHeaderCell width="150px" align="center">{t('pages.products.actions')}</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell align="center" style={{ gridColumn: '1 / -1', padding: '2rem' }}>
                {t('pages.products.noProducts')}
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <PriceCell>${product.price.toFixed(2)}</PriceCell>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <StatusBadge status={product.status}>
                    {t(`pages.products.${product.status}`)}
                  </StatusBadge>
                </TableCell>
                <TableCell align="center">
                  <ActionsCell>
                    <Button size="small" onClick={() => openModal(product)}>
                      {t('common.edit')}
                    </Button>
                    <DangerButton size="small" onClick={() => setDeleteConfirmId(product.id)}>
                      {t('common.delete')}
                    </DangerButton>
                  </ActionsCell>
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
        title={editingProduct ? t('pages.products.editProduct') : t('pages.products.addProduct')}
        maxWidth="700px"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputsWrapper>
            <FormGroup>
              <Label>{t('pages.products.name')}</Label>
              <StyledInput
                {...register('name', { required: t('forms.required') })}
                placeholder={t('pages.products.name')}
              />
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </FormGroup>

            <AttributeRow>
              <FormGroup>
                <Label>{t('pages.products.price')}</Label>
                <StyledInput
                  type="number"
                  step="0.01"
                  {...register('price', { 
                    required: t('forms.required'),
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                  placeholder={t('pages.products.price')}
                />
                {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>{t('pages.products.category')}</Label>
                <Select
                  {...register('category', { required: t('forms.required') })}
                  options={categoryOptions}
                  placeholder={t('pages.products.category')}
                />
                {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
              </FormGroup>
            </AttributeRow>

            <FormGroup>
              <Label>{t('pages.products.status')}</Label>
              <Select
                {...register('status', { required: t('forms.required') })}
                options={statusOptions}
                placeholder={t('pages.products.status')}
              />
              {errors.status && <ErrorMessage>{errors.status.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>{t('pages.products.description')}</Label>
              <TextArea
                {...register('description', { required: t('forms.required') })}
                placeholder={t('pages.products.description')}
              />
              {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </FormGroup>

            {attributes.length > 0 && (
              <AttributesSection>
                <AttributesTitle>Product Attributes</AttributesTitle>
                {attributes.map((attribute) => (
                  <FormGroup key={attribute.id}>
                    <Label>{attribute.name}</Label>
                    {attribute.type === 'select' && attribute.values ? (
                      <Select
                        {...register(`attributes.${attribute.name}` as any)}
                        options={getAttributeOptions(attribute.id)}
                        placeholder={`Select ${attribute.name}`}
                      />
                    ) : attribute.type === 'boolean' ? (
                      <Select
                        {...register(`attributes.${attribute.name}` as any)}
                        options={[
                          { value: 'true', label: 'Yes' },
                          { value: 'false', label: 'No' }
                        ]}
                        placeholder={`Select ${attribute.name}`}
                      />
                    ) : (
                      <StyledInput
                        type={attribute.type === 'number' ? 'number' : 'text'}
                        {...register(`attributes.${attribute.name}` as any)}
                        placeholder={attribute.name}
                      />
                    )}
                  </FormGroup>
                ))}
              </AttributesSection>
            )}
          </InputsWrapper>

          <ModalActions>
            <Button type="button" onClick={closeModal}>
              {t('common.cancel')}
            </Button>
            <PrimaryButton type="submit">
              {editingProduct ? t('pages.products.update') : t('pages.products.create')}
            </PrimaryButton>
          </ModalActions>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title={t('pages.products.deleteProduct')}
      >
        <p>{t('pages.products.deleteConfirmation')}</p>
        <ModalActions>
          <Button onClick={() => setDeleteConfirmId(null)}>
            {t('common.cancel')}
          </Button>
          <DangerButton onClick={() => deleteConfirmId && handleDeleteConfirm(deleteConfirmId)}>
            {t('pages.products.confirm')}
          </DangerButton>
        </ModalActions>
      </Modal>
    </Container>
  );
}

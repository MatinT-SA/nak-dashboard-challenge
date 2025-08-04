import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "../components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../components/Table";
import { useProductsStore } from "../store/productsStore";

const Container = styled.div`
  background-color: transparent;
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

interface ProductFormData {
  name: string;
  sku: string;
  price: number;
  category: string;
  status: "active" | "inactive";
  attributes?: { [key: string]: any };
}

export default function Products() {
  const { t } = useTranslation();
  const { products } = useProductsStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>();

  return (
    <Container>
      <Header>
        <div>
          <Title>{t("pages.products.title")}</Title>
        </div>
        <PrimaryButton>{t("pages.products.addProduct")}</PrimaryButton>
      </Header>

      <Table>
        <TableHeader>
          <TableHeaderCell width="40px" align="center">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </TableHeaderCell>
          <TableHeaderCell>{t("pages.products.name")}</TableHeaderCell>
          <TableHeaderCell>{t("pages.products.sku")}</TableHeaderCell>
        </TableHeader>

        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell
                align="center"
                style={{ gridColumn: "1 / -1", padding: "2rem" }}
              >
                {t("pages.products.noProducts")}
              </TableCell>
            </TableRow>
          ) : (
            products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Container>
  );
}

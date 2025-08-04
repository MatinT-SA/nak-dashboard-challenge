import styled from "@emotion/styled";
import type { ReactNode, CSSProperties } from "react";

interface TableProps {
  children: ReactNode;
}

interface TableHeaderProps {
  children: ReactNode;
}

interface TableRowProps {
  children: ReactNode;
  onClick?: () => void;
}

interface TableCellProps {
  children: ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
  style?: CSSProperties;
}

const TableWrapper = styled.div`
  background: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  margin-top: 1rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const StyledTableHeader = styled.thead`
  background: rgba(0, 0, 0, 0.02);
  font-size: 25px;
  font-weight: 700;
`;

const StyledTableRow = styled.tr<{ clickable?: boolean }>`
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.4);
  color: black;

  &:last-child {
    border-bottom: none;
  }

  ${(props) =>
    props.clickable &&
    `
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `}
`;

const StyledTableCell = styled.td<{
  width?: string;
  align?: "left" | "center" | "right";
}>`
  padding: 1rem;
  border-right: 1px solid white; /* changed to white */
  border-bottom: 1px solid white; /* add bottom border for cell separation */
  text-align: ${(props) => props.align || "left"};
  width: ${(props) => props.width || "auto"};

  &:last-child {
    border-right: none;
  }
`;

const StyledTableHeaderCell = styled.th<{
  width?: string;
  align?: "left" | "center" | "right";
}>`
  padding: 1rem;
  border-right: 1px solid white; /* changed to white */
  border-bottom: 1px solid white; /* add bottom border for header separation */
  text-align: ${(props) => props.align || "left"};
  font-weight: 600;
  color: #333;
  width: ${(props) => props.width || "auto"};

  &:last-child {
    border-right: none;
  }
`;

export const Table = ({ children }: TableProps) => (
  <TableWrapper>
    <StyledTable>{children}</StyledTable>
  </TableWrapper>
);

export const TableHeader = ({ children }: TableHeaderProps) => (
  <StyledTableHeader>
    <StyledTableRow>{children}</StyledTableRow>
  </StyledTableHeader>
);

export const TableBody = styled.tbody``;

export const TableRow = ({ children, onClick }: TableRowProps) => (
  <StyledTableRow clickable={!!onClick} onClick={onClick}>
    {children}
  </StyledTableRow>
);

export const TableCell = ({
  children,
  width,
  align,
  style,
}: TableCellProps) => (
  <StyledTableCell width={width} align={align} style={style}>
    {children}
  </StyledTableCell>
);

export const TableHeaderCell = ({
  children,
  width,
  align,
  style,
}: TableCellProps) => (
  <StyledTableHeaderCell width={width} align={align} style={style}>
    {children}
  </StyledTableHeaderCell>
);

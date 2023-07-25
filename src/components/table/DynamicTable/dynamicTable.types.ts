import { TableCellProps } from "@mui/material";

export enum Sort {
    ASC = 'asc',
    DESC = 'desc'
}

export interface IMeta {
    page: number;
    itemsPerPage: number;
    orderBy: string;
    sortBy: Sort;
    total: number;
    rowsDisplayedLabel?: string;
}   

export interface IDynamicTableProp {
    headers: IDynamicHeader[];
    data: any[];
    handlePaginationChange?: (meta: any) => void;
    meta: IMeta;
    isLoading?: boolean;
    hasPagination?: boolean;
    handleRemove?: (id: number) => void;
}

export interface IDynamicHeader extends TableCellProps {
    id: string;
    label: string;
    width: number;
    sortDisabled?: boolean;
    action?: string;
}

import { TableCellProps } from "@mui/material";
import { IRecord } from "constants/record.constant";

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
}

export interface IDynamicHeader extends TableCellProps {
    id: string;
    label: string;
    width: number;
    sortDisabled?: boolean;
    action?: string;
}

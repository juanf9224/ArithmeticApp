import { IDynamicHeader } from "components/table/DynamicTable/dynamicTable.types";

export interface IRecord {
    id: number;
    userId: number;
    operationId: number;
    opereationResponse: string | number;
    amount: number;
    userBalance: number;
    date: Date | string;
}

export const recordHeaders: IDynamicHeader[] = [
    {
        id: "operationResponse",
        label: "Operation Response",
        width: 100,
        sortDisabled: true,
    },
    {
        id: "amount",
        label: "Amount",
        width: 100
    },
    {
        id: "userBalance",
        label: "User balance",
        width: 100
    },
    {
        id: "date",
        label: "Date",
        width: 100
    },
    {
        id: "userId",
        label: "User ID",
        width: 100
    },
    {
        id: "operationId",
        label: "Operation ID",
        width: 100
    },
    {
        id: 'delete',
        label: 'Delete',
        width: 50,
        sortDisabled: true,
    },
    {
        id: 'deleted',
        label: 'Deleted',
        width: 50,
        hidden: true,
    },
    {
        id: "createdAt",
        label: "Date",
        width: 100,
        hidden: true
    },
    {
        id: "updatedAt",
        label: "Date",
        width: 100,
        hidden: true
    },
    {
        id: "id",
        label: "ID",
        width: 100,
        hidden: true
    },
];
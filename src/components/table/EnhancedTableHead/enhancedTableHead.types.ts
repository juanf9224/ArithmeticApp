import { IDynamicHeader, IMeta } from "../DynamicTable/dynamicTable.types";

export interface IEnhancedTableProp {
    meta: IMeta,
    headers: IDynamicHeader[];
    sortHandler: (property: string) => void;
    headClass?: any;
}
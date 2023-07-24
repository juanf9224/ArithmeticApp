import { IDynamicHeader } from "../DynamicTable/dynamicTable.types";

export interface IEnhancedTableProp {
    meta: any,
    headers: IDynamicHeader[];
    sortHandler: (property: string) => void;
    headClass?: any;
}
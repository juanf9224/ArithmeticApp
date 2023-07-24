import { TableCell, Grid, Paper, TableContainer, Table, TableBody, TablePagination, TableRow, LinearProgress} from "@mui/material";
import { FunctionComponent, ChangeEvent, memo, Suspense, useMemo } from "react";
import { EnhancedTableHead } from "../EnhancedTableHead/EnhancedTableHead";
import { IDynamicTableProp, Sort } from "./dynamicTable.types";
import DynamicTableSkeleton from "../DynamicTableSkeleton/DynamicTableSkeleton";

const DynamicTable: FunctionComponent<IDynamicTableProp> = ({
    data = [],
    headers = [{ id: '', label: '', width: 0 }],
    handlePaginationChange = () => ({}),
    meta,
    isLoading = false,
    hasPagination,
}) => {

    const sortHandler = (property: any) => {
        const metaData = { ...meta };
        const isAsc = meta.sortBy === Sort.ASC;
        metaData.sortBy = isAsc ? Sort.DESC : Sort.ASC;
        metaData.orderBy = property || '';
        handlePaginationChange(metaData);
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        handlePaginationChange({ ...meta, page: newPage });
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        handlePaginationChange({ ...meta, itemsPerPage: parseInt(event.target.value, 10), page: 0 });
    };

    const renderRows = useMemo(() => data.map((d: any, idx) => (
        <TableRow key={`row-${idx}`}>
            {Object.keys(d).map((property) => {
                const cellData = d[property];
                const head = headers.find((h: any) => h.id === property);
                return (
                    <TableCell
                        key={`${head?.id}-${cellData}`}
                        align={head?.align}
                        hidden={head?.hidden}
                        width={head?.width}
                        style={{ maxWidth: head?.width, display: head?.hidden ? 'none' : 'table-cell' }}
                    >
                        {cellData}
                    </TableCell>
                );
            })}
        </TableRow>
    )), [data, headers]);

    const labelPages = () => `Displaying ${meta.rowsDisplayedLabel || 'items'} of a total ${meta.total} pages`;


    return (
        <Suspense fallback={<LinearProgress />}>
            <Grid container style={{ padding: 'unset' }}>
            <Paper style={{
                width: '100%',
                height: 'fit-content',
            }}>                
                <TableContainer style={{ overflowX: 'auto', maxHeight: 500 }}>
                    <Table
                        style={{ width: '100%' }}
                        aria-labelledby="tableTitle"
                        size="medium"
                        aria-label="enhanced table"
                        stickyHeader
                    >
                        <EnhancedTableHead
                            meta={meta}
                            headers={headers}
                            sortHandler={sortHandler}
                        />

                        {
                            isLoading ? <DynamicTableSkeleton columns={headers.length} />
                                : (
                                    <TableBody>
                                        {renderRows}
                                    </TableBody>
                                )
                        }
                    </Table>
                </TableContainer>
                {hasPagination && (
                    <TablePagination
                        rowsPerPageOptions={[5, 15, 25, 50, 100]}
                        component="div"
                        count={meta.total || 0}
                        rowsPerPage={meta.itemsPerPage}
                        page={meta.page || 0}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelDisplayedRows={labelPages}
                        labelRowsPerPage={meta.rowsDisplayedLabel || 'Rows per page'}
                    />
                )}
            </Paper>
        </Grid>
        </Suspense>
    );
};
export default memo(DynamicTable);

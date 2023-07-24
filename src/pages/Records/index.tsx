import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Grid, LinearProgress } from '@mui/material';
import OperationModal from 'components/OperationModal/OperationModal';
import { SearchInput } from 'components/common/Search/SearchInput';
import LoanProButton from 'components/common/LoanProButton/LoanProButton';
import { recordHeaders } from 'constants/record.constant';
import { useGetRecordsQuery } from 'services/loan-pro-api/record/record.api';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/types';
import { Sort } from 'components/table/DynamicTable/dynamicTable.types';
import { addRecords, resetRecords } from 'store/features/record/recordSlice';
import { useCalculateMutation } from 'services/loan-pro-api/operation/operation.api';
import { OperationType } from 'constants/operation.constant';
import { useDebounce } from 'hooks/useDebounce';

const DynamicTable = lazy(() => import('components/table/DynamicTable/DynamicTable'));

const RecordsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce(search, 500);
    const [meta, setMeta] = useState({
        page: 0,
        itemsPerPage: 5,
        orderBy: 'id',
        sortBy: Sort.DESC,
    })
    const user = useSelector((state: IAppState) => state.user);
    const dispatch = useDispatch()
    const { data, isFetching, refetch } = useGetRecordsQuery({
        userId: user.id,
        meta,
        search: debouncedSearch
    }, {
        refetchOnReconnect: true,
        skip: !user?.id
    });
    const [calculate, { isLoading }] = useCalculateMutation();

    useEffect(() => {
        if (!isFetching && data?.results?.length) {
            dispatch(addRecords(data?.results));
        }

        return () => {
            dispatch(resetRecords());
        }
    }, [data, dispatch, isFetching]);

    const handlePaginationChange = (meta: any) => {
        setMeta(meta);
    }


    const handleAddOperation = async (type: OperationType, valueA: number, valueB: number) => {
        try{
            console.log('here')
            if (!user || !user.id) throw new Error('Cannot request a calculation without user');
            await calculate({
                userId: user.id,
                type,
                data: {
                    valueA,
                    valueB,
                }
            });
            refetch();
        } catch (error: any) {
            console.error(`Could not execute operation - message: ${error.message} - stack: ${error.stack}`);
        }
    }

    return (
        <Suspense fallback={<LinearProgress />}>
            <Grid container style={{
            padding: '0 10px'
        }}>
            {isOpen ? (
                <OperationModal open={isOpen} handleClose={() => setIsOpen(false)} handleAddOperation={handleAddOperation} isLoading={isLoading} />
            ) : null}
            <Grid item xs={12} style={{ display: 'flex', padding: '20px 0', justifyContent: 'space-between' }}>
                <Grid item xs={4}>
                    <SearchInput searchHandler={(value) => setSearch(value)} placeholder="Search Record" />
                </Grid>
                <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
                    <LoanProButton onClick={() => setIsOpen(true)}>
                        Add Operation
                    </LoanProButton>
                </Grid>
            </Grid>
            {
                data?.results?.length ? (
                    <DynamicTable
                        data={data?.results}
                        isLoading={isLoading}
                        headers={recordHeaders}
                        handlePaginationChange={handlePaginationChange}
                        hasPagination
                        meta={{
                            ...meta,
                            rowsDisplayedLabel: 'records',
                            total: (data && data?.total) || 0
                        }}
                    />
                ) : null
            }
        </Grid>
        </Suspense>
    )
}

export default RecordsPage
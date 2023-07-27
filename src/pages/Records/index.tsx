import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Grid, LinearProgress, Typography } from '@mui/material';
import OperationModal from 'components/OperationModal/OperationModal';
import { SearchInput } from 'components/common/Search/SearchInput';
import LoanProButton from 'components/common/LoanProButton/LoanProButton';
import { recordHeaders } from 'constants/record.constant';
import { useGetRecordsQuery, useRemoveRecordMutation } from 'services/loan-pro-api/record/record.api';
import { useDispatch } from 'react-redux';
import { IMeta, Sort } from 'components/table/DynamicTable/dynamicTable.types';
import { addRecords, resetRecords } from 'store/features/record/recordSlice';
import { useCalculateMutation } from 'services/loan-pro-api/operation/operation.api';
import { OperationType } from 'constants/operation.constant';
import { useAuth } from 'hooks/useAuth';
import { FindInPageRounded } from '@mui/icons-material';

const DynamicTable = lazy(() => import('components/table/DynamicTable/DynamicTable'));

const RecordsPage = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [meta, setMeta] = useState<IMeta>({
        page: 0,
        itemsPerPage: 5,
        orderBy: 'id',
        sortBy: Sort.DESC,
        total: 0,
        search: '',
    })
    const dispatch = useDispatch()
    const { data, isFetching, refetch } = useGetRecordsQuery({
        userId: user.id!,
        meta
    }, {
        refetchOnReconnect: true,
        skip: !user?.id
    });
    const [calculate, { isLoading }] = useCalculateMutation();
    const [removeRecord] = useRemoveRecordMutation();

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

    const handleRemove = async (id: any) => {
        try {
            const recordsCount = data?.results?.length;
            await removeRecord({ id }).unwrap();
            if (recordsCount === 1 && meta.page > 0) {
                setMeta({
                    ...meta,
                    page: meta.page - 1
                })
            }
        } catch (error: any) {
            console.error(`Error trying to delete record - message: ${error.message} - stack: ${error.stack}`);
        }
    }

    const onSearchChange = (search: string) => {
        setMeta({
            ...meta,
            page: 0,
            search
        });
    };

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
                    <SearchInput onSearchChange={onSearchChange} placeholder="Search Record" />
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
                            rowsDisplayedLabel: 'Items per page',
                            total: (data && data?.total) || 0
                        }}
                        handleRemove={handleRemove}
                    />
                ) : <div style={{ display: 'flex', alignItems: 'center'}}> <Typography>No data to display...</Typography> <FindInPageRounded color='info' fontSize="large" /></div>
            }
        </Grid>
        </Suspense>
    )
}

export default RecordsPage
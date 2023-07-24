/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';

const rows = Array(5).fill(<div />);
const DynamicTableSkeleton = ({ columns }: any) => (
    <TableBody>
        { rows.map((_val: React.ReactElement, index: number) => (
            <TableRow key={index + new Date().getMilliseconds()}>
                {
                    Array(columns).fill(<div />).map((_value: React.ReactElement, idx: number) => (
                        <TableCell key={idx + Math.random() * 999}>
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height="15px"
                                style={{
                                    borderRadius: 'unset',
                                }}
                            />
                        </TableCell>
                    ))
                }
            </TableRow>
        ))}
    </TableBody>
);
export default DynamicTableSkeleton;

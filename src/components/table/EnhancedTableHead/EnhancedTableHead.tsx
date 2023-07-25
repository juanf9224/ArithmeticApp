import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import React from 'react';
import { IDynamicHeader, Sort } from '../DynamicTable/dynamicTable.types';
import { IEnhancedTableProp } from './enhancedTableHead.types';

export const EnhancedTableHead = ({
    meta,
    headers,
    sortHandler,
    headClass,
}: IEnhancedTableProp) => (
    <TableHead style={{
        backgroundColor: 'beige'
    }}
    >
        <TableRow>
            {headers.length > 0 && headers.map((headCell: IDynamicHeader) => (
                <TableCell
                    key={headCell.id}
                    align={headCell?.align || 'left'}
                    width={headCell?.width}
                    className={headClass}
                    style={{ maxWidth: headCell?.width, display: headCell?.hidden ? 'none' : 'table-cell' }}
                >
                    {
                        headCell?.sortDisabled ? headCell.label : (
                            <TableSortLabel
                                active={meta.orderBy === headCell.id}
                                direction={meta.orderBy === headCell.id ? meta.orderBy : Sort.ASC}
                                onClick={() => sortHandler(headCell.id)}
                            >

                                {headCell.label}
                            </TableSortLabel>
                        )
                    }
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
);

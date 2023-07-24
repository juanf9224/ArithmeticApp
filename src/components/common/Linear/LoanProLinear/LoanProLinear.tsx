import { Box } from '@mui/material'
import React, { FC } from 'react'

export interface ILoanProLinearProp {
    radius?: boolean
}

const LoanProLinear: FC<ILoanProLinearProp> = ({radius}) => {
  return (
    <Box sx={{
        background: 'linear-gradient(125deg, rgba(31,196,219,1) 60%, rgba(0,0,0,1) 65%)',
        height: 15,
        borderTopLeftRadius: radius ? 10 : 'unset',
        borderTopRightRadius: radius ? 10 : 'unset',
      }} />
  )
}

export default LoanProLinear
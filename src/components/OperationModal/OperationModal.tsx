import React, { FC } from 'react';
import {
  TextField,
  Box,
  Typography,
  InputAdornment,
  Tooltip,
  CircularProgress,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import {  useForm } from 'react-hook-form';
import LoanProButton from 'components/common/LoanProButton/LoanProButton';
import { useGetOperationsQuery } from 'services/loan-pro-api/operation/operation.api';
import { OperationType } from 'constants/operation.constant';
import ModalWrapper from 'components/common/ModalWrapper/ModalWrapper';
import { IOperationModalProps } from './types';

interface OperationFields {
  operationType: OperationType;
  valueA: number | null;
  valueB?: number | null;
}

const operationTypeMap: Map<OperationType, string> = new Map([
  [OperationType.ADDITION, 'Addition'],
  [OperationType.SUBSTRACTION, 'Substraction'],
  [OperationType.MULTIPLICATION, 'Multiplication'],
  [OperationType.DIVISION, 'Division'],
  [OperationType.SQUARE_ROOT, 'Square Root'],
  [OperationType.RANDOM_STRING, 'Random String']
]);

const OperationModal: FC<IOperationModalProps> = ({ open, handleClose, handleAddOperation, isLoading }: any) => {
  const { handleSubmit, setValue, watch, register, formState: { errors } } = useForm<OperationFields>({
    mode: 'all',
    defaultValues: {
      operationType: OperationType.ADDITION
    }
  });
  const watchOperationType = watch('operationType', OperationType.ADDITION);
  const watchValueA = watch('valueA', null);
  const watchValueB = watch('valueB', null);
  const { data: operations, isFetching } = useGetOperationsQuery({}, {
    skip: isLoading
  });

  const handleSave = (data: OperationFields) => {
      handleAddOperation(data.operationType, data.valueA, data.valueB);
      handleClose();
  };

  const isSubmitDisabled = () => {
    if (watchOperationType !== OperationType.RANDOM_STRING && watchOperationType !== OperationType.SQUARE_ROOT) {
      return !watchValueA || !watchValueB;
    }
    return !watchValueA;
  }

  const valueALabel = watchOperationType === OperationType.RANDOM_STRING ? 'Random String length' : 'value A';

  return (
    <ModalWrapper open={open} handleClose={handleClose}>

      <>
        <Typography variant="h6" gutterBottom>
          Add Operation
        </Typography>
        <>
          <Select
          {...register('operationType', { required: 'Operation type is required' })}
          defaultValue={OperationType.ADDITION}
          required
          disabled={isFetching}
          >
            {isFetching ? (
              <MenuItem key="Feching operations"><><CircularProgress /> Feching operations</></MenuItem>
            ): null}
            {operations?.map((operation) => {
              return (
                <MenuItem key={operation.type} value={operation.type}>{operationTypeMap.get(operation.type as OperationType)}</MenuItem>
              )
            })}
          </Select>
          {errors.operationType ? (
            <Typography style={{ color: 'red' }} variant="body2"> {errors.operationType.message} </Typography>
          ) : null}
        </>
        <>
          <TextField
            {...register('valueA')}
            id="value-a"
            label={valueALabel}
            placeholder={valueALabel}
            style={{
              border: errors.valueA ? 'gray' : 'red'
            }}
            required
            fullWidth
            InputProps={{
              endAdornment: watchValueA ? (
                <InputAdornment position="end" onClick={() => setValue('valueA', null)}>
                  <Tooltip title="Clear">
                    <Typography style={{ cursor: 'pointer' }}> X </Typography>
                  </Tooltip>
                </InputAdornment>
              ) : undefined,
            }}
          />
          {errors.valueA ? (
            <Typography style={{ color: 'red' }} variant="body2"> {errors.valueA.message} </Typography>
          ) : null}
        </>
        {
          watchOperationType !== OperationType.RANDOM_STRING
            && watchOperationType !== OperationType.SQUARE_ROOT ? (
            <>
              <TextField
                {...register('valueB')}
                id="value-b"
                label="value B"
                placeholder="value B"
                style={{
                  border: errors.valueB ? 'gray' : 'red'
                }}
                fullWidth
                inputMode='decimal'
                required
                InputProps={{
                  endAdornment: watchValueB ? (
                    <InputAdornment position="end" onClick={() => setValue('valueB', null)}>
                      <Tooltip title="Clear">
                        <Typography style={{ cursor: 'pointer' }}> X </Typography>
                      </Tooltip>
                    </InputAdornment>
                  ) : null,
                }}
              />
              {errors.valueB ? (
                <Typography style={{ color: 'red' }} variant="body2"> {errors.valueB.message} </Typography>
              ) : null}
            </>
          ) : null
        }
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={handleClose} sx={{ mr: 2 }} variant="contained" style={{
            background: 'black'
          }}>
            Cancel
          </Button>
          <LoanProButton onClick={handleSubmit(handleSave)} color="primary" disabled={isSubmitDisabled()}>
            {isLoading ? <CircularProgress size={20} /> : 'Save'}
          </LoanProButton>
        </Box>
      </>
    </ModalWrapper>
  );
};

export default OperationModal;

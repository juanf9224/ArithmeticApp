import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import WithProvider from "components/helpers/WithProvider/WithProvider";
import OperationModal from "./OperationModal";
import { OperationType } from "constants/operation.constant";
import { wait } from "@testing-library/user-event/dist/utils";

describe('Login component', () => {
    it('should render component successfully', () => {        
        const { getByText } = render(<WithProvider><OperationModal
        open={true}
        handleAddOperation={jest.fn}
        isLoading={false}
        handleClose={jest.fn()}
        /></WithProvider>);
        expect(getByText('Save')).toBeInTheDocument();
    })
    it('should invoke handleAddOperaton with correct values', async () => {    
        const handleAddOperation = jest.fn();
        const handleClose = jest.fn();
        const { getByText, getByLabelText } = render(<WithProvider>
                <OperationModal
                    open={true}
                    handleAddOperation={handleAddOperation}
                    isLoading={false}
                    handleClose={handleClose}
                />
            </WithProvider>);

        const valueA = getByLabelText(/^value A/i);
        const valueB = getByLabelText(/^value B/i);
        const saveButton = getByText('Save');

        act( () => {
            fireEvent.change(valueA, { target: { value: 25 }});
            fireEvent.change(valueB, { target: { value: 30 }});           
        });

        act( () => {
            fireEvent.click(saveButton);
        })
        
        await act(async () => {
            await wait();
            expect(handleClose).toHaveBeenCalled();
            await wait();
            expect(handleAddOperation).toHaveBeenCalledWith(OperationType.ADDITION, "25", "30");
        })
        
    })
})
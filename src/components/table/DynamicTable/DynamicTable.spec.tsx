import WithProvider from "components/helpers/WithProvider/WithProvider";
import DynamicTable from "./DynamicTable";
import { render } from "@testing-library/react";
import { Sort } from "./dynamicTable.types";

describe('Dynamic Table tests', () => {
    it('should render component successfully', () => {        
        const { getByText } = render(<WithProvider><DynamicTable
        data={[{
            id: 1,
            name: 'Joe'
        }]}
        headers={[{
            id: 'id',
            label: 'ID',
            width: 100
        },
        {
            id: 'name',
            label: 'Name',
            width: 100
        }
    ]}
        meta={{
            page: 0,
            itemsPerPage: 0,
            sortBy: Sort.ASC,
            orderBy: '',
            total: 0
        }}
        /></WithProvider>);
        expect(getByText('Joe')).toBeInTheDocument();
    })
})
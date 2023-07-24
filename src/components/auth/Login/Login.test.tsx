import { render } from "@testing-library/react";
import Login from "./Login";
import WithProvider from "components/helpers/WithProvider/WithProvider";

describe('Login component', () => {
    it('should render component successfully', () => {
        const { getByText } = render(<WithProvider><Login /></WithProvider>);
        expect(getByText('Login')).toBeInTheDocument();
    })
    it('should have an username input', () => {
        const { getByPlaceholderText } = render(<WithProvider><Login /></WithProvider>);
        
        expect(getByPlaceholderText('Username')).toBeInTheDocument();
    })
    it('should have an password input', () => {
        const { getByPlaceholderText } = render(<WithProvider><Login /></WithProvider>);
        
        expect(getByPlaceholderText('Password')).toBeInTheDocument();
    })
})
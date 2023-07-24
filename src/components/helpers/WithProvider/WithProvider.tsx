import { FC, PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import store from "store"

const WithProvider: FC<PropsWithChildren> = ({children}) => {
    return (
        <Provider store={store}>
            <MemoryRouter>
                {children}
            </MemoryRouter>
        </Provider>
    )
}

export default WithProvider;
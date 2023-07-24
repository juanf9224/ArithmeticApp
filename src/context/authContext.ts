import { ILoginFields } from "constants/user.constant";
import { createContext } from "react";
import { IUserState, initialUserState } from "store/features/user/types";

type AuthContextType = {
    user: IUserState,
    login: {
        doLogin: (formData: ILoginFields) => Promise<void>,
        isLoading: boolean,
    },
    doLogout: () => Promise<void>
}
const initialContextValue: AuthContextType = {
    user: initialUserState,
    login: {
        doLogin: (formData: ILoginFields) => Promise.resolve(),
        isLoading: false,
    },
    doLogout: () => Promise.resolve()
}
export const AuthContext = createContext<AuthContextType>(initialContextValue);
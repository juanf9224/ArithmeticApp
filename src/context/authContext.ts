import { ILoginFields } from "constants/user.constant";
import { createContext } from "react";
import { IUserState, initialUserState } from "store/features/user/types";

export type AuthContextType = {
    user: IUserState,
    login: {
        doLogin: (formData: ILoginFields, callback: VoidFunction) => Promise<void>,
        isLoading: boolean,
        isRefreshLoading: boolean,
    },
    doLogout: (callback: VoidFunction) => Promise<void>
}
const initialContextValue: AuthContextType = {
    user: initialUserState,
    login: {
        doLogin: (formData: ILoginFields) => Promise.resolve(),
        isLoading: false,
        isRefreshLoading: false,
    },
    doLogout: () => Promise.resolve()
}
export const AuthContext = createContext<AuthContextType>(initialContextValue);
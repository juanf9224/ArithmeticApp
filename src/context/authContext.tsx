import { ILoginFields } from "constants/user.constant";
import { FC, PropsWithChildren, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation, useLogoutMutation } from "services/loan-pro-api/auth/auth";
import { resetOperations } from "store/features/operation/operationSlice";
import { resetRecords } from "store/features/record/recordSlice";
import { IUserState, initialUserState } from "store/features/user/types";
import { addUser, logOut, selectUser } from "store/features/user/userSlice";

type AuthContextType = {
    user: IUserState,
    login: {
        doLogin: (formData: ILoginFields) => Promise<void>,
        isLoading: boolean,
    },
    doLogout: () => Promise<void>
}
export const AuthContext = createContext<AuthContextType>({
    user: initialUserState,
    login: {
        doLogin: (formData: ILoginFields) => Promise.resolve(),
        isLoading: false,
    },
    doLogout: () => Promise.resolve()
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();
    const [logout] = useLogoutMutation();

    useEffect(() => {
        console.log(`Environment: ${process.env.NODE_ENV}`);
    }, [])

    const doLogin = async (formData: ILoginFields) => {
        try {
        const response = await login(formData).unwrap();
        dispatch(addUser(response));
        localStorage.setItem('isAuthenticated', 'true');
        } catch (error: any) {
        console.error(
            `Could not login - message: ${error.message} - stack: ${error.stack}`
        );
        }
    };  

    const doLogout = async () => {
        try {
            await logout(user.id).unwrap();
            dispatch(resetRecords());
            dispatch(resetOperations());
            localStorage.removeItem('isAuthenticated');
            dispatch(logOut());
        } catch (error: any) {
            console.log(`Error trying to logout - message: ${error.message} - stack: ${error.stack}`);
        }
    }

    return (
        <AuthContext.Provider value={{ user, login: { doLogin, isLoading }, doLogout }}>
            {children}
        </AuthContext.Provider>
    )
}
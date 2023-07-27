import { ILoginFields } from "constants/user.constant";
import { AuthContext, AuthContextType } from "context/authContext";
import { FC, PropsWithChildren, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation, useLogoutMutation, useRefreshTokenMutation } from "services/loan-pro-api/auth/auth";
import { resetOperations } from "store/features/operation/operationSlice";
import { resetRecords } from "store/features/record/recordSlice";
import { selectUser, addUser, logOut } from "store/features/user/userSlice";

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();
    const [logout] = useLogoutMutation();
    const [refreshToken, { isLoading: isRefreshLoading }] = useRefreshTokenMutation();
    const isAuthenticatedInStorage = Boolean(localStorage.getItem('isAuthenticated'));

    useEffect(() => {
        if (!user?.id && Boolean(isAuthenticatedInStorage)) {
            doRefreshToken();
        }
    }, [])


    const doRefreshToken = async () => {
        try {
            const user = await refreshToken({}).unwrap();
            dispatch(addUser(user));
        } catch (error: any) {
            console.log(`Error trying to get refresh token - message: ${error.message} - stack: ${error.stack}`);
            localStorage.removeItem('isAuthenticated');
        }
    }

    const doLogin = async (formData: ILoginFields, callback: VoidFunction) => {
        try {
        const response = await login(formData).unwrap();
        dispatch(addUser(response));
        localStorage.setItem('isAuthenticated', 'true');
        callback();
        } catch (error: any) {
        console.error(
            `Could not login - message: ${error.message} - stack: ${error.stack}`
        );
        }
    };  

    const doLogout = async (callback: VoidFunction) => {
        try {
            await logout(user.id).unwrap();
            dispatch(resetRecords());
            dispatch(resetOperations());
            localStorage.removeItem('isAuthenticated');
            dispatch(logOut());
            callback();
        } catch (error: any) {
            console.log(`Error trying to logout - message: ${error.message} - stack: ${error.stack}`);
        }
    }

    let value: AuthContextType = {
        user: {
            ...user,
            auth: {
                isAuthenticated: user?.auth.isAuthenticated && isAuthenticatedInStorage,
            }
        },
        login:
        {
            doLogin,
            isLoading,
            isRefreshLoading
        },
        doLogout
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
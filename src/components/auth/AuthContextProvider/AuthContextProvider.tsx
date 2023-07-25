import { ILoginFields } from "constants/user.constant";
import { AuthContext } from "context/authContext";
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
    const [refreshToken] = useRefreshTokenMutation();
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    useEffect(() => {
        if (!user?.id && Boolean(isAuthenticated)) {
            console.log('refresh happened');
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
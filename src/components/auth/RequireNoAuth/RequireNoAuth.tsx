import { useAuth } from "hooks/useAuth";
import { FC, PropsWithChildren } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireNoAuth: FC<PropsWithChildren> = ({ children }) => {
    const { user: { auth }} = useAuth();
    const { state } = useLocation();

    if (auth?.isAuthenticated) {
        // Redirect users to /operations route
        return <Navigate to={state?.path || '/operation'} replace />
    }

    return <Outlet />;
}

export default RequireNoAuth;
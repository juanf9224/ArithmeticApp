import { useAuth } from "hooks/useAuth";
import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
    const { user: { auth} } = useAuth();
    const location = useLocation();

    if (!auth.isAuthenticated) {
        // Redirect users to /login page and save current location
        return <Navigate to="/auth/login" replace state={ { from: location}} />
    }
    return children;
}

export default RequireAuth;
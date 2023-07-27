import { AuthContext, AuthContextType } from "context/authContext";
import { useContext } from "react";

export const useAuth = (): AuthContextType => useContext(AuthContext)
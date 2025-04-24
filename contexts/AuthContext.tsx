import { IUser } from "@/types/user.types";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AUTH_KEY } from "@/constants";
import { usePathname, useRouter } from "expo-router";

export interface IAuthContext {
    currentUser: IUser | null;
    onSaveUser: (user: IUser) => void;
    onRemoveUser: () => void;
    redirectIfLogin: () => void;
}
const AuthContext = React.createContext<IAuthContext>({
    currentUser: null,
    onSaveUser: (usr) => usr,
    onRemoveUser: () => null,
    redirectIfLogin: () => null,
});

export const useAuth = () => {
    return React.useContext(AuthContext);
};

interface Props {
    children: React.ReactNode;
}
const AuthProvider: React.FC<Props> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const onSaveUser = async (user: IUser) => {
        setCurrentUser(user);
        await SecureStore.setItemAsync(AUTH_KEY, JSON.stringify(user));
    };
    const onRemoveUser = async () => {
        setCurrentUser(null);
        await SecureStore.deleteItemAsync(AUTH_KEY);
    };

    const fetchUser = async () => {
        try {
            setIsLoading(true);

            const localUser = await SecureStore.getItemAsync(AUTH_KEY);
            if (localUser) {
                const userData = JSON.parse(localUser);
                setCurrentUser(userData);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);
    const redirectIfLogin = () => {
        const publicRoutes = ["/", "/signup"];
        const isPublicRoute = publicRoutes.find((item) => item === pathname);
        if (currentUser && isPublicRoute) {
            router.navigate("/dashboard");
        }
    };
    useEffect(() => {
        redirectIfLogin();
    }, [currentUser]);

    return (
        <AuthContext.Provider
            value={{
                currentUser: currentUser,
                onSaveUser,
                onRemoveUser,
                redirectIfLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

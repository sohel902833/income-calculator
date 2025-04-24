import React, { useEffect } from "react";

import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";

import {
    MD3LightTheme,
    MD3DarkTheme,
    adaptNavigationTheme,
    PaperProvider,
    MD3Theme,
} from "react-native-paper";
import merge from "deepmerge";

import { useColorScheme } from "@/hooks/useColorScheme";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const MergedLightTheme: MD3Theme = merge(MD3LightTheme, LightTheme);
const MergedDarkTheme: MD3Theme = merge(MD3DarkTheme, DarkTheme);

const CombinedDefaultTheme: MD3Theme = {
    ...MergedLightTheme,
    colors: {
        ...MergedLightTheme.colors,
        primary: "#120e34",
        secondary: "#1B1663",
        onPrimary: "#ffffff",
    },
};
const CombinedDarkTheme: MD3Theme = {
    ...MergedDarkTheme,
    colors: {
        ...MergedDarkTheme.colors,
        primary: "#120e34",
        secondary: "#1B1663",
        onPrimary: "#ffffff",
    },
};

interface Props {
    children: React.ReactNode;
}

export const PreferencesContext = React.createContext({
    toggleTheme: () => {},
    isThemeDark: false,
});
export const useThemePreference = () => {
    return React.useContext(PreferencesContext);
};
const ThemeProvider: React.FC<Props> = ({ children }) => {
    const [isThemeDark, setIsThemeDark] = React.useState(false);
    const colorScheme = useColorScheme();

    useEffect(() => {
        if (colorScheme === "dark") {
            setIsThemeDark(true);
        } else {
            setIsThemeDark(false);
        }
    }, [colorScheme]);

    let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

    const toggleTheme = React.useCallback(() => {
        return setIsThemeDark(!isThemeDark);
    }, [isThemeDark]);

    const preferences = React.useMemo(
        () => ({
            toggleTheme,
            isThemeDark,
        }),
        [toggleTheme, isThemeDark]
    );
    return (
        <PreferencesContext.Provider value={preferences}>
            <PaperProvider theme={theme}>
                <NavigationThemeProvider value={theme}>
                    {children}
                    <Toast />
                </NavigationThemeProvider>
            </PaperProvider>
        </PreferencesContext.Provider>
    );
};

export default ThemeProvider;

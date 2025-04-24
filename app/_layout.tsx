import ThemeProvider from "@/components/theme/ThemeProvider";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Button } from "react-native-paper";
import "react-native-reanimated";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { TouchableOpacity } from "react-native";
import "@/firebase/firebaseConfig";
import AuthProvider, { useAuth } from "@/contexts/AuthContext";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <ThemeProvider>
                <ScreenStack />
                <StatusBar style="auto" />
            </ThemeProvider>
        </AuthProvider>
    );
}

const ScreenStack = () => {
    const router = useRouter();
    const { currentUser } = useAuth();
    return (
        <Stack>
            {!currentUser && (
                <>
                    <Stack.Screen
                        name="index"
                        options={{
                            title: "Home",
                            headerRight: () => (
                                <TouchableOpacity
                                    onPressIn={() =>
                                        router.navigate("/settings")
                                    }
                                >
                                    <Button>
                                        <EvilIcons
                                            name="gear"
                                            size={24}
                                            color="white"
                                        />
                                    </Button>
                                </TouchableOpacity>
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="register"
                        options={{
                            title: "Signup",
                        }}
                    />
                </>
            )}
            <Stack.Screen name="settings" options={{ title: "Settings" }} />
            <Stack.Screen
                name="dashboard"
                options={{
                    title: "Dashboard",
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="income-types"
                options={{
                    title: "Income Types",
                }}
            />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
};

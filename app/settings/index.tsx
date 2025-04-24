import { useThemePreference } from "@/components/theme/ThemeProvider";
import { Stack } from "expo-router";
import { View, SafeAreaView, Switch } from "react-native";
import { Text } from "react-native-paper";

const SettingsPage = () => {
    const { isThemeDark, toggleTheme } = useThemePreference();
    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    title: "Settings",
                }}
            />
            <View
                style={{
                    padding: 10,
                }}
            >
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                    }}
                >
                    <Text variant="titleMedium">Dark Theme</Text>
                    <Switch value={isThemeDark} onValueChange={toggleTheme} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SettingsPage;

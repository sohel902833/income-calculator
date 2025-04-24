import { Image, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Card, Text, useTheme } from "react-native-paper";
import UserInfo from "@/components/home/UserInfo";
import IncomeHistories from "@/components/home/IncomeHistories";
import { Stack } from "expo-router";
export default function HomeScreen() {
    const theme = useTheme();

    const primaryColor = theme.colors.primary;
    const secondaryColor = theme.colors.secondary;
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            header={
                <LinearGradient
                    colors={["#120e34", "#1B1663", "#26216b"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    <UserInfo />
                    <View
                        style={{
                            flex: 0.9,
                        }}
                    >
                        <Card
                            style={{
                                flex: 1,
                                padding: 10,
                                display: "flex",
                                justifyContent: "center",
                                backgroundColor: secondaryColor,
                            }}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                    }}
                                >
                                    <Text
                                        style={{ color: "gray" }}
                                        variant="labelLarge"
                                    >
                                        Total Current Cash
                                    </Text>
                                    <Text
                                        style={{ fontWeight: "600" }}
                                        variant="headlineLarge"
                                    >
                                        50000
                                    </Text>
                                </View>
                                <View>
                                    <Button
                                        // buttonColor={primaryColor}
                                        mode="contained"
                                        textColor="white"
                                    >
                                        Add
                                    </Button>
                                </View>
                            </View>
                        </Card>
                    </View>
                </LinearGradient>
            }
        >
            <Stack.Screen
                options={{
                    title: "Dashboard",
                    headerShown: false,
                }}
            />
            <IncomeHistories />
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        gap: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
});

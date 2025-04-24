import { useAuth } from "@/contexts/AuthContext";
import { Image, View } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

const UserInfo = () => {
    const { currentUser } = useAuth();
    const theme = useTheme();
    const router = useRouter();
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 50,

                gap: 10,
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Image
                    source={require("@/assets/images/avatar.jpeg")}
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: 100,
                    }}
                />
                <View>
                    <Text variant="labelMedium" style={{ color: "#909095" }}>
                        Hello
                    </Text>
                    <Text variant="titleSmall">{currentUser?.name}</Text>
                </View>
            </View>
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 5,
                }}
            >
                <IconButton
                    icon="arrow-decision-auto"
                    size={24}
                    onPress={() => router.navigate("/income-types")}
                    mode="contained" // optional: 'contained' | 'outlined'
                    iconColor="white"
                    containerColor={theme.colors.primary}
                />
                <IconButton
                    icon="cog"
                    size={24}
                    onPress={() => router.navigate("/settings")}
                    mode="contained" // optional: 'contained' | 'outlined'
                    iconColor="white"
                    containerColor={theme.colors.primary}
                />
            </View>
        </View>
    );
};

export default UserInfo;

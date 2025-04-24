import { View, SafeAreaView } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { get, ref, set } from "firebase/database";
import { USER_DATA_PATH } from "@/api/databaseRef";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/firebaseConfig";

const LoginScreen = () => {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const router = useRouter();

    const [data, setData] = useState({
        userName: "",
        password: "",
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const { onSaveUser, redirectIfLogin } = useAuth();

    const loginUser = async () => {
        const user = await get(
            ref(db, `${USER_DATA_PATH}/${data.userName.trim()}`)
        );

        if (!user.exists() && !user?.val()?.id) {
            Toast.show({
                type: "error",
                text1: "Login Failed",
                text2: "User not found",
            });
            return;
        }

        const userInfo = user.val();

        if (userInfo.password !== data.password.trim()) {
            Toast.show({
                type: "error",
                text1: "Login Failed",
                text2: "Password doesn't matched!",
            });
            return;
        }
        onSaveUser(userInfo);
        router.navigate("/dashboard");
        Toast.show({
            type: "success",
            text1: "Login Success",
        });
    };

    const handleLogin = async () => {
        try {
            if (!data.userName?.trim() && !data.password?.trim()) {
                Toast.show({
                    type: "error", // 'error' | 'info'
                    text1: "Validation Failed",
                    text2: "Please enter username and password",
                });
                return;
            }
            setIsProcessing(true);
            loginUser();
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Login Failed",
                text2: "Something wen't wrong! Please try again",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        redirectIfLogin();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <View>
                    <Text
                        style={{
                            textAlign: "center",
                            marginBottom: 20,
                            marginTop: 15,
                        }}
                        variant="titleLarge"
                    >
                        Login to Your Account
                    </Text>
                    <TextInput
                        mode="outlined"
                        label="User Name"
                        placeholder="Boss"
                        style={{
                            marginBottom: 20,
                        }}
                        value={data.userName}
                        onChangeText={(val) =>
                            setData((prev) => ({ ...prev, userName: val }))
                        }
                    />
                    <TextInput
                        mode="outlined"
                        label="Password"
                        placeholder="Password"
                        secureTextEntry={!isPasswordShow}
                        right={
                            <TextInput.Icon
                                onPress={() =>
                                    setIsPasswordShow((prev) => !prev)
                                }
                                icon={isPasswordShow ? "eye-off" : "eye"}
                            />
                        }
                        value={data.password}
                        onChangeText={(val) =>
                            setData((prev) => ({ ...prev, password: val }))
                        }
                    />
                    <Button
                        mode="contained"
                        onPress={() => handleLogin()}
                        style={{
                            marginTop: 20,
                            borderRadius: 18,
                        }}
                        loading={isProcessing}
                    >
                        Login
                    </Button>
                    <Button
                        onPress={() => router.navigate("/register")}
                        style={{
                            marginTop: 20,
                            borderRadius: 18,
                        }}
                    >
                        Don't have any account? Signup
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

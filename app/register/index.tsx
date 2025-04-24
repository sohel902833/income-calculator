import { View, SafeAreaView } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { ref, set, get, query } from "firebase/database";
import { USER_DATA_PATH, USER_REF } from "@/api/databaseRef";
import { Stack, useRouter } from "expo-router";
import { IUser } from "@/types/user.types";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/contexts/AuthContext";

const RegisterScreen = () => {
    const { onSaveUser, redirectIfLogin } = useAuth();
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const router = useRouter();

    const [data, setData] = useState({
        userName: "",
        password: "",
        fullName: "",
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const registerUser = async () => {
        const userInfo: IUser = {
            username: data.userName.trim(),
            id: new Date().getTime().toString(),
            name: data.fullName.trim(),
            password: data.password.trim(),
        };

        const user = await get(
            ref(db, `${USER_DATA_PATH}/${userInfo.username}`)
        );

        if (user.exists() && user?.val()?.id) {
            Toast.show({
                type: "error", // 'error' | 'info'
                text1: "Registration Failed",
                text2: "User name already exists",
            });
            return;
        }

        await set(ref(db, `${USER_DATA_PATH}/${userInfo.username}`), userInfo);
        onSaveUser(userInfo);
        router.navigate("/(home)");
        Toast.show({
            type: "success", // 'error' | 'info'
            text1: "Registration Success",
            text2: "Your account successfully created",
        });
    };

    const handleLogin = async () => {
        try {
            if (
                !data.userName?.trim() &&
                !data.password?.trim() &&
                !data.fullName.trim()
            ) {
                Toast.show({
                    type: "error", // 'error' | 'info'
                    text1: "Validation Failed",
                    text2: "Please enter username and password",
                });
                return;
            }
            setIsProcessing(true);

            registerUser();
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
            <Stack.Screen
                options={{
                    title: "Signup",
                }}
            />
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
                        label="Full Name"
                        placeholder="Boss"
                        style={{
                            marginBottom: 20,
                        }}
                        value={data.fullName}
                        onChangeText={(val) =>
                            setData((prev) => ({ ...prev, fullName: val }))
                        }
                    />
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
                        Signup
                    </Button>
                    <Button
                        onPress={() => router.navigate("/")}
                        style={{
                            marginTop: 20,
                            borderRadius: 18,
                        }}
                    >
                        Already have any account? Login
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;

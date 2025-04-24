import CreateAndUpdateIncomeTypes from "@/components/income-types/CreateAndUpdateIncomeTypes";
import { Stack } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
    Button,
    Card,
    FAB,
    IconButton,
    Portal,
    Text,
    useTheme,
} from "react-native-paper";

const IncomeTypes = () => {
    const theme = useTheme();
    const [openIncomeTypes, setOpenIncomeTypes] = useState(false);
    const [openExpenseTypes, setOpenExpenseTypes] = useState(false);
    const [openCreateIncomeTypeModal, setOpenCreateIncomeTypeModal] =
        useState(false);

    return (
        // <SafeAreaView>
        <ScrollView
            style={{
                flex: 1,
                padding: 10,
            }}
        >
            <Stack.Screen
                options={{
                    title: "Income & Expense Types",
                    // headerShown: false,
                }}
            />

            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    paddingHorizontal: 10,
                }}
            >
                <Text variant="titleLarge">Income Types</Text>
                <IconButton
                    icon={openIncomeTypes ? "minus" : "plus"}
                    size={24}
                    mode="contained"
                    iconColor="white"
                    containerColor={theme.colors.primary}
                    onPressIn={() => setOpenIncomeTypes((prev) => !prev)}
                />
            </View>
            {openIncomeTypes && (
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        marginTop: 20,
                    }}
                >
                    {[...new Array(2)].map((item, index) => {
                        return <IncomeTypeItem key={index} />;
                    })}
                </View>
            )}

            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    paddingHorizontal: 10,
                }}
            >
                <Text variant="titleLarge">Expense Types</Text>
                <IconButton
                    icon={openExpenseTypes ? "minus" : "plus"}
                    size={24}
                    mode="contained"
                    iconColor="white"
                    containerColor={theme.colors.primary}
                    onPressIn={() => setOpenExpenseTypes((prev) => !prev)}
                />
            </View>
            {openExpenseTypes && (
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        marginTop: 20,
                    }}
                >
                    {[...new Array(2)].map((item, index) => {
                        return <IncomeTypeItem key={index} />;
                    })}
                </View>
            )}

            <CreateAndUpdateIncomeTypes
                open={openCreateIncomeTypeModal}
                setOpen={setOpenCreateIncomeTypeModal}
                action="create"
            />

            {!openCreateIncomeTypeModal && (
                <Portal>
                    <FAB
                        icon="plus"
                        style={{
                            position: "absolute",
                            margin: 30,
                            right: 0,
                            bottom: 0,
                            borderRadius: 100,
                            backgroundColor: theme.colors.primary,
                        }}
                        onPress={() => setOpenCreateIncomeTypeModal(true)}
                        color="white"
                        customSize={56} // optional
                    />
                </Portal>
            )}
        </ScrollView>
        // </SafeAreaView>
    );
};

export default IncomeTypes;

const IncomeTypeItem = () => {
    return (
        <Card>
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                }}
            >
                <View>
                    <Text variant="titleMedium">Gari Vara</Text>
                    <Text variant="labelSmall">Gari Vara</Text>
                </View>
                <Button textColor="white">500</Button>
            </View>
        </Card>
    );
};

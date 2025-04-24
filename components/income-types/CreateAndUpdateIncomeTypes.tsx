import { IIncomeAndExpenseItem } from "@/types/income.types";
import React, { useState } from "react";
import { View } from "react-native";
import {
    Button,
    Dialog,
    Menu,
    Portal,
    Text,
    TextInput,
    useTheme,
} from "react-native-paper";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Dropdown } from "react-native-paper-dropdown";
import Toast from "react-native-toast-message";
import { ref } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";
import { INCOME_EXPENSE_TYPES_PATH } from "@/api/databaseRef";
import useIncomeAndExpenseTypes from "@/hooks/useIncomeAndExpenseTypes";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    action?: "create" | "update";
    incomeType?: IIncomeAndExpenseItem;
}
const OPTIONS: { label: string; value: "income" | "expense" }[] = [
    { label: "Income", value: "income" },
    { label: "Expense", value: "expense" },
];

const CreateAndUpdateIncomeTypes: React.FC<Props> = ({
    open,
    setOpen,
    action = "create",
    incomeType,
}) => {
    const theme = useTheme();
    const [data, setData] = useState<IIncomeAndExpenseItem>({
        id: "",
        title: "",
        description: "",
        type: "income",
    });
    const [isOpenIncomeTypeMenu, setIsOpenIncomeTypeMenu] = useState(false);
    const { update, updateLoading, create, createLoading } =
        useIncomeAndExpenseTypes();

    const createData = async () => {
        const id: string = new Date().getTime().toString();
        const finalType: IIncomeAndExpenseItem = {
            ...data,
            id: id,
        };
        return create(finalType);
    };

    const handleSubmit = async () => {
        try {
            //validate req

            if (!data.title?.trim() || !data.type?.trim()) {
                Toast.show({
                    type: "error",
                    text1: "Validation Failed",
                    text2: "Please enter title and type",
                });
                return;
            }

            if (action === "create") {
                const res = await createData();
                if (res?.id) {
                    Toast.show({
                        type: "success",
                        text1: "Data Successfully Created",
                    });
                }
            } else {
                const res = await update(data);
                if (res?.id) {
                    Toast.show({
                        type: "success",
                        text1: "Data Successfully Updated",
                    });
                }
            }
        } catch {
            Toast.show({
                type: "error",
                text1: "Something wen't wrong",
            });
        }
    };
    return (
        <Portal>
            <Dialog
                style={
                    {
                        // backgroundColor: theme.colors.primary,
                    }
                }
                visible={open}
                onDismiss={() => setOpen(false)}
            >
                <Dialog.Title>
                    {action === "create"
                        ? "Create Income or Expense Type"
                        : "Update Income or Expense Type"}
                </Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        mode="outlined"
                        // outlineStyle={{
                        //     borderColor: "white",
                        // }}
                        activeOutlineColor="gray"
                        label="Title"
                        placeholder="Income or Expense Title"
                        style={{
                            marginBottom: 20,
                        }}
                        value={data.title}
                        onChangeText={(val) =>
                            setData((prev) => ({ ...prev, title: val }))
                        }
                    />
                    <Dropdown
                        mode="outlined"
                        label="Type"
                        placeholder="Select Type"
                        options={OPTIONS}
                        value={data.type}
                        onSelect={(val: any) =>
                            setData((prev) => ({ ...prev, type: val }))
                        }
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        mode="outlined"
                        textColor="white"
                        onPress={() => setOpen(false)}
                        style={{ paddingHorizontal: 20 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        mode="contained"
                        // textColor="white"
                        onPress={() => handleSubmit()}
                        style={{ paddingHorizontal: 20 }}
                    >
                        Create
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default CreateAndUpdateIncomeTypes;

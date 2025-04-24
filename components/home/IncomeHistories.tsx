import useIncomeAndExpenseTypes from "@/hooks/useIncomeAndExpenseTypes";
import { ITransactionType } from "@/types/income.types";
import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Button, Card, Text } from "react-native-paper";

interface ITransectionTypeHeading {
    title: string;
    value: ITransactionType;
}

const headingList: ITransectionTypeHeading[] = [
    {
        title: "Expense",
        value: "expense",
    },
    {
        title: "Loan Taken",
        value: "loan_taken",
    },
    {
        title: "Loan Given",
        value: "loan_given",
    },
    {
        title: "Income",
        value: "income",
    },
];

const IncomeHistories = () => {
    const [currentTransectionType, setCurrentTransectionType] =
        useState<ITransactionType>("expense");

    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 5,
                    }}
                >
                    {headingList.map((item, index) => {
                        return (
                            <View key={index}>
                                <Button
                                    onPress={() =>
                                        setCurrentTransectionType(item.value)
                                    }
                                    textColor="white"
                                    mode={
                                        item.value === currentTransectionType
                                            ? "contained"
                                            : "outlined"
                                    }
                                >
                                    {item.title}
                                </Button>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 20,
                }}
            >
                {[...new Array(20)].map((item, index) => {
                    return (
                        <Card key={index}>
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
                })}
            </View>
        </View>
    );
};

export default IncomeHistories;

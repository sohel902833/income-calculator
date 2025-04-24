import { INCOME_EXPENSE_TYPES_PATH } from "@/api/databaseRef";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/firebaseConfig";
import { IIncomeAndExpenseItem } from "@/types/income.types";
import { get, ref, set, update as updateData, remove } from "firebase/database";
import { useState } from "react";

const useIncomeAndExpenseTypes = () => {
    const { currentUser } = useAuth();
    const [createLoading, setCreateLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [getLoading, setGetLoading] = useState(false);

    const [dataList, setDataList] = useState<
        Record<string, IIncomeAndExpenseItem>
    >({});

    const create = async (data: IIncomeAndExpenseItem) => {
        try {
            setCreateLoading(true);
            const dataRef = ref(
                db,
                `${INCOME_EXPENSE_TYPES_PATH}/${currentUser?.id}/${data.id}`
            );
            await set(dataRef, data);
            return data;
        } catch (err) {
            console.log("Err", err);
        } finally {
            setCreateLoading(false);
        }
    };
    const readAll = async () => {
        try {
            setGetLoading(true);
            const dataRef = ref(
                db,
                `${INCOME_EXPENSE_TYPES_PATH}/${currentUser?.id}`
            );
            const res = await get(dataRef);
            if (res?.exists() && res?.val()) {
                const values: Record<string, IIncomeAndExpenseItem> =
                    res?.val();
                setDataList(values);
                console.log("Values", values);
            }
            return [];
        } finally {
            setGetLoading(false);
        }
    };
    const update = async (data: IIncomeAndExpenseItem) => {
        try {
            setUpdateLoading(true);
            const dataRef = ref(
                db,
                `${INCOME_EXPENSE_TYPES_PATH}/${currentUser?.id}/${data.id}`
            );
            await updateData(dataRef, data);
            return data;
        } catch (err) {
            console.log("Err", err);
        } finally {
            setUpdateLoading(false);
        }
    };
    const deleteData = async (id: string) => {
        try {
            setDeleteLoading(true);
            const dataRef = ref(
                db,
                `${INCOME_EXPENSE_TYPES_PATH}/${currentUser?.id}/${id}`
            );
            await remove(dataRef);
        } finally {
            setDeleteLoading(false);
        }
    };
    return {
        create,
        deleteData,
        readAll,
        update,
        deleteLoading,
        createLoading,
        getLoading,
        updateLoading,
        dataList,
    };
};

export default useIncomeAndExpenseTypes;

import { ref, getDatabase, DatabaseReference } from "firebase/database";
import "@/firebase/firebaseConfig";
const db = getDatabase();

export const USER_DATA_PATH = "IncomeCalculator/Users";
export const INCOME_EXPENSE_TYPES_PATH = "IncomeCalculator/IncomeExpenseTypes";

export const USER_REF: DatabaseReference = ref(db, USER_DATA_PATH);

export enum TransectionType {
    Income = "income",
    Expense = "expense",
    LoanGiven = "loan_given",
    LoanTaken = "loan_taken",
}
export type ITransactionType =
    | "income"
    | "expense"
    | "loan_given"
    | "loan_taken";

export type IIncomeAndExpenseItem = {
    id: string;
    title: string;
    description?: string;
    type: "income" | "expense";
};

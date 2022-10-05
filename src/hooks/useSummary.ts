import { TransactionsContext } from "../contexts/TransactionsContext";
import { useContext } from "react";

export function useSummary() {
  const { transactions } = useContext(TransactionsContext);
  
  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      acc.incomes += transaction.price;
      acc.total += transaction.price;
    } else {
      acc.outcomes += transaction.price;
      acc.total -= transaction.price;
    }
    
    return acc;
  }, {
    incomes: 0,
    outcomes: 0,
    total: 0,
  });

  return summary;
}
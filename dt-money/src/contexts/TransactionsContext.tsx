import { ReactNode, createContext, useEffect, useState } from "react";

interface ITransaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface ITransactionContextType {
  transactions: ITransaction[];
}

interface ITransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<ITransactionContextType>({
  transactions: [],
});

export function TransactionsProvider({ children }: ITransactionProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  async function loadTransactions() {
    const res = await fetch("http://localhost:3333/transactions");
    const data = await res.json();

    setTransactions(data);
  }
  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}

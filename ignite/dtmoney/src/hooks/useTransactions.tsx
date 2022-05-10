import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface TransactionProps {
  id: number;
  title: string;
  category: string;
  type: string;
  value: number;
  createdAt: string;
}

type TransactionInput = Omit<TransactionProps, 'id' | 'createdAt'>

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionContextData {
  transactions: TransactionProps[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions));
  }, [])


  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider 
      value={{ transactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
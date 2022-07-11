import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';


interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

//TransactionInput vai herdar tudo de Transaction, menos id e createdAt
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

//é o mesmo esquema de cima, mas vai herdar tudo que eu informar
//type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category' '>

interface TransactionsProviderProps {
    children: ReactNode; //Aceita qualquer tipo de conteudo valido para o React
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData //enganando o type script
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    //para ir até a API
    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        })
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ]);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}  
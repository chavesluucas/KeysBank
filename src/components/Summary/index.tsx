import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from "./styles";

export function Summary() {

    const { transactions } = useTransactions();


    // const totalDeposit = transactions.reduce((acc, transaction) => {
    //     if(transaction.type === 'deposit'){
    //         return acc + transaction.amount;
    //     }

    //     return acc;
    // }, 0)

    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'deposit') {
            //se for deposito, vai somar os valores do amount com o deposito
            acc.deposits += transaction.amount;
            //Aqui vai somar o valor do deposito com o total
            acc.total += transaction.amount;
        } else {
            //caso não for um deposótio, será um withdraw, com isso vai somar os withdraws
            acc.withdraws += transaction.amount;
            //Aqui vai diminuir no valor total, para então informar o valor real
            acc.total -= transaction.amount;
        }

        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
    })

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)
                    }
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.withdraws)
                    }
                </strong>
            </div>
            <div className='highlight-background'>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.total)
                    }
                </strong>
            </div>
        </Container>
    )
}
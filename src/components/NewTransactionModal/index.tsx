import { FormEvent, useState } from "react";

import Modal from "react-modal";
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from "../../assets/close.svg"

import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();

    const [ title, setTitle ] = useState('');
    const [ amount, setAmount ] = useState(0);
    const [ category, setCategory ] = useState('');
    const [ type, setType ] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        })

        //para reiniciar o formulário
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        //para fechar o modal quando criar um Transaction
        onRequestClose();

    }

    return (
        <Modal
            isOpen={isOpen} //para abrir, como o isNewTrans... está setado lá em cima como false, vai começar fechado
            onRequestClose={onRequestClose} //para executar essa função quando o usuario pedir para fechar, lembrando que esse modal é uma lib chamada "React-Modal", que já vem de fabrica para fechar quando apertar esc, por exemplo
            overlayClassName="react-modal-overlay" //vamos criar uma estilização para esse modal do zero
            className="react-modal-content"
        >

            <button type="button"
            onClick={onRequestClose}
            className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar Modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transição</h2>

                <input
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)} //conseguimos pegar pelo valor digitado no input
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('deposit') }}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => { setType('withdraw') }}
                        isActive={type === 'withdraw'}
                        activeColor="red"

                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    )
}
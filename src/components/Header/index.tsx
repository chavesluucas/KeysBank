//importando a logo
import logoImg from '../../assets/logo.svg';

import { Container, Content } from './styles'

interface HeaderProps{
    onOpenNewTransactionModal: () => void;
}

//primeiro te tudo, digitamos a função e colocamos um returno para ela
export function Header({ onOpenNewTransactionModal }: HeaderProps){

    return(
        <Container>
            <Content>

            <img src={logoImg} alt="KeysBank" />
            <button type="button" onClick={onOpenNewTransactionModal}>
                Nova Transação
            </button>

            </Content>
        </Container>
    )
}
import { useState } from 'react';
import Modal from 'react-modal'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { NewTransactionModal } from './components/NewTransactionModal';
import { GlobalStyle } from './styles/global'
import { TransactionsProvider } from './hooks/useTransactions';

//questão de acessibilidade
Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);


  function handleOpenNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    //TransactionsContext.Provider é o contexto, e o provider sempre precisa receber um valor
    <TransactionsProvider>

      {/* Importando o componente de Header */}
      <Header
        onOpenNewTransactionModal={handleOpenNewTransactionModalOpen}
      />

      {/* Importando o comnponente Dashboard */}
      <Dashboard />

      {/* Importando o Modal */}
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModalOpen}
      />

      {/* Importando o style global */}
      <GlobalStyle />

    </TransactionsProvider>
  )
}
import { useState } from 'react';
import Modal from 'react-modal';

import { Dashboard } from "./components/Dashboard";
import { NewTransactionModal } from './components/NewTransactionModal';
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { TransactionProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }
  
  return (
    <TransactionProvider>
      <Header onHandleOpenModal={handleOpenModal} />
      
      <Dashboard />

      <NewTransactionModal 
        isOpen={isModalOpen} 
        onRequestClose={handleCloseModal}
      />

      <GlobalStyle />
    </TransactionProvider>
  );
}

import { Transaction } from 'ethereumjs-tx';
import React from 'react';
import './App.css';
import ReadContract from './Components/readcontract';
import TransactionContract from './Components/transaction';
import WriteContract from './Components/writecontract';

function App() {
  console.log('exrctvyu');
  
  return (
    <div>
      <ReadContract />
    <TransactionContract />
    </div>
  );
}

export default App;

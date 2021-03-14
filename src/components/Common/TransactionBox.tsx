import { useState } from 'react';
import { useWeb3Context } from '../../context/Web3';
import NumericInput from './NumericInput';

function TransactionBox() {
  const {
    state: { account },
  } = useWeb3Context();
  const [amount, setAmount] = useState(0);
  return (
    <div
      className={
        'relative p-9 inline-flex flex-col text-white bg-black rounded-3xl bg-opacity-50 border border-gray-200 ' +
        (!account ? 'opacity-50' : '')
      }
    >
      <h3 className="text-4xl text-center mb-12">SEND</h3>
      <NumericInput
        value={amount}
        onChange={setAmount}
        currency="rBTC"
        label="Amount:"
        multiselect={true}
      />

      {!account && (
        <div className="top-0 left-0 w-full h-full absolute z-10"></div>
      )}
    </div>
  );
}

export default TransactionBox;

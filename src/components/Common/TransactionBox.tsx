import { useState } from 'react';
import { useWeb3Context } from '../../context/Web3';
import Assets from './Assets';
import NumericInput from './NumericInput';
import BlockWrapper from './BlockWrapper';
import { weiToEther } from '../../lib/utils';

function TransactionBox() {
  const {
    state: { account, balance },
  } = useWeb3Context();

  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState('');
  const [activeAsset, setActiveAsset] = useState('rETH');

  return (
    <div
      className={
        'relative p-9 inline-flex flex-col text-white bg-black rounded-3xl bg-opacity-50 border border-gray-200 ' +
        (!account ? 'opacity-50' : '')
      }
    >
      <h3 className="text-4xl text-center mb-12">SEND</h3>

      <BlockWrapper className="mb-9" label="Assets:">
        <Assets
          activeAsset={activeAsset}
          setActiveAsset={setActiveAsset}
          balance={weiToEther(balance)}
        />
      </BlockWrapper>

      <BlockWrapper className="mb-9" label="Amount:">
        <NumericInput
          value={amount}
          onChange={setAmount}
          currency={activeAsset}
          multiselect={true}
          max={weiToEther(balance)}
        />
      </BlockWrapper>

      <BlockWrapper className="mb-10" label="Send To:">
        <input
          className="focus:outline-none text-black h-10 w-full px-4 rounded-lg text-center"
          placeholder="Type or Paste address"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
      </BlockWrapper>

      <button
        //validate receiver address length (42char)
        disabled={!amount || receiver.length !== 42}
        className="mx-auto font-semibold uppercase text-black bg-cta rounded py-3 focus:outline-none disabled:opacity-25 w-48"
      >
        Submit
      </button>

      {!account && (
        <div className="top-0 left-0 w-full h-full absolute z-10"></div>
      )}
    </div>
  );
}

export default TransactionBox;

import { useState } from 'react';
import { useWeb3Context } from '../../../context/Web3';
import { etherToWei, stringEllipse, weiToEther } from '../../../lib/utils';
import TransactionForm from './TransactionForm';
import TransactionResult from './TransactionResult';
import TransactionReview from './TransactionReview';

// import Fade from 'react-reveal/Fade';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';

export interface ITransactionForm {
  asset: string;
  amount: number;
  from: string;
  to: string;
  fee?: number;
}

function TransactionBox() {
  const {
    state: { web3, weenus, account },
    UpdateWeenusBalance,
  } = useWeb3Context();

  const [transactionHash, setTransactionHash] = useState('');
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ITransactionForm>({
    asset: '',
    amount: 0,
    from: '',
    to: '',
    fee: 0,
  });

  const reviewForm = async (payload: ITransactionForm) => {
    const { amount, asset, from, to } = payload;
    const gasPrice = await web3?.eth.getGasPrice();
    if (asset === 'rETH') {
      const gasLimit = await web3?.eth.estimateGas({
        from,
        to,
        gasPrice,
      });
      if (gasPrice !== undefined && gasLimit !== undefined)
        payload.fee = weiToEther(`${parseFloat(gasPrice) * gasLimit}`);
    } else if (asset === 'WEENUS') {
      const gasLimit = await weenus.methods
        .transfer(to, web3?.utils.toWei(`${amount}`, 'ether'))
        .estimateGas({
          to,
          gasPrice,
        });
      if (gasPrice !== undefined && gasLimit !== undefined)
        payload.fee = weiToEther(`${parseFloat(gasPrice) * gasLimit}`);
    }

    setForm(payload);
    setStep(2);
  };

  const updateWeenus = async () => {
    const weenusBalance = await weenus.methods.balanceOf(account).call();
    UpdateWeenusBalance({ weenusBalance });
  };

  const handleTransaction = (onSuccess: Function = () => {}) => (
    err: Error | null,
    hash: string
  ) => {
    if (err) return console.error(err);

    setTransactionHash(hash);
    setStep(3);

    const checkTransaction = setInterval(() => {
      web3?.eth.getTransactionReceipt(hash, (err, receipt) => {
        if (err) return console.log(err);
        if (receipt) {
          if (receipt.status) {
            toast.success(
              `Transaction ${stringEllipse(hash)} Successfully mined!`
            );
            onSuccess();
          } else {
            toast.error(`Transaction ${stringEllipse(hash)} reverted!`);
          }
          clearInterval(checkTransaction);
        }
      });
    }, 5000);
  };

  const submitTransaction = async () => {
    const { to, from, amount, asset } = form;
    if (web3) {
      if (asset === 'rETH') {
        web3.eth.sendTransaction(
          {
            to,
            from,
            value: `${etherToWei(amount)}`,
          },
          handleTransaction()
        );
      } else if (asset === 'WEENUS') {
        weenus.methods
          .transfer(to, web3.utils.toWei(`${amount}`, 'ether'))
          .send({ from: account }, handleTransaction(updateWeenus));
      }
    }
  };

  return (
    <div
      className="transaction-box p-9 border border-gray-200 text-white bg-black bg-opacity-50 rounded-3xl"
      style={{ width: 400 }}
    >
      <SwitchTransition>
        <CSSTransition
          key={step}
          classNames="fade"
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
        >
          <div>
            {step === 1 && <TransactionForm submit={reviewForm} />}

            {step === 2 && (
              <TransactionReview submit={submitTransaction} form={form} />
            )}

            {step === 3 && (
              <TransactionResult
                close={() => setStep(1)}
                hash={transactionHash}
              />
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default TransactionBox;

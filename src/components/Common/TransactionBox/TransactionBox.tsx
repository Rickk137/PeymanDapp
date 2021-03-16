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
    const fee = await web3?.eth.estimateGas({
      from: payload.from,
      to: payload.to,
      value: `${etherToWei(payload.amount)}`,
    });

    payload.fee = fee;

    setForm(payload);
    setStep(2);
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
          (err, hash) => {
            if (err) return console.error(err);

            setTransactionHash(hash);
            setStep(3);

            const checkTransaction = setInterval(() => {
              web3.eth.getTransactionReceipt(hash, (err, receipt) => {
                if (err) return console.log(err);
                if (receipt) {
                  if (receipt.status) {
                    toast.success(
                      `Transaction ${stringEllipse(hash)} Successfully mined!`
                    );
                  } else {
                    toast.error(`Transaction ${stringEllipse(hash)} reverted!`);
                  }
                  clearInterval(checkTransaction);
                }
              });
            }, 5000);
          }
        );
      } else if (asset === 'WEENUS') {
        try {
          const success = await weenus.methods.transfer(to, 1000).call();
          // .send({
          //   from: account,
          //   gas: 21000,
          //   gasPrice: '100',
          // });
          if (success) {
            toast.success(`Transaction created!`);
          } else throw new Error('Error happened');

          setStep(3);
        } catch (error) {
          console.error('error tx', error);
          toast.error(`Transaction reverted!`);
        }
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

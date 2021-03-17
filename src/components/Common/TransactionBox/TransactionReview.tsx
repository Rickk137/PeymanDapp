import { ITransactionForm } from './TransactionBox';

interface TransactionReviewProps {
  form: ITransactionForm;
  submit: Function;
}

function TransactionReview({ form, submit }: TransactionReviewProps) {
  return (
    <div className="relative inline-flex flex-col text-white w-full">
      <h3 className="text-2xl text-center mb-12">Review Transaction</h3>

      <div className="flex text-lg flex-col items-center mb-10">
        <span>SEND</span>
        <span>
          {form.amount} {form.asset}
        </span>
      </div>

      <p className="truncate">From: {form.from}</p>

      <img
        className="self-center my-7"
        src="/images/icons/arrowDown.svg"
        alt="arrow"
        width="30"
      />

      <p className="mb-10 truncate">To: {form.to}</p>

      {form.fee && (
        <p className="flex items-center justify-between mb-9 px-10">
          TxFee: <span>{`${form.fee}`.substr(0, 10)} rEth</span>
        </p>
      )}

      <button
        className="text-xl mx-auto uppercase text-black bg-cta rounded-lg py-3 focus:outline-none w-48"
        onClick={() => submit()}
      >
        Confirm
      </button>
    </div>
  );
}

export default TransactionReview;

import { stringEllipse } from '../../../lib/utils';

interface TransactionResultProps {
  hash: string;
  close: Function;
}

function TransactionResult({ hash, close }: TransactionResultProps) {
  return (
    <div className="relative inline-flex flex-col text-white w-full">
      <h3 className="text-2xl text-center">Transaction Details</h3>

      <img
        className="self-center mt-6 mb-2"
        src="/images/icons/check-green.svg"
        alt="arrow"
        width="62"
      />

      <p className="text-center">Status Pending</p>

      {hash && (
        <p className="mt-9 text-center">
          Tx Hash: <span className="text-cta">{stringEllipse(hash)}</span>
        </p>
      )}

      <button
        className="mt-9 mx-auto font-semibold uppercase text-black bg-cta rounded py-3 focus:outline-none w-48"
        onClick={() => close()}
      >
        CLOSE
      </button>
    </div>
  );
}

export default TransactionResult;

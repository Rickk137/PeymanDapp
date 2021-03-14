import { stringEllipse } from '../../lib/utils';

interface EngageWalletProps {
  account: string;
  engageWallet: Function;
  loading?: boolean;
}

function EngageWallet({
  account,
  engageWallet,
  loading = false,
}: EngageWalletProps) {
  return account ? (
    <div className="flex row items-center rounded-lg text-white bg-gray-300 overflow-hidden">
      <span className="px-4">{stringEllipse(account)}</span>
      <span className="flex row items-center content-center bg-gray-100 p-2">
        <img
          className="cursor-pointer"
          src="/images/icons/exit.svg"
          alt="ex"
          width="18"
          height="18"
        />
      </span>
    </div>
  ) : (
    <button
      onClick={() => engageWallet()}
      disabled={loading}
      className="border border-4 border-cta rounded-lg text-cta px-3.5 py-1 focus:outline-none disabled:opacity-50"
    >
      Engage Wallet
    </button>
  );
}

export default EngageWallet;

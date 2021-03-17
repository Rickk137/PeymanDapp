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
      <span className="flex row items-center px-4 text-sm">
        {stringEllipse(account)}
        <img
          className="ml-2"
          src="/images/accountImg.png"
          alt="ac"
          width="22"
          height="22"
        />
      </span>
      <span className="flex row items-center content-center bg-gray-100 p-2">
        <img
          className="cursor-pointer"
          src="/images/icons/exit.svg"
          alt="ex"
          width="22"
          height="22"
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

import { stringEllipse } from "../../lib/utils";

interface EngageWalletProps {
  wallet: string;
  engageWallet: Function;
}

function EngageWallet({ wallet, engageWallet }: EngageWalletProps) {
  return wallet ? (
    <div className="flex row items-center rounded-lg text-white bg-gray-200 overflow-hidden">
      <span className="px-4">{stringEllipse(wallet)}</span>
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
      className="border border-4 border-cta rounded-lg text-cta px-3.5 py-1 focus:outline-none"
    >
      Engage Wallet
    </button>
  );
}

export default EngageWallet;

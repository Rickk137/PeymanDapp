import { useEffect, useState } from 'react';
import EngageWallet from '../Common/EngageWallet';
import { useWeb3Context } from '../../context/Web3';
import { unlockAccount } from '../../lib/web3';
const {
  WEENUS_TOKEN_ADDRESS,
  WEENUS_TOKEN_ABI,
} = require('../../config/WeenusToken');

function Header() {
  const {
    state: { account, web3 },
    UpdateAccount,
    UpdateWeb3,
    UpdateWeenus,
    UpdateWeenusBalance,
  } = useWeb3Context();
  const [loading, setLoading] = useState(false);

  const updateWeenus = async () => {
    if (web3 && account) {
      const weenus = await new web3.eth.Contract(
        WEENUS_TOKEN_ABI,
        WEENUS_TOKEN_ADDRESS
      );
      const weenusBalance = await weenus.methods.balanceOf(account).call();

      UpdateWeenus({ weenus });
      UpdateWeenusBalance({ weenusBalance });
    }
  };

  const engageWallet = async () => {
    setLoading(true);
    try {
      const { account, web3 } = await unlockAccount();
      UpdateWeb3({ web3 });
      UpdateAccount({ account });
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    updateWeenus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, web3]);

  return (
    <header className="flex row items-center justify-between bg-black px-8 py-2">
      <img
        src="images/Primary Logo - white.png"
        alt="Logo"
        width="216"
        className="hidden md:block"
      />
      <EngageWallet
        engageWallet={engageWallet}
        account={account}
        loading={loading}
      />
    </header>
  );
}

export default Header;

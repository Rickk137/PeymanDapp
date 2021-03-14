import { useEffect, useState } from 'react';
import EngageWallet from '../Common/EngageWallet';
import { useWeb3Context } from '../../context/Web3';
import { unlockAccount } from '../../lib/web3';
// const {
//   WEENUS_TOKEN_ADDRESS,
//   WEENUS_TOKEN_ABI,
// } = require('../../config/WeenusToken');

function Header() {
  const {
    state: { account },
    UpdateAccount,
    UpdateWeb3,
  } = useWeb3Context();
  const [loading, setLoading] = useState(false);

  // const ethEnabled = async () => {
  //   try {
  //     if (window.ethereum) {
  //       setWeb3();
  //       if (web3) {
  //         window.web3 = web3;
  //         window.ethereum.enable();

  //         if (accounts[0]) setWallet(accounts[0]);

  //         const weenusTokenObj = await new web3.eth.Contract(
  //           WEENUS_TOKEN_ABI,
  //           WEENUS_TOKEN_ADDRESS
  //         );

  //         //@ts-ignore
  //         setWeenusToken(weenusTokenObj);
  //         const balance = await weenusTokenObj.methods
  //           .balanceOf(accounts[0])
  //           .call();

  //         console.log("balance:", balance);
  //       }
  //     }
  //   } catch (error) {}
  // };

  // const transfer = async () => {
  //   const accounts = await web3.eth.getAccounts();
  //   await web3.eth.sendTransaction({
  //     from: accounts[0],
  //     to: WEENUS_TOKEN_ADDRESS,
  //     value: "1",
  //   });
  // };

  const engageWallet = async () => {
    setLoading(true);
    try {
      const { account, web3, network } = await unlockAccount();
      UpdateAccount({ account });
      UpdateWeb3({ web3 });
    } catch (error) {}
    setLoading(false);
  };

  return (
    <header className="flex row items-center justify-between bg-black px-8 py-2">
      <img src="images/Primary Logo - white.png" alt="Logo" width="216" />
      <EngageWallet engageWallet={engageWallet} account={account} loading={loading} />
    </header>
  );
}

export default Header;

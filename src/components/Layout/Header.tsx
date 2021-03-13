import React, { useEffect, useState } from "react";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
    web3: Web3;
  }
}

function Header() {
  const [wallet, setWallet] = useState("");

  const ethEnabled = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      window.web3 = web3;
      window.ethereum.enable();

      const network = await web3.eth.net.getNetworkType();
      const accounts = await web3.eth.getAccounts();
      if (accounts[0]) setWallet(accounts[0]);
      console.log("network:", network, accounts);
      return true;
    }
    return false;
  };

  useEffect(() => {
    ethEnabled();
  }, []);

  return (
    <header>
      <button onClick={ethEnabled}> {wallet || "Engage Wallet"}</button>
    </header>
  );
}

export default Header;

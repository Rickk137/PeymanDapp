import React, { useEffect, useState } from "react";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
    web3: Web3;
  }
}

const ethEnabled = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);

    window.web3 = web3;
    window.ethereum.enable();

    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts();
    console.log("network:", network, accounts);
    return true;
  }
  return false;
};

function Header() {
  useEffect(() => {
    ethEnabled();
  }, []);

  return (
    <header>
      <button>Engage Wallet</button>
    </header>
  );
}

export default Header;

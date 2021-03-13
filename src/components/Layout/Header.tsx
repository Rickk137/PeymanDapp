import React, { useEffect, useState } from "react";
import Web3 from "web3";
const {
  WEENUS_TOKEN_ADDRESS,
  WEENUS_TOKEN_ABI,
} = require("../../config/WeenusToken");
declare global {
  interface Window {
    ethereum: any;
    web3: Web3;
  }
}

function Header() {
  const [wallet, setWallet] = useState("");
  const [web3, setWeb3] = useState({} as Web3);
  const [weenusToken, setWeenusToken] = useState(null);

  const ethEnabled = async () => {
    try {
      if (window.ethereum) {
        setWeb3(new Web3(window.ethereum));
        if (web3) {
          window.web3 = web3;
          window.ethereum.enable();

          const network = await web3.eth.net.getNetworkType();
          const accounts = await web3.eth.getAccounts();
          if (accounts[0]) setWallet(accounts[0]);

          const weenusTokenObj = await new web3.eth.Contract(
            WEENUS_TOKEN_ABI,
            WEENUS_TOKEN_ADDRESS
          );

          //@ts-ignore
          setWeenusToken(weenusTokenObj);
          const balance = await weenusTokenObj.methods
            .balanceOf(accounts[0])
            .call();

          console.log("balance:", balance);
        }
      }
    } catch (error) {}
  };

  const transfer = async () => {
    const accounts = await web3.eth.getAccounts();
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: WEENUS_TOKEN_ADDRESS,
      value: "1",
    });
  };

  useEffect(() => {
    ethEnabled();
  }, []);

  return (
    <header className="flex row items-center justify-between bg-black px-8 py-2">
      <img src="images/Primary Logo - white.png" alt="Logo" width="216" />
      <button className="border border-4 border-cta rounded-xl text-cta px-3.5 py-1 focus:outline-none" onClick={ethEnabled}> {wallet || "Engage Wallet"}</button>
    </header>
  );
}

export default Header;

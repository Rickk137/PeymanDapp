import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any;
  }
}

export async function unlockAccount() {
  const ethereum = window.ethereum;

  if (!ethereum) throw new Error('Web3 is not detected!');

  const web3 = new Web3(ethereum);
  await ethereum.enable();

  const network = await web3.eth.net.getNetworkType();
  const accounts = await web3.eth.getAccounts();

  return { web3, account: accounts[0] || '', network };
}

export function web3Checker(
  web3: Web3,
  cb: (
    account: string | null,
    network: string | null,
    error: Error | null
  ) => any
) {

  const intervalId = setInterval(async () => {
    try {
      const network = await web3.eth.net.getNetworkType();
      const accounts = await web3.eth.getAccounts();
      cb(accounts[0] || '', network || '', null);
    } catch (error) {
      cb(null, null, error);
    }
  }, 1000);

  return () => clearInterval(intervalId);
}

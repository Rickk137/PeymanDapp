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

  // const network = await web3.eth.net.getNetworkType();
  const accounts = await web3.eth.getAccounts();
  const balance = await web3.eth.getBalance(accounts[0]);

  return { web3, account: accounts[0] || '', balance };
}

export function web3Checker(
  web3: Web3,
  cb: (account: string, balance: string, error: Error | null) => any
) {
  const intervalId = setInterval(async () => {
    try {
      // const network = await web3.eth.net.getNetworkType();
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);

      cb(accounts[0] || '', balance, null);
    } catch (error) {
      cb('', '', error);
    }
  }, 1000);

  return () => clearInterval(intervalId);
}

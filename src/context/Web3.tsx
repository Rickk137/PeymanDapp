import React, {
  useReducer,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import Web3 from 'web3';
import { web3Checker } from '../lib/web3';

interface DaapState {
  web3: Web3 | null;
  account: string;
  balance: string;
  weenus: any;
  weenusBalance: string;
}

const UPDATE_WEB3 = 'UPDATE_WEB3';
const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
const UPDATE_BALANCE = 'UPDATE_BALANCE';
const UPDATE_WEENUS = 'UPDATE_WEENUS';
const UPDATE_WEENUS_BALANCE = 'UPDATE_WEENUS_BALANCE';

interface UpdateWeb3 {
  type: 'UPDATE_WEB3';
  web3: Web3 | null;
}
interface UpdateAccount {
  type: 'UPDATE_ACCOUNT';
  account: string;
}
interface UpdateBalance {
  type: 'UPDATE_BALANCE';
  balance: string;
}

interface UpdateWeenus {
  type: 'UPDATE_WEENUS';
  weenus: string;
}

interface UpdateWeenusBalance {
  type: 'UPDATE_WEENUS_BALANCE';
  weenusBalance: string;
}

type ReducerAction =
  | UpdateAccount
  | UpdateWeb3
  | UpdateBalance
  | UpdateWeenus
  | UpdateWeenusBalance;

const INITIAL_STATE: DaapState = {
  web3: null,
  account: '',
  balance: '',
  weenus: null,
  weenusBalance: '',
};

function reducer(state: DaapState = INITIAL_STATE, action: ReducerAction) {
  switch (action.type) {
    case UPDATE_WEB3:
      return {
        ...state,
        web3: action.web3,
      };

    case UPDATE_ACCOUNT:
      return {
        ...state,
        account: action.account,
      };

    case UPDATE_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };

    case UPDATE_WEENUS:
      return {
        ...state,
        weenus: action.weenus,
      };

    case UPDATE_WEENUS_BALANCE:
      return {
        ...state,
        weenusBalance: action.weenusBalance,
      };

    default:
      return state;
  }
}

const Web3Context = createContext({
  state: INITIAL_STATE,
  UpdateAccount: (_data: { account: string }) => {},
  UpdateBalance: (_data: { balance: string }) => {},
  UpdateWeb3: (_data: { web3: Web3 | null }) => {},
  UpdateWeenus: (_data: { weenus: any }) => {},
  UpdateWeenusBalance: (_data: { weenusBalance: string }) => {},
});

export function useWeb3Context() {
  return useContext(Web3Context);
}

interface ProviderProps {}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  function UpdateAccount(data: { account: string }) {
    dispatch({
      type: UPDATE_ACCOUNT,
      ...data,
    });
  }

  function UpdateBalance(data: { balance: string }) {
    dispatch({
      type: UPDATE_BALANCE,
      ...data,
    });
  }

  function UpdateWeb3(data: { web3: Web3 | null }) {
    dispatch({
      type: UPDATE_WEB3,
      ...data,
    });
  }

  function UpdateWeenus(data: { weenus: any }) {
    dispatch({
      type: UPDATE_WEENUS,
      ...data,
    });
  }
  function UpdateWeenusBalance(data: { weenusBalance: string }) {
    dispatch({
      type: UPDATE_WEENUS_BALANCE,
      ...data,
    });
  }

  return (
    <Web3Context.Provider
      value={useMemo(
        () => ({
          state,
          UpdateAccount,
          UpdateWeb3,
          UpdateBalance,
          UpdateWeenus,
          UpdateWeenusBalance,
        }),
        [state]
      )}
    >
      {children}
    </Web3Context.Provider>
  );
};

export function Updater() {
  const { state, UpdateAccount, UpdateBalance } = useWeb3Context();

  useEffect(() => {
    if (state.web3) {
      const stopChecker = web3Checker(state.web3, (account, balance, err) => {
        if (err) {
          console.error(err);
        }

        if (account !== state.account) {
          UpdateAccount({ account });
        }
        if (balance !== state.balance) {
          UpdateBalance({ balance });
        }
      });

      return stopChecker;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.web3, state.account]);

  return null;
}

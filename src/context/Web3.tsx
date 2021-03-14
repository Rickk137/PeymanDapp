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
  weenus: any;
}

const UPDATE_WEB3 = 'UPDATE_WEB3';
const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';

interface UpdateWeb3 {
  type: 'UPDATE_WEB3';
  web3: Web3 | null;
}
interface UpdateAccount {
  type: 'UPDATE_ACCOUNT';
  account: string;
}

type ReducerAction = UpdateAccount | UpdateWeb3;

const INITIAL_STATE: DaapState = {
  web3: null,
  account: '',
  weenus: null,
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

    default:
      return state;
  }
}

const Web3Context = createContext({
  state: INITIAL_STATE,
  UpdateAccount: (_data: { account: string }) => {},
  UpdateWeb3: (_data: { web3: Web3 | null }) => {},
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

  function UpdateWeb3(data: { web3: Web3 | null }) {
    dispatch({
      type: UPDATE_WEB3,
      ...data,
    });
  }

  return (
    <Web3Context.Provider
      value={useMemo(() => ({ state, UpdateAccount, UpdateWeb3 }), [state])}
    >
      {children}
    </Web3Context.Provider>
  );
};

export function Updater() {
  const { state, UpdateAccount } = useWeb3Context();

  useEffect(() => {
    if (state.web3) {
      const stopChecker = web3Checker(state.web3, (account, network, err) => {
        if (err) {
          console.error(err);
        }

        if (account !== state.account) {
          UpdateAccount({ account });
        }
      });

      return stopChecker;
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.web3, state.account]);

  return null;
}

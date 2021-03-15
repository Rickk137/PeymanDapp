import RadioButtons from './RadioButtons';

const assetList = [
  {
    id: 'rETH',
    label: 'rETH',
    icon: '/images/icons/eth.svg',
  },
  {
    id: 'WEENUS',
    label: 'WEENUS',
    icon: '/images/icons/weenus.svg',
  },
];

interface AssetsProps {
  activeAsset: string;
  setActiveAsset: Function;
  balance: number;
}

function Assets({ activeAsset, setActiveAsset, balance }: AssetsProps) {
  return (
    <div>
      <RadioButtons
        options={assetList}
        value={activeAsset}
        onChange={setActiveAsset}
      />
      <p className="mt-3 text-sm">
        Available Balance: {`${balance}`.substr(0,15)} {activeAsset}
      </p>
    </div>
  );
}

export default Assets;

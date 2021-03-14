import { useState } from 'react';
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

function Assets() {
  const [activeAsset, setActiveAsset] = useState(assetList[0].id);

  return (
    <div>
      <RadioButtons
        label="Assets:"
        options={assetList}
        value={activeAsset}
        onChange={setActiveAsset}
      />
      <p className="mt-3 text-sm">Available Balance: 20,000.00 {activeAsset}</p>
    </div>
  );
}

export default Assets;

import { useState } from "react";
import NumericInput from "./components/Common/NumericInput";
import Header from "./components/Layout/Header";

function App() {
  const [amount, setAmount] = useState(0);
  return (
    <div>
      <Header />
      <NumericInput value={amount} onChange={setAmount} currency="rBTC" label="Amount:" multiselect={true} />
    </div>
  );
}

export default App;

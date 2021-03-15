import TransactionBox from './components/Common/TransactionBox/TransactionBox';
import Header from './components/Layout/Header';

function App() {
  return (
    <div>
      <Header />
      <div className="flex justify-center pt-10">
        <TransactionBox />
      </div>
    </div>
  );
}

export default App;

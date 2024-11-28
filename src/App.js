import CurrencyConverter from "./component/CurrencyConverter";

function App() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-400">
      <h1 className="text-3xl font-bold text-white">currency converter</h1>
      <CurrencyConverter />
    </div>
  );
}

export default App;

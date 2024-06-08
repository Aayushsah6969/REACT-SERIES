import  { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currencyData, setCurrencyData] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");

  useEffect(() => {
    // Fetch currency data
    fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json")
      .then(response => response.json())
      .then(data => {
        setCurrencyData(data.usd);
        setCurrencies(Object.keys(data.usd));
      })
      .catch(error => console.error("Error fetching currency data:", error));
  }, []);

  useEffect(() => {
    if (currencyData && fromCurrency && toCurrency) {
      const rate = currencyData[toCurrency];
      setToAmount(fromAmount * rate);
    }
  }, [currencyData, fromCurrency, toCurrency, fromAmount]);

  const handleConvert = () => {
    if (currencyData) {
      const rate = currencyData[toCurrency];
      setToAmount(fromAmount * rate);
    }
  };

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  return (
    <>
      <div className="container">
        <div className="currency-converter">
          <div className="input-group">
            <input
              type="number"
              name="from"
              placeholder="0"
              className="input-field"
              value={fromAmount}
              onChange={e => setFromAmount(e.target.value)}
            />
            <select
              className="currency-select"
              value={fromCurrency}
              onChange={e => setFromCurrency(e.target.value)}
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <button className="swap-button" onClick={handleSwap}>
            Swap
          </button>
          <div className="input-group">
            <input
              type="number"
              name="to"
              placeholder="0"
              className="input-field"
              value={toAmount}
              onChange={e => setToAmount(e.target.value)}
              disabled
            />
            <select
              className="currency-select"
              value={toCurrency}
              onChange={e => setToCurrency(e.target.value)}
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <button className="convert-button" onClick={handleConvert}>
            Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

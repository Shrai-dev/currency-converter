import { useEffect, useState } from 'react';
import './App.css';
import Converter from './components/Converter/Converter';
import Header from './components/Header/Header';
import { BASE_URL } from './constants';

function App() {
	const [currencyList, setCurrencyList] = useState([]);
	const [fromCurrency, setFromCurrency] = useState();
	const [toCurrency, setToCurrency] = useState();
	const [exchangeRate, setExchangeRate] = useState();
	const [amount, setAmount] = useState(1);
	const [amountFromCurrency, setAmountFromCurrency] = useState(true);
	const [eurRates, setEurRates] = useState(0);
	const [usdRates, setUsdRates] = useState(0);

	let toAmount, fromAmount;
	if (amountFromCurrency) {
		fromAmount = amount;
		toAmount = amount * exchangeRate;
	} else {
		toAmount = amount;
		fromAmount = amount / exchangeRate;
	}

	useEffect(() => {
		fetch(`${BASE_URL}`)
			.then((res) => res.json())
			.then((data) => {
				setCurrencyList([...Object.keys(data.rates)]);
				const firstCurrency = currencyList[0];
				setFromCurrency(data.base);
				setEurRates(data.rates['UAH'].toFixed(2));
				setUsdRates((data.rates['UAH'] / data.rates['USD']).toFixed(2));
				setToCurrency(firstCurrency);
				setExchangeRate(data.rates[firstCurrency]);
			});
	}, []);

	useEffect(() => {
		if (fromCurrency && toCurrency) {
			fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
				.then((res) => res.json())
				.then((data) => setExchangeRate(data.rates[toCurrency]));
		}
	}, [fromCurrency, toCurrency]);

	function handleFromAmountChange(e) {
		setAmount(e.target.value);
		setAmountFromCurrency(true);
	}

	function handleToAmountChange(e) {
		setAmount(e.target.value);
		setAmountFromCurrency(false);
	}

	return (
		<div className='wrapper'>
			<Header eur={eurRates} usd={usdRates} />
			<main className='main'>
				<h1 className='title'>Convert</h1>
				<Converter
					currencyList={currencyList}
					selectedCurrency={fromCurrency}
					handleChangeCurrency={(e) => setFromCurrency(e.target.value)}
					handleChangeAmount={handleFromAmountChange}
					amount={fromAmount}
				/>
				<div className='equals'>=</div>
				<Converter
					currencyList={currencyList}
					selectedCurrency={toCurrency}
					handleChangeCurrency={(e) => setToCurrency(e.target.value)}
					handleChangeAmount={handleToAmountChange}
					amount={toAmount}
				/>
			</main>
		</div>
	);
}

export default App;

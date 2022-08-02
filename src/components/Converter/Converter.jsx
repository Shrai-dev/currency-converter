import React from 'react';
import './Converter.css';

export default function Converter({
	currencyList,
	selectedCurrency,
	handleChangeCurrency,
	amount,
	handleChangeAmount,
}) {
	return (
		<div>
			<input
				className='input__amount'
				type='number'
				value={amount}
				onChange={handleChangeAmount}
			/>
			<select
				className='select__currency'
				value={selectedCurrency}
				onChange={handleChangeCurrency}
			>
				{currencyList.map((currency) => {
					return (
						<option key={currency} value={currency}>
							{currency}
						</option>
					);
				})}
			</select>
		</div>
	);
}

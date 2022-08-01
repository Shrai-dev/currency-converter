import React from 'react';
import './Header.css';
import LogoIcon from '../../assets/logo.svg';

export default function Header({ usd, eur }) {
	return (
		<header className='header'>
			<img className='header__logo' src={LogoIcon} alt='' />
			<div className='header__currency'>
				<p className='header__currency-text'>EUR: {eur}UAH</p>
				<p className='header__currency-text'>USD: {usd}UAH</p>
			</div>
		</header>
	);
}

let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById('from-currency-select');
const toDropDown = document.getElementById('to-currency-select');
const result = document.getElementById('result');

currencies.forEach((currency) => {
	const options = document.createElement('option');
	options.value = currency;
	options.text = currency;
	fromDropDown.add(options);
});
currencies.forEach((currency) => {
	const options = document.createElement('option');
	options.value = currency;
	options.text = currency;
	toDropDown.add(options);
});

fromDropDown.value = 'USD';
toDropDown.value = 'INR';

let convertCurrency = () => {
	const jumlah = document.querySelector('#jumlah').value;
	const fromCurrency = fromDropDown.value;
	const toCurrency = toDropDown.value;

	if(jumlah.length != 0){
		fetch(api)
			.then(resp => resp.json())
			.then(data => {
				let fromExchangeRate = data.conversion_rates[fromCurrency];
				let toExchangeRate = data.conversion_rates[toCurrency];
				const convertionAmount = (jumlah / fromExchangeRate) * toExchangeRate;
				result.innerHTML = `${jumlah} ${fromCurrency} = ${convertionAmount.toFixed(2)}`;
				
			})
	} else {
		alert('Please fill in the amounth');
	}
};
document
	.querySelector('.convert-button')
	.addEventListener('click', convertCurrency);
window.addEventListener('load', convertCurrency);
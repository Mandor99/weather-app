// vars
const API = {
	url: 'https://api.openweathermap.org/data/2.5/',
	key: '012261cee5d1a4cd0b01a16274571eaf',
};
const country = document.querySelector('.blast__location--country');
const currentDate = document.querySelector('.blast__location--date');
const icon = document.querySelector('.temp__icon');
const degree = document.querySelector('.temp__degree');
const variation = document.querySelector('.temp__variationTemp');
const description = document.querySelector('.temp__description');
const speed = document.querySelector('.blast__wind--speed');
const humidity = document.querySelector('.blast__wind--humidity');
const form = document.getElementById('form');
const city = document.getElementById('country');
const unit = 'metric';
const iconSize = 4;

// functions
const getVal = (e) => {
	e.preventDefault();
	// e.keyCode == 13
	/*?*/ fetch(
		`${API.url}weather?q=${city.value}&units=${unit}&appId=${API.key}`,
	)
		.then((res) => res.json())
		.then((weather) => showData(weather))
		.then(() => (city.value = ''))
		.catch(() => alert('something error'));
	// : false;
};
const showData = (data) => {
	const { name, sys, main, weather, wind } = data;
	const now = new Date();
	country.innerText = `${name}, ${sys.country}`;
	currentDate.innerText = showDate(now);
	icon.innerHTML = `<img src='http://openweathermap.org/img/wn/${weather[0].icon}@${iconSize}x.png' alt='icon'/>`;
	degree.innerHTML = `${Math.floor(main.temp)}&#8451;`;
	variation.innerHTML = `${Math.floor(main.temp_max)}&#8451; / ${Math.floor(
		main.temp_min,
	)}&#8451; &nbsp; feels like &nbsp; ${Math.floor(main.feels_like)}&#8451;`;
	description.innerText = weather[0].description;
	speed.innerHTML = `wind speed: &nbsp; &nbsp; ${wind.speed} Km/h`;
	humidity.innerHTML = `humidity: &nbsp; &nbsp; ${main.humidity}%`;
};
function showDate(current) {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const month = months[current.getMonth()];
	const day = days[current.getDay()];
	const date = current.getDate();
	return `${day}, ${month}, ${date}`;
}

const getCurrentLocation = () => {
	navigator.geolocation
		? navigator.geolocation.getCurrentPosition(showPosition, showError)
		: alert('Geolocation is not supported by this browser.');
};
function showPosition(position) {
	const lat = `${position.coords.latitude}`;
	const lon = `${position.coords.longitude}`;
	fetch(
		`${API.url}weather?lat=${lat}&lon=${lon}&units=${unit}&appId=${API.key}`,
	)
		.then((res) => res.json())
		.then((data) => showData(data));
}
function showError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			alert('User denied the request for Geolocation.');
			break;
		case error.POSITION_UNAVAILABLE:
			alert('Location information is unavailable.');
			break;
		case error.TIMEOUT:
			alert('The request to get user location timed out.');
			break;
		case error.UNKNOWN_ERROR:
			alert('An unknown error occurred.');
			break;
	}
}

// events
window.addEventListener('DOMContentLoaded', () => {
	city.focus();
	getCurrentLocation();
	form.addEventListener('submit', getVal);
});

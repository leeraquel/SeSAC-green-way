import { openWeatherKey } from '../../config.js';
import { seoulKey } from '../../config.js';
import { fetchWeatherInfo, fetchDustForecast } from '../api/weatherApi.js';

let storedAddress;

// sessionStorage에 'address' 항목이 있는지 확인하고, 있으면 사용하고, 없으면 기본 값을 설정
if (sessionStorage.getItem('address')) {
  storedAddress = JSON.parse(sessionStorage.getItem('address'));
} else {
  let defaultLocation = {
    address: '서울특별시 마포구 양화로 72',
    x: 126.916493990351,
    y: 37.5508138163956,
  };

  sessionStorage.setItem('address', JSON.stringify(defaultLocation));
  storedAddress = defaultLocation;
}

// 날씨 관련 dom 조작 코드
const icon = document.getElementById('weatherIcon');
const weatherTemp = document.getElementById('weatherTemp');
const weatherDesc = document.getElementById('weatherDesc');

//미세먼지 관련 dom 조작 코드
const dustContent = document.getElementById('dustContent');

// import 해온 패치 함수로 openweatherAPI 호출
fetchWeatherInfo(
  `${storedAddress.y}`,
  `${storedAddress.x}`,
  openWeatherKey
).then((weatherInfo) => {
  icon.setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`
  );
  weatherTemp.textContent = `${weatherInfo.main.temp} °C`;
  weatherDesc.textContent = weatherInfo.weather[0].description;
});

// 미세먼지 대기 환경 api 호출
fetchDustForecast(seoulKey).then((grade) => {
  dustContent.textContent = `${grade}`;
});

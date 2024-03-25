import { seoulKey } from '../../config.js';

export async function fetchWeatherInfo(y, x, openWeatherKey) {
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${y}&lon=${x}&appid=${openWeatherKey}&units=metric&lang=kr`;

  try {
    const response = await fetch(weatherApiUrl);
    if (!response.ok) throw new Error('Weather API request failed');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch weather information:', error);
    return null; // 실패한 경우 null 반환 또는 적절한 에러 처리를 수행
  }
}

// 비동기 함수로 API 호출 및 결과 출력
export async function fetchDustForecast(seoulKey) {
  const apiUrl = `http://openAPI.seoul.go.kr:8088/${seoulKey}/json/ListAirQualityByDistrictService/1/5/`;

  try {
    const response = await fetch(apiUrl); // API 호출
    if (!response.ok) {
      throw new Error('API 호출에 실패했습니다.');
    }
    const data = await response.json(); // 응답을 JSON으로 변환
    return data.ListAirQualityByDistrictService.row[0].GRADE; // 변환된 데이터를 콘솔에 출력
  } catch (error) {
    console.error('에러가 발생했습니다:', error);
  }
}

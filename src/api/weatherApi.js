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

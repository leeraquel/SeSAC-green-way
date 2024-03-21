import { seoulKey } from '../../config.js';

// fetch(`http://openapi.seoul.go.kr:8088/${seoulKey}/json/bikeList/1/100/`)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then((data) => console.log(data))
//   .catch((error) =>
//     console.error('There was a problem with your fetch operation:', error)
//   );

async function fetchBikeStatus() {
  try {
    const response = await fetch(
      `http://openapi.seoul.go.kr:8088/${seoulKey}/json/bikeList/1/100/`
    );
    const data = await response.json(); // 응답을 JSON으로 변환

    return data.rentBikeStatus.row; // 'row' 키의 배열을 반환
  } catch (error) {
    console.error('Error:', error); // 에러 처리
    return []; // 에러가 발생했을 경우 빈 배열 반환
  }
}

function processBikeStationData(rows) {
  // 각 자전거 대여소의 위도와 경도 정보를 콘솔에 출력
  rows.forEach((station) => {
    console.log(
      `Station Name: ${station.stationName}, Latitude: ${station.stationLatitude}, Longitude: ${station.stationLongitude}`
    );
  });
}

async function run() {
  const rows = await fetchBikeStatus(); // 데이터 가져오기
  processBikeStationData(rows);
  console.log(rows);
  // 데이터 처리
}

run();
let nowLo = {
  address: '서울 서대문구 대현동 110-4',
  x: 126.942297119359,
  y: 37.5587904603943,
};

// 객체를 문자열로 변환하여 저장
sessionStorage.setItem(
  'address',
  JSON.stringify({
    addressName: nowLo.address,
    x: nowLo.x,
    y: nowLo.y,
  })
);

// 저장된 문자열을 객체로 변환하여 가져옴
var value = JSON.parse(sessionStorage.getItem('address'));
console.log(value);

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // 지구의 반지름(km)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 거리(km)
  return distance;
}

async function fetchBikeStatusWithin1Km() {
  try {
    const stations = await fetchBikeStatus(); // 위에서 정의한 fetchBikeStatus 함수 호출
    const userLocation = JSON.parse(sessionStorage.getItem('address')); // 세션 스토리지에서 사용자 위치 가져오기

    const nearbyStations = stations.filter((station) => {
      const distance = haversineDistance(
        userLocation.y,
        userLocation.x,
        parseFloat(station.stationLatitude),
        parseFloat(station.stationLongitude)
      );
      return distance <= 0.5; // 1km 이내의 대여소만 필터링
    });

    return nearbyStations; // 필터링된 대여소 배열 반환
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// 이 함수를 호출하면, 사용자 위치 기준 1km 이내에 있는 대여소 정보를 포함한 배열을 얻을 수 있습니다.
fetchBikeStatusWithin1Km().then((nearbyStations) => {
  console.log(nearbyStations); // 필터링된 대여소 정보 출력
});

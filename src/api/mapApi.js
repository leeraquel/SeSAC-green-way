import { seoulKey } from '../../config.js';
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
const URL = `${PROXY}/${seoulKey}/json/bikeList/1/100/`;
const LocalURL = `http://openapi.seoul.go.kr:8088/${seoulKey}/json/bikeList/1/100`;

// 따릉이 api 호출에서 자전거 정보 배열만 받아오는 함수
async function fetchBikeStatus() {
  try {
    const response = await fetch(LocalURL);
    const data = await response.json();

    return data.rentBikeStatus.row;
  } catch (error) {
    console.error('Error:', error); // 에러 처리
    return []; // 에러가 발생했을 경우 빈 배열 반환
  }
}

// 사용자 좌표랑 대여소 좌표 받아서 거리 계산하는 함수
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

export async function getSeoulBikeStatusWithin500m() {
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

async function fetchKickgoingStatus(url) {
  try {
    const response = await fetch(url); // JSON 파일의 위치
    const data = await response.json(); // 응답을 JSON으로 변환
    return data; // 변환된 데이터 반환
  } catch (error) {
    console.error('Error:', error); // 에러 처리
    return []; // 에러가 발생했을 경우 빈 배열 반환
  }
}

export async function getKickgoingStatusWithin500m(url) {
  try {
    const stations = await fetchKickgoingStatus(url); // 위에서 정의한 fetchBikeStatus 함수 호출
    const userLocation = JSON.parse(sessionStorage.getItem('address')); // 세션 스토리지에서 사용자 위치 가져오기

    const nearbyStations = stations.filter((station) => {
      const distance = haversineDistance(
        userLocation.y,
        userLocation.x,
        parseFloat(station.y),
        parseFloat(station.x)
      );
      return distance <= 0.5; // 1km 이내의 대여소만 필터링
    });

    return nearbyStations; // 필터링된 대여소 배열 반환
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function fetchElecleStatus(url) {
  try {
    const response = await fetch(url); // JSON 파일의 위치
    const data = await response.json(); // 응답을 JSON으로 변환
    return data; // 변환된 데이터 반환
  } catch (error) {
    console.error('Error:', error); // 에러 처리
    return []; // 에러가 발생했을 경우 빈 배열 반환
  }
}

export async function getElecleStatusWithin500m(url) {
  try {
    const stations = await fetchElecleStatus(url); // 위에서 정의한 fetchBikeStatus 함수 호출
    const userLocation = JSON.parse(sessionStorage.getItem('address')); // 세션 스토리지에서 사용자 위치 가져오기

    const nearbyStations = stations.filter((station) => {
      const distance = haversineDistance(
        userLocation.y,
        userLocation.x,
        parseFloat(station.y),
        parseFloat(station.x)
      );
      return distance <= 0.5; // 500m 이내의 대여소만 필터링
    });

    return nearbyStations; // 필터링된 대여소 배열 반환
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

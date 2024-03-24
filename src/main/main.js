//session storage에 임의의 값 넣기
import {
  getSeoulBikeStatusWithin500m,
  getKickgoingStatusWithin500m,
  getElecleStatusWithin500m,
} from '../api/seoul.js';

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

const storedAddress = JSON.parse(sessionStorage.getItem('address'));

// // 저장된 주소의 좌표를 기반으로 지도의 기본 좌표 설정
// var markerPosition = new kakao.maps.LatLng(storedAddress.y, storedAddress.x);
// var marker = { position: markerPosition };
// var staticMapContainer = document.getElementById('staticMap'), // 이미지 지도를 표시할 div
//   staticMapOption = {
//     center: new kakao.maps.LatLng(storedAddress.y, storedAddress.x), // 저장된 좌표로 중심 설정
//     level: 3,
//     marker: marker,
//   };
// // 이미지 지도를 생성합니다.
// var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
// 동적 지도를 생성하고 사용자 정의 마커 이미지를 적용하는 예제 코드

// 지도 컨테이너를 선택합니다.
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(storedAddress.y, storedAddress.x), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

// 지도를 생성합니다.
var map = new kakao.maps.Map(mapContainer, mapOption);

// 사용자 정의 마커 이미지의 경로입니다.
var imageSrc = 'src/assets/icon/userMarker.svg';

// 마커 이미지의 이미지 크기 입니다.
var imageSize = new kakao.maps.Size(35, 35); // 폭과 높이

// 마커 이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
  position: map.getCenter(), // 마커의 위치
  image: markerImage, // 마커 이미지
});

// 마커가 지도 위에 표시되도록 설정합니다.
marker.setMap(map);

getSeoulBikeStatusWithin500m().then((nearbyStations) => {
  console.log(nearbyStations); // 필터링된 대여소 정보 출력
});

getKickgoingStatusWithin500m().then((nearbyStations) => {
  console.log(nearbyStations);
});

getElecleStatusWithin500m().then((nearbyStations) => {
  console.log(nearbyStations);
});

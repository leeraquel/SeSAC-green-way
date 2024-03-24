//session storage에 임의의 값 넣기
import {
  getSeoulBikeStatusWithin500m,
  getKickgoingStatusWithin500m,
  getElecleStatusWithin500m,
} from '../api/seoul.js';

let nowLo = {
  address: '서울 서대문구 신촌역로 30 신촌민자역사',
  x: 126.942387,
  y: 37.5598242,
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

// 사용자 정의 마커 이미지의 경로입니다.
const userMarkerSrc = 'src/assets/icon/userMarker.svg';
const seoulBikeMarkerImageSrc = 'src/assets/icon/seoulBikeMarker.svg';
const kickgoingMarkerImageSrc = 'src/assets/icon/kickgoingMarker.svg';
const elecleMarkerImageSrc = 'src/assets/icon/elecleMarker.svg';

function createAndAddMarker(position, imageSrc, map) {
  var imageSize = new kakao.maps.Size(36, 36); // 마커 이미지의 크기
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  var marker = new kakao.maps.Marker({
    position: position,
    image: markerImage,
  });

  marker.setMap(map);
}
// 지도 컨테이너를 선택합니다.
let mapContainer = document.getElementById('map'), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(storedAddress.y, storedAddress.x), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

// 지도를 생성합니다.
let map = new kakao.maps.Map(mapContainer, mapOption);

// 지도 생성 후 사용자의 현재 위치에 마커 추가

var userPosition = new kakao.maps.LatLng(storedAddress.y, storedAddress.x);
createAndAddMarker(userPosition, userMarkerSrc, map);

getSeoulBikeStatusWithin500m().then((stations) => {
  stations.forEach((station) => {
    var position = new kakao.maps.LatLng(
      station.stationLatitude,
      station.stationLongitude
    );
    createAndAddMarker(position, seoulBikeMarkerImageSrc, map);
  });
});

getKickgoingStatusWithin500m().then((locations) => {
  locations.forEach((location) => {
    var position = new kakao.maps.LatLng(location.y, location.x);
    createAndAddMarker(position, kickgoingMarkerImageSrc, map);
  });
});

getElecleStatusWithin500m().then((locations) => {
  locations.forEach((location) => {
    var position = new kakao.maps.LatLng(location.y, location.x);
    createAndAddMarker(position, elecleMarkerImageSrc, map);
  });
});

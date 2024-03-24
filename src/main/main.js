//session storage에 임의의 값 넣기
import {
  getSeoulBikeStatusWithin500m,
  getKickgoingStatusWithin500m,
  getElecleStatusWithin500m,
} from '../api/seoul.js';

let nowLo = {
  address: '서울특별시 마포구 양화로 72',
  x: 126.916493990351,
  y: 37.5508138163956,
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

//상단에 현재 주소 정보 띄우기
document.getElementById('nowLocationName').textContent =
  storedAddress.addressName;

// 사용자 정의 마커 이미지의 경로입니다.
const userMarkerSrc = 'src/assets/icon/userMarker.svg';
const seoulBikeMarkerImageSrc = 'src/assets/icon/seoulBikeMarker.svg';
const kickgoingMarkerImageSrc = 'src/assets/icon/kickgoingMarker.svg';
const elecleMarkerImageSrc = 'src/assets/icon/elecleMarker.svg';

const normalSize = new kakao.maps.Size(32, 32);
const clickedSize = new kakao.maps.Size(40, 40);

var currentClickedMarker = null; // 현재 클릭된 마커를 추적할 변수
var markersMap = new Map();

function createAndAddMarker(position, imageSrc, map, info, brand) {
  var markerImage = new kakao.maps.MarkerImage(imageSrc, normalSize);

  var marker = new kakao.maps.Marker({
    position: position,
    image: markerImage,
  });

  // 마커 객체와 원본 이미지 소스를 Map 객체에 저장
  // markersMap.set(marker, imageSrc);
  markersMap.set(marker, { src: imageSrc, size: normalSize });

  kakao.maps.event.addListener(marker, 'click', function () {
    // 이전에 클릭된 마커가 있으면 그 마커의 크기를 원래대로 돌림
    if (currentClickedMarker && currentClickedMarker !== marker) {
      var originalMarkerData = markersMap.get(currentClickedMarker);
      var originalMarkerImage = new kakao.maps.MarkerImage(
        originalMarkerData.src,
        originalMarkerData.size
      );
      currentClickedMarker.setImage(originalMarkerImage);
    }

    // 현재 클릭된 마커의 크기를 변경
    var clickedMarkerImage = new kakao.maps.MarkerImage(imageSrc, clickedSize);
    marker.setImage(clickedMarkerImage);

    // 현재 클릭된 마커를 추적
    currentClickedMarker = marker;
    // 클릭한 마커의 정보를 표시
    let infoCard = document.getElementById('infoCardWrapper');
    let bikeImg = document.getElementById('bikeImg');
    let logo = document.getElementById('logo');
    let title = document.getElementById('title');
    let count = document.getElementById('count');
    // let subTitle = document.getElementById('subTitle');
    let reservation = document.getElementById('reservation');

    //카드 띄우기
    infoCard.style.display = 'block';

    if (brand === 'seoulBike') {
      bikeImg.setAttribute('src', 'src/assets/img/seoulBikeImg.png');
      logo.setAttribute('src', 'src/assets/img/seoulBikeLogo.png');
      title.textContent = info.stationName;
      count.textContent = info.parkingBikeTotCnt;
      reservation.setAttribute('href', 'https://www.bikeseoul.com/main.do');
    } else if (brand === 'elecle') {
      bikeImg.setAttribute('src', 'src/assets/img/elecleImg.png');
      logo.setAttribute('src', 'src/assets/img/elecleLogo.png');
      title.textContent = info.road_address_name;
      count.textContent = 1;
      reservation.setAttribute(
        'href',
        'https://play.google.com/store/apps/details?id=org.nine2one.elecle'
      );
    } else if (brand === 'kickgoing') {
      bikeImg.setAttribute('src', 'src/assets/img/kickgoingImg.png');
      logo.setAttribute('src', 'src/assets/img/kickgoingLogo.png');
      title.textContent = info.road_address_name;
      count.textContent = 1;
      reservation.setAttribute('href', 'https://kickgoing.io/');
    }
  });

  marker.setMap(map);
}

//유저 마커 찍는 함수
function createAndAddUserMarker(position, imageSrc, map) {
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
createAndAddUserMarker(userPosition, userMarkerSrc, map);

getSeoulBikeStatusWithin500m().then((stations) => {
  console.log(stations);
  stations.forEach((station) => {
    var position = new kakao.maps.LatLng(
      station.stationLatitude,
      station.stationLongitude
    );
    createAndAddMarker(
      position,
      seoulBikeMarkerImageSrc,
      map,
      station,
      'seoulBike'
    );
  });
});

getKickgoingStatusWithin500m().then((locations) => {
  locations.forEach((location) => {
    var position = new kakao.maps.LatLng(location.y, location.x);
    createAndAddMarker(
      position,
      kickgoingMarkerImageSrc,
      map,
      location,
      'kickgoing'
    );
  });
});

getElecleStatusWithin500m().then((locations) => {
  locations.forEach((location) => {
    var position = new kakao.maps.LatLng(location.y, location.x);
    createAndAddMarker(position, elecleMarkerImageSrc, map, location, 'elecle');
  });
});

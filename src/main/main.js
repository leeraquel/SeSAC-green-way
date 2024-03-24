//session storage에 임의의 값 넣기
import {
  getSeoulBikeStatusWithin500m,
  getKickgoingStatusWithin500m,
  getElecleStatusWithin500m,
} from '../api/seoul.js';
import { googleKey } from '../../config.js';

let storedAddress;

let defaultLocation = {
  address: '서울특별시 마포구 양화로 72',
  x: 126.916493990351,
  y: 37.5508138163956,
};

sessionStorage.setItem('address', JSON.stringify(defaultLocation));

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

let currentClickedMarker = null; // 현재 클릭된 마커를 추적할 변수
let markersMap = new Map();

function createAndAddMarker(position, imageSrc, map, info, brand) {
  let markerImage = new kakao.maps.MarkerImage(imageSrc, normalSize);

  let marker = new kakao.maps.Marker({
    position: position,
    image: markerImage,
  });

  // 마커 객체와 원본 이미지 소스, 크기, 필터링구분 브랜드 Map 객체에 저장
  markersMap.set(marker, { src: imageSrc, size: normalSize, category: brand });

  kakao.maps.event.addListener(marker, 'click', function () {
    // 이전에 클릭된 마커가 있으면 그 마커의 크기를 원래대로 돌림
    if (currentClickedMarker && currentClickedMarker !== marker) {
      let originalMarkerData = markersMap.get(currentClickedMarker);
      let originalMarkerImage = new kakao.maps.MarkerImage(
        originalMarkerData.src,
        originalMarkerData.size
      );
      currentClickedMarker.setImage(originalMarkerImage);
    }

    // 현재 클릭된 마커의 크기를 변경
    let clickedMarkerImage = new kakao.maps.MarkerImage(imageSrc, clickedSize);
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

function filterMarkers(category) {
  let displayedMarkersCount = 0; // 표시된 마커의 수를 추적하는 변수

  markersMap.forEach((value, marker) => {
    if (
      value.category === 'user' ||
      category === 'all' ||
      value.category === category
    ) {
      marker.setMap(map); // 마커를 지도에 표시
      displayedMarkersCount++; // 표시된 마커의 수 증가
    } else {
      marker.setMap(null); // 그렇지 않으면 마커를 지도에서 제거
    }
  });

  // 모든 마커의 처리가 끝난 후, 표시된 마커가 없는 경우 알림 표시
  if (displayedMarkersCount === 0) {
    alert('이용 가능한 수단이 없습니다.');
  }
}

document.getElementById('allFilter').addEventListener('click', function () {
  filterMarkers('all');
});
document
  .getElementById('FilterSeoulBikeOnly')
  .addEventListener('click', function () {
    filterMarkers('seoulBike');
  });
document
  .getElementById('FilterElecleOnly')
  .addEventListener('click', function () {
    filterMarkers('elecle');
  });
document
  .getElementById('FilterKickgoingOnly')
  .addEventListener('click', function () {
    filterMarkers('kickgoing');
  });

//유저 마커 찍는 함수
function createAndAddUserMarker(position, imageSrc, map) {
  let imageSize = new kakao.maps.Size(36, 36); // 마커 이미지의 크기
  let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  let marker = new kakao.maps.Marker({
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
let userPosition = new kakao.maps.LatLng(storedAddress.y, storedAddress.x);
createAndAddUserMarker(userPosition, userMarkerSrc, map);

// Promise.all을 사용하여 모든 API 호출을 동시에 실행
Promise.all([
  getSeoulBikeStatusWithin500m(),
  getKickgoingStatusWithin500m(),
  getElecleStatusWithin500m(),
])
  .then((results) => {
    // results는 각 함수 호출 결과를 담은 배열
    const [seoulBikeStations, kickgoingLocations, elecleLocations] = results;

    // 모든 호출 결과가 빈 배열인지 확인
    if (
      seoulBikeStations.length === 0 &&
      kickgoingLocations.length === 0 &&
      elecleLocations.length === 0
    ) {
      alert('해당 지역에서 이용 가능한 수단이 없습니다.');
    } else {
      // 결과가 빈 배열이 아닌 경우, 각 수단에 대한 마커를 지도에 추가
      seoulBikeStations.forEach((station) => {
        let position = new kakao.maps.LatLng(
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

      kickgoingLocations.forEach((location) => {
        let position = new kakao.maps.LatLng(location.y, location.x);
        createAndAddMarker(
          position,
          kickgoingMarkerImageSrc,
          map,
          location,
          'kickgoing'
        );
      });

      elecleLocations.forEach((location) => {
        let position = new kakao.maps.LatLng(location.y, location.x);
        createAndAddMarker(
          position,
          elecleMarkerImageSrc,
          map,
          location,
          'elecle'
        );
      });
    }
  })
  .catch((error) => {
    // 에러 처리
    console.error('API 호출 중 오류 발생:', error);
  });

async function reloadMarkers() {
  // 지도 상의 모든 마커를 제거합니다.
  markersMap.forEach((_, marker) => marker.setMap(null));
  markersMap.clear();
  // 세션 스토리지에서 사용자의 현재 위치 정보 가져오기
  const storedAddress = JSON.parse(sessionStorage.getItem('address'));
  console.log(storedAddress);

  // 사용자의 현재 위치에 마커 추가
  const userPosition = new kakao.maps.LatLng(storedAddress.y, storedAddress.x);
  createAndAddUserMarker(userPosition, userMarkerSrc, map);

  // 지도의 중심을 사용자의 현재 위치로 이동
  map.setCenter(userPosition);

  // 모든 서비스의 상태를 확인합니다.
  Promise.all([
    getSeoulBikeStatusWithin500m(),
    getKickgoingStatusWithin500m(),
    getElecleStatusWithin500m(),
  ])
    .then(([seoulBikeStations, kickgoingLocations, elecleLocations]) => {
      // 모든 호출 결과가 빈 배열인 경우
      if (
        seoulBikeStations.length === 0 &&
        kickgoingLocations.length === 0 &&
        elecleLocations.length === 0
      ) {
        alert('해당 지역에서 이용 가능한 수단이 없습니다.');
      } else {
        // 서울 자전거 대여소 마커 로드
        [...seoulBikeStations].forEach((station) => {
          const position = new kakao.maps.LatLng(
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

        // 킥고잉 마커 로드
        [...kickgoingLocations].forEach((location) => {
          const position = new kakao.maps.LatLng(location.y, location.x);
          createAndAddMarker(
            position,
            kickgoingMarkerImageSrc,
            map,
            location,
            'kickgoing'
          );
        });

        // 일레클 마커 로드
        [...elecleLocations].forEach((location) => {
          const position = new kakao.maps.LatLng(location.y, location.x);
          createAndAddMarker(
            position,
            elecleMarkerImageSrc,
            map,
            location,
            'elecle'
          );
        });
      }
    })
    .catch((error) => {
      console.error('API 호출 중 오류 발생:', error);
    });
}

async function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        // 이 함수 내에서 비동기 로직을 사용하기 때문에 async 추가
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleKey}&language=ko`;

        try {
          // Geocoding API 호출 및 결과 대기
          const response = await fetch(geocodingUrl);
          const data = await response.json();
          const addressName = data.results[0].formatted_address;
          console.log(data.results[0].formatted_address);

          // 세션 스토리지 업데이트
          let currentLocation = {
            address: addressName, // 비동기 호출 결과로 얻은 주소 사용
            x: longitude,
            y: latitude,
          };

          sessionStorage.setItem('address', JSON.stringify(currentLocation));
          storedAddress = currentLocation;

          // 지도 중심 재설정 및 마커 다시 로드
          map.setCenter(new kakao.maps.LatLng(latitude, longitude));
          reloadMarkers();
        } catch (error) {
          console.log('Geocoding API 호출 실패:', error);
        }
      },
      function () {
        console.log('Geolocation service failed.');
      }
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

// 현재위치 아이콘 클릭시 실행
document
  .getElementById('findCurrentLocation')
  .addEventListener('click', getCurrentLocation);

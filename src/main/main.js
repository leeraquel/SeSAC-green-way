import {
  getSeoulBikeStatusWithin500m,
  getKickgoingStatusWithin500m,
  getElecleStatusWithin500m,
} from '../api/seoul.js';

import { googleKey } from '../../config.js';

// session storage 불러올 변수 선언
let storedAddress;

// 사용자 정의 마커 이미지의 경로
const userMarkerSrc = 'src/assets/icon/userMarker.svg';
const seoulBikeMarkerImageSrc = 'src/assets/icon/seoulBikeMarker.svg';
const kickgoingMarkerImageSrc = 'src/assets/icon/kickgoingMarker.svg';
const elecleMarkerImageSrc = 'src/assets/icon/elecleMarker.svg';

// 마커 사이즈 선언
const normalSize = new kakao.maps.Size(32, 32);
const clickedSize = new kakao.maps.Size(40, 40);

// 마커 추적 변수 및 관련 map 객체 생성
let currentClickedMarker = null;
let markersMap = new Map();

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
document.getElementById('nowLocationName').textContent = storedAddress.address;

// 마커 만들고 브랜드 별로 이미지 다르게 넣고 onClick에 정보 띄우는 것 까지 넣음
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

// 별에 토글기능 넣는 함수
function toggleFavoriteIcon() {
  const isFavoriteImg = document.getElementById('isFavorite');

  const isStar =
    isFavoriteImg.getAttribute('src') === 'src/assets/icon/star.svg';

  if (isStar) {
    isFavoriteImg.setAttribute('src', 'src/assets/icon/emptyStar.svg');
  } else {
    isFavoriteImg.setAttribute('src', 'src/assets/icon/star.svg');
  }
}

//별 띄우는 함수
async function fetchFavoritesAndUpdateIcon() {
  const currentLocation = JSON.parse(sessionStorage.getItem('address'));
  if (!currentLocation) return;

  // favorite.json에서 데이터 가져오기
  const response = await fetch('src/api/favorite.json');
  const favorites = await response.json();

  // 현재 위치와 즐겨찾기 위치 비교
  let isFavorite = favorites.some((favorite) => {
    return (
      favorite.stationLatitude === currentLocation.y &&
      favorite.stationLongitude === currentLocation.x
    );
  });

  const isFavoriteImg = document.getElementById('isFavorite');
  if (isFavorite) {
    isFavoriteImg.setAttribute('src', 'src/assets/icon/star.svg');
  } else {
    isFavoriteImg.setAttribute('src', 'src/assets/icon/emptyStar.svg');
  }
  isFavoriteImg.onclick = toggleFavoriteIcon;
}

//markersMap 객체에서 카테고리 받아서 마커 필터링하는 함수
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

  // 마커 없으면 예외처리
  if (displayedMarkersCount === 0) {
    alert('이용 가능한 수단이 없습니다.');
  }
}

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

// 현재 위치 잡으면 마커 다시 찍는 함수
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

// 현재 위치 잡아서 결과 반영하는 함수
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
  await fetchFavoritesAndUpdateIcon();
}

//필터 관련 dom 선언
const allFilter = document.getElementById('allFilter');
const filterSeoulBike = document.getElementById('FilterSeoulBikeOnly');
const filterElecle = document.getElementById('FilterElecleOnly');
const filterKickgoing = document.getElementById('FilterKickgoingOnly');

// 현재위치 관련 dom 지정
const findCurrentLocation = document.getElementById('findCurrentLocation');

// 현재위치 온클릭 이벤트 추가
findCurrentLocation.addEventListener('click', getCurrentLocation);

//필터링 온클릭 이벤트 추가
allFilter.addEventListener('click', function () {
  filterMarkers('all');
});
filterSeoulBike.addEventListener('click', function () {
  filterMarkers('seoulBike');
});
filterElecle.addEventListener('click', function () {
  filterMarkers('elecle');
});
filterKickgoing.addEventListener('click', function () {
  filterMarkers('kickgoing');
});

// 카카오 지도 생성 및 마커링 관련 기능들
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
      alert(
        '해당 지역에서 이용 가능한 수단이 없습니다.\n본 프로젝트는 마포구, 서대문구, 영등포구를 기준으로 제작되었습니다.'
      );
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

// 즐겨찾기 초기 로딩 함수
fetchFavoritesAndUpdateIcon();

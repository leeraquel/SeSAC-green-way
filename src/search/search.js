import { googleKey } from '../../config.js';
import {
  getSeoulBikeStatusWithin500m,
  getKickgoingStatusWithin500m,
  getElecleStatusWithin500m,
} from '../api/mapApi.js';

let storedAddress

  // currentLocation
 async function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            // Google Maps Geocoding API 호출을 위한 URL
            var geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleKey}&language=ko`;

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

          const input = document.getElementById("searchInput");
          input.value = "" + addressName;} catch (error) {
            console.log('Geocoding API 호출 실패:', error);
          }
            
        }, function() {
            console.log('Geolocation service failed.');
        });
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}

const currentLocationBtn = document.getElementById("current-location-button")


currentLocationBtn.addEventListener('click',getCurrentLocation)


if (window.kakao && kakao.maps) {
  kakao.maps.load(function() {
      // 장소 검색 객체 생성
      var ps = new kakao.maps.services.Places(); 

      // 검색 버튼 클릭 이벤트 리스너 추가
      document.getElementById('searchIcon').addEventListener('click', function() {
          var keyword = document.getElementById('searchInput').value;

          if (!keyword.replace(/^\s+|\s+$/g, '')) {
              alert('검색 키워드를 입력해주세요.');
              return false;
          }

          // 키워드로 장소 검색 실행
          ps.keywordSearch(keyword, placesSearchCB);
      });

      // 장소 검색 완료 시 호출되는 콜백 함수
      function placesSearchCB(data, status) {
          if (status === kakao.maps.services.Status.OK) {
              // 검색 결과가 있으면 콘솔에 출력
              console.log(data);
              
              // 검색 결과를 div에 표시 (예시)
              var resultsDiv = document.getElementById('searchResults');
              resultsDiv.innerHTML = ''; // 이전 결과 초기화
              data.forEach(function(place) {
                  var name = document.createElement('p');
                  name.textContent = place.place_name; // 장소 이름 출력
                  resultsDiv.appendChild(name);

                  name.addEventListener('click', async function() {
                    let defaultLocation = {
                      address: place.address_name,
                      y: place.y,
                      x: place.x,
                    };
            
                    sessionStorage.setItem('address', JSON.stringify(defaultLocation));
                    storedAddress = defaultLocation;
                    document.getElementById("nowLocationInfo").style.display = 'block';
                    document.getElementById('nowLocationName').textContent = storedAddress.address;

                    
                    await fetchFavoritesAndUpdateIcon();
                    
                    
                    
                    
                    
                  })

              }); 
              
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
              alert('검색 결과가 없습니다.');
          } else if (status === kakao.maps.services.Status.ERROR) {
              alert('검색 중 오류가 발생했습니다.');
          }
      }
  });
} else {
  console.error("카카오 지도 JavaScript SDK가 로드되지 않았습니다.");
}

async function fetchFavoritesAndUpdateIcon() {
  const currentLocation = JSON.parse(sessionStorage.getItem('address'));
  if (!currentLocation) return;

  // favorite.json에서 데이터 가져오기
  const response = await fetch('../api/favorite.json');
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
    isFavoriteImg.setAttribute('src', '../assets/icon/star.svg');
  } else {
    isFavoriteImg.setAttribute('src', '../assets/icon/emptyStar.svg');
  }
  isFavoriteImg.onclick = toggleFavoriteIcon;
}

function toggleFavoriteIcon() {
  const isFavoriteImg = document.getElementById('isFavorite');

  const isStar =
    isFavoriteImg.getAttribute('src') === '../assets/icon/star.svg';

  if (isStar) {
    isFavoriteImg.setAttribute('src', '../assets/icon/emptyStar.svg');
  } else {
    isFavoriteImg.setAttribute('src', '../assets/icon/star.svg');
  }
}
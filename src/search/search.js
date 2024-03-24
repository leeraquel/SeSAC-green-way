// kakaoApi
import { kakaoKey } from '../../config.js';
document.addEventListener('DOMContentLoaded', function () {
    // 입력 폼과 결과 리스트 요소 가져오기
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const resultsList = document.getElementById('resultsList');

    // 검색 폼 이벤트 처리
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // 기본 동작 중단

        const keyword = searchInput.value.trim(); // 입력값 얻기

        // 검색어가 있을 경우에만 실행
        if (keyword !== '') {
            // 카카오 지도 API 호출하여 주소 검색
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(keyword, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    // 결과를 순회하며 리스트에 추가
                    resultsList.innerHTML = ''; // 결과 리스트 초기화
                    result.forEach(function (item) {
                        const li = document.createElement('li');
                        li.textContent = item.address_name;
                        resultsList.appendChild(li);
                    });
                } else {
                    console.error('카카오 지도 API 호출 실패:', status);
                }
            });
        }
    });
});
  // currentLocation
  import { googleKey } from '../../config.js';
  function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            // Google Maps Geocoding API 호출을 위한 URL
            var geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB04CBmtAPQ-ZJwZu6LjdCwVdS-LKFSchE&language=ko`;

            // Geocoding API 호출
            fetch(geocodingUrl)
                .then(response => response.json())
                .then(data => {
                    // 결과에서 주소 추출
                    var address = data.results[0].formatted_address;

                    // 주소를 입력창에 표시
                    var input = document.getElementById("searchInput");
                    input.value = "" + address;
                })
                .catch(error => {
                    console.log('Geocoding API 호출 실패:', error);
                });
        }, function() {
            console.log('Geolocation service failed.');
        });
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}

getCurrentLocation();



// function searchPlaces() {
//     var searchInput = document.getElementById("searchInput").value;
//     if (searchInput.trim() == "") {
//         alert("검색어를 입력해주세요.");
//         return;
//     }
//     var kakaoApiKey ='';
//     var apiUrl = 'https://dapi.kakao.com/v2/local/search/keyword.json';
//     var headers = {
//         'Authorization': 'KakaoAK' + kakaoApiKey
//     };

//     var params = {
//         query: searchInput
//     };
//     axios.get(apiUrl, { params: params, headers: headers })
//         .then(function (response) {
//             var places = response.data.document;
//             if (places.length > 0) {
//                 // 검색 결과를 처리하는 코드를 여기에 추가합니다.
//                 console.log('검색 결과:', places);
//             } else {
//                 alert('검색 결과가 없습니다.');
//             }
//         })
//         .catch(function (error) {
//             console.error('API호출 중 오류 발생:', error);
//         });
// }

// 검색 입력 창에서 Enter 키가 눌렸을 때 검색 실행
// document.getElementById("searchInput").addEventListener("keyup", function(event) {
//     if (event.key === "Enter") {
//       searchPlaces();
//     }
//   });

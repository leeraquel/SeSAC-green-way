import { googleKey } from '../../config.js';

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
// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(); 


// const searchIcon = document.getElementById("searchIcon")

// searchIcon.addEventListener('click', loadList(keyword))

// function loadList() {
//     const keyword= document.getElementById("searchInput").value
//     console.log(keyword)
//     ps.keywordSearch(`${keyword}`, placesSearchCB); 

//     function placesSearchCB (data, status, pagination) {
//         if (status === kakao.maps.services.Status.OK) {
    
//             console.log(data)
        
//         } 
//     }

// }



// 키워드로 장소를 검색합니다
ps.keywordSearch("경복궁", placesSearchCB); 

function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        console.log(data)
    
    } 
}
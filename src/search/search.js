function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        
        // 사용자의 현재 위치 정보를 이용하여 추가 작업을 수행할 수 있습니다.
        console.log('현재 위도:', latitude);
        console.log('현재 경도:', longitude);
      }, function() {
        console.log('Geolocation service failed.');
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }


// const getlocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition, showError) ;
// } else {
//     alert {"Geolocation is not supported by this browser."};
// }
// };

// const showPosition = (position) => {
//     let lat = position.coords.latitude;
//     let long = position.coords.longitude;
//     const des = document.querySelector("p");
//     des.innerHTML = "Latitude: " + lat + "Longitude: " + long;
// };
// const showError = (error) => {
//     switch (error.code) {
//         case error.PERMISSION_DENIED:
//             alert("User denied the request for Geolocation.");
//             break;
//         case error.POSITION_UNAVAILABLE: 
//             alert("Location informayion is unavailable.");
//             break;
//         case error.TIMEOUT:
//             alert alert("The request to get user location timed out.");
//             break;
//         case error.UNKNOWN_ERROR:
//             alert("An unknown error occured.") ;
//             break;

//             default:
//                 alert("An unknown error occured.");
// }}

  

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

// // 검색 입력 창에서 Enter 키가 눌렸을 때 검색 실행
// document.getElementById("searchInput").addEventListener("keyup", function(event) {
//     if (event.key === "Enter") {
//       searchPlaces();
//     }
//   });

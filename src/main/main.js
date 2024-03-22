//session storage에 임의의 값 넣기
import { fetchSeoulBikeStatusWithin1Km } from '../api/seoul.js';

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

fetchSeoulBikeStatusWithin1Km().then((nearbyStations) => {
  console.log(nearbyStations); // 필터링된 대여소 정보 출력
});

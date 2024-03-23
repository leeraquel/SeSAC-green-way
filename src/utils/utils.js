export const footerDiv =
  "<ul class='footerDiv'><li class='footer'><a href='../../main/main.html'><img class='footer-icon' src='../assets/icon/map.svg' alt='지도 아이콘' /></a></li><li class='footer'><a href='../search/search.html'><img class='footer-icon' src='../assets/icon/search.svg' alt='검색 아이콘' /></a></li><li class='footer'><img id='favorite'class='footer-icon' src='../assets/icon/favorite.svg' alt='즐겨찾기 아이콘' /></li><li class='footer'><img id='mypage' class='footer-icon' src='../assets/icon/my.svg' alt='마이페이지 아이콘' /></li></ul>";

// footer - mypage 로그인 여부 확인 후 페이지 이동 함수
export const isLoginMyPage = function () {
  var value = sessionStorage.getItem('islogin');
  if (value === 'false') {
    alert('로그인이 필요합니다.');
    window.location.href = '../login/login.html';
  } else {
    window.location.href = '../mypage/mypage.html';
  }
};
// footer - favorite 로그인 여부 확인 후 페이지 이동 함수
export const isloginFavoritePage = function () {
  var value = sessionStorage.getItem('islogin');
  if (value === 'false') {
    alert('로그인이 필요합니다.');
    window.location.href = '../login/login.html';
  } else {
    window.location.href = '../bookmark/favorite.html';
  }
};

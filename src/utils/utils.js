const header = document.createElement('header');
const headerDiv =
  "<div class='headerDiv'><a class='header-logo' href='../../main/main.html'><img class='header-logo-img' src='../assets/img/logo_greenway_01.png' /></a></div>";
// const hd = document.querySelector('header');
header.innerHTML = headerDiv;
document.querySelector('main').before(header);
// footer--------------------------------------------
// const footer = document.createElement('footer');
// const footerDiv =
//   "<ul class='footerDiv'><li><a class='footer' href='../../main/main.html'><img class='footer-icon' src='./../assets/icon//map.svg' alt='지도 아이콘' /></a></li><li><a class='footer' href='./../assets/icon/search.html'><img class='footer-icon' src='./../assets/icon/search.svg' alt='검색 아이콘' /></a></li><li><img id='favorite'class='footer-icon' src='./../assets/icon/favorite.svg' alt='즐겨찾기 아이콘' /></li><li><img id='mypage' class='footer-icon' src='./../assets/icon/my.svg' alt='마이페이지 아이콘' /></li></ul>";
// footer.innerHTML = footerDiv;
// document.querySelector('main').after(footer);

// footer - mypage 로그인 여부 확인 후 페이지 이동 함수

const isLoginMyPage = function () {
  var value = sessionStorage.getItem('islogin');
  if (value === 'false') {
    alert('로그인이 필요합니다.');
    window.location.href = '../../login/login.html';
  } else {
    window.location.href = '../../mypage/mypage.html';
  }
};
// footer - favorite 로그인 여부 확인 후 페이지 이동 함수
const isloginFavoritePage = function () {
  var value = sessionStorage.getItem('islogin');
  if (value === 'false') {
    alert('로그인이 필요합니다.');
    window.location.href = '../../login/login.html';
  } else {
    window.location.href = '../../bookmark/favorite.html';
  }
};

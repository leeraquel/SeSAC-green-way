// 로그인 여부 확인 후 마이페이지로 이동
const isLoginMyPage = function () {
  var value = sessionStorage.getItem('islogin');
  if (value === 'true') {
    window.location.href = '../mypage/mypage.html';
  } else {
    alert('로그인이 필요합니다.');
    window.location.href = '../login/login.html';
  }
};
// footer - favorite 로그인 여부 확인 후 페이지 이동 함수
const isloginFavoritePage = function () {
  var value = sessionStorage.getItem('islogin');
  if (value === 'true') {
    window.location.href = '../bookmark/favorite.html';
  } else {
    alert('로그인이 필요합니다.');
    window.location.href = '../login/login.html';
  }
};

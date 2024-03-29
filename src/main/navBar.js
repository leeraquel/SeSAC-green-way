// 로그인 여부 확인 후 마이페이지로 이동
const isLoginMyPage = function () {
  var value = sessionStorage.getItem('isLogin');
  if (value === 'true') {
    window.location.href = '/src/mypage/mypage.html';
  } else {
    window.location.href = '/src/login/login.html';
  }
};

// 로그인 여부 확인 후 즐겨찾기 페이지로 이동
const isLoginFavoritePage = function () {
  var value = sessionStorage.getItem('isLogin');
  if (value === 'true') {
    window.location.href = 'src/bookmark/favorite.html';
  } else {
    alert('로그인이 필요합니다.');
    window.location.href = '/src/login/login.html';
  }
};

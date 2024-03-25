const isLoginMyPage = function () {
  var value = sessionStorage.getItem('islogin');
  if (value === 'true') {
    window.location.href = '../mypage/mypage.html';
  } else {
    alert('로그인이 필요합니다.');
    window.location.href = '../login/login.html';
  }
};

const isloginFavoritePage = function () {
  var value = sessionStorage.getItem('islogin');
  if (value === 'true') {
    window.location.href = '../bookmark/favorite.html';
  } else {
    alert('로그인이 필요합니다.');
    window.location.href = '../login/login.html';
  }
};

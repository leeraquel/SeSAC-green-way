const inputId = document.getElementById('userId');
const inputPw = document.getElementById('password');

const form = document.querySelector('.login-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userId = document.getElementById('userId').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('../api/user.json');
    if (!response.ok) {
      throw new Error('데이터를 가져오는 데 실패했습니다.');
    }

    const userData = await response.json();

    if (userData.id === userId && userData.password === password) {
      sessionStorage.setItem('isLogin', 'true');
      window.location.href = '../../../index.html';
    } else {
      const p = document.getElementById('message');
      p.innerText = '아이디 혹은 비밀번호가 일치하지 않습니다.';
      inputId.value = '';
      inputPw.value = '';
    }
  } catch (error) {
    console.error('오류 발생:', error);
    alert('오류가 발생하여 로그인할 수 없습니다.');
  }
});

const eyeIcon = document.getElementById('eyeIcon');

eyeIcon.addEventListener('click', () => {
  if (inputPw.type === 'password') {
    inputPw.type = 'text';
    eyeIcon.src = '../assets/icon/closedEye.png';
  } else {
    inputPw.type = 'password';
    eyeIcon.src = '../assets/icon/Eye.png';
  }
});

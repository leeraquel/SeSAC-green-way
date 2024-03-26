// 아이디 확인
const inputId = document.getElementById('userId');
const idNextBtn = document.querySelector('.next');
const errorElement = document.getElementById('errMessage');
const toggleImg = document.getElementById('toggleImg');
const divId = document.querySelector('.div-id');
const idForm = document.querySelector('.id-form');
const sectionId = document.querySelector('.join-id');

// 비밀번호 확인
const sectionPw = document.querySelector('.join-pw');
const pwForm = document.querySelector('.pw-form');
const inputPw = document.getElementById('password');
const inputPwCheck = document.getElementById('passwordCheck');
const divPw = document.getElementById('div-pw');
const eyeIcon = document.getElementById('eyeIcon');
const errorElementPw = document.getElementById('errMessagePw');
const pwToggleImg = document.getElementById('PwToggleImg');
const pwNextBtn = document.querySelector('.pw-next');

// 동의 확인
const sectionAg = document.querySelector('.join-agree');
const finishBtn = document.querySelector('.finish-btn');
const selectAllCheckbox = document.querySelector('#all');

// inputId에 blur 이벤트 핸들러 추가
inputId.addEventListener('blur', function () {
  // 현재 userId 입력값 가져오기
  const userId = inputId.value;
  // 유효성 검사 함수 실행
  validateUserId(userId);
});

idForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userId = inputId.value;

  // 유효성 검사 실행
  if ((await validateUserId(userId)) == true) {
    // 유효성 검사를 통과하면 제출 이벤트 핸들러 다시 등록
    sectionId.style.display = 'none';
    sectionPw.style.display = 'block';
  }
});

idNextBtn.addEventListener('click', async () => {
  const userId = inputId.value;
  console.log((await validateUserId(userId)) == true);

  // 유효성 검사 실행
  if ((await validateUserId(userId)) == true) {
    // 유효성 검사를 통과하면 제출 이벤트 핸들러 다시 등록
    sectionId.style.display = 'none';
    sectionPw.style.display = 'block';
  }
});

// 유효성 검사 함수
async function validateUserId(userId) {
  // trim()값이 4자 이상 20자 미만 확인
  if (userId.trim().length < 4 || userId.trim().length >= 20) {
    errorElement.textContent = '아이디는 4자 이상 20자 미만이여야 합니다.';
    applyWarningStyleId();
    return false;
  }

  // 공백 입력 확인
  if (userId.trim().includes(' ')) {
    errorElement.textContent = '아이디에 공백을 포함할 수 없습니다.';
    applyWarningStyleId();
    return false;
  }

  // 영문 대문자, 소문자, 숫자, 특수문자(-,_)만 입력 확인
  if (!/^[a-zA-Z0-9-_]+$/.test(userId)) {
    errorElement.textContent =
      '아이디는 영문 대/소문자, 숫자, 특수문자(-,_)만 입력 가능합니다.';
    applyWarningStyleId();
    return false;
  }

  // 서버와 아이디 중복 확인 후 통과 못했을 경우
  const isDuplicate = await simulateServerCheck(userId);
  if (!isDuplicate) {
    errorElement.textContent = '이미 사용중인 아이디입니다.';
    applyWarningStyleId();
    return false;
  }

  // 모든 유효성 검사 통과
  errorElement.textContent = '';
  toggleImg.hidden = false;
  toggleImg.src = '../assets/icon/check-circle.png';
  divId.classList.remove('err');
  divId.classList.add('success');
  return true;
}

function applyWarningStyleId() {
  toggleImg.hidden = false;
  toggleImg.src = '../assets/icon/exclamation-circle-fill 1.png';
  divId.classList.add('err');
}

// 서버와의 아이디 중복 확인 함수
async function simulateServerCheck(userId) {
  const response = await fetch('../api/user.json');
  if (!response.ok) {
    throw new Error('데이터를 가져오는데 실패했습니다.');
  }
  const userDate = await response.json();

  if (userId === userDate.id) {
    return false;
  } else {
    return true;
  }
}

// 비밀번호 확인
inputPwCheck.addEventListener('blur', () => {
  const pwValue = inputPw.value;
  const CheckedPwValue = inputPwCheck.value;
  // 비밀번호 유효성 확인
  checkedPassword(pwValue, CheckedPwValue);
});

pwForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const pwValue = inputPw.value;
  const CheckedPwValue = inputPwCheck.value;
  // 유효성 검사 실행
  if (checkedPassword(pwValue, CheckedPwValue) == true) {
    console.log('submit 성공');
    // 유효성 검사를 통과하면 제출 이벤트 핸들러 다시 등록
    sectionPw.style.display = 'none';
    sectionAg.style.display = 'block';
  }
});

pwNextBtn.addEventListener('click', () => {
  const pwValue = inputPw.value;
  const CheckedPwValue = inputPwCheck.value;
  // 유효성 검사 실행
  if (checkedPassword(pwValue, CheckedPwValue) == true) {
    // 유효성 검사를 통과하면 제출 이벤트 핸들러 다시 등록
    sectionPw.style.display = 'none';
    sectionAg.style.display = 'block';
  }
});

// 비밀번호 일치 및 유효성 검사 함수
function checkedPassword(pwValue, CheckedPwValue) {
  // 비밀번호의 길이가 8자 이상 16자 이하인지 확인
  if (pwValue.trim().length < 8 || pwValue.trim().length >= 16) {
    errorElementPw.textContent = '비밀번호는 8자 이상 16자 미만이여야 합니다. ';
    applyWarningStylePw();
    return false;
  }

  // 공백 입력 확인
  if (pwValue.trim().includes(' ')) {
    errorElement.textContent = '비밀번호에 공백을 포함할 수 없습니다.';
    applyWarningStylePw();
    return false;
  }

  // 대문자, 소문자, 숫자, 특수문자가 모두 포함되어 있는지 확인
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const digitRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (
    !upperCaseRegex.test(pwValue) ||
    !lowerCaseRegex.test(pwValue) ||
    !digitRegex.test(pwValue) ||
    !specialCharRegex.test(pwValue)
  ) {
    errorElementPw.textContent =
      '비밀번호는 대/소문자, 숫자, 특수문자를 모두 포함해야 합니다.';
    applyWarningStylePw();
    return false;
  }

  if (pwValue !== CheckedPwValue) {
    errorElementPw.textContent = '비밀번호가 일치하지 않습니다.';
    applyWarningStylePw();
    return false;
  }

  // 유효성 검사 통과 시
  errorElementPw.textContent = '';
  pwToggleImg.hidden = false;
  pwToggleImg.src = '../assets/icon/check-circle.png';
  divPw.classList.remove('err');
  divPw.classList.add('success');
  return true;
}

// 비밀번호 불일치시 경고 메시지
function applyWarningStylePw() {
  pwToggleImg.hidden = false;
  pwToggleImg.src = '../assets/icon/exclamation-circle-fill 1.png';
  divPw.classList.add('err');
}

function showPassword() {
  if (inputPw.type === 'password' || inputPwCheck.type === 'password') {
    inputPw.type = 'text';
    inputPwCheck.type = 'text';
    eyeIcon.src = '../assets/icon/closedEye.png';
  } else {
    inputPw.type = 'password';
    inputPwCheck.type = 'password';
    eyeIcon.src = '../assets/icon/Eye.png';
  }
}

function checkSelectAll() {
  // 전체 체크박스
  const checkboxes = document.querySelectorAll('.agree-checkbox');
  // 선택된 체크박스
  const checked = document.querySelectorAll('.agree-checkbox:checked');

  if (checkboxes.length === checked.length) {
    selectAllCheckbox.checked = true;
  } else {
    selectAllCheckbox.checked = false;
  }
}

function selectAll(selectAll) {
  const checkboxes = document.getElementsByClassName('agree-checkbox');

  // HTMLCollection을 배열로 변환
  Array.from(checkboxes).forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
}

finishBtn.addEventListener('click', () => {
  const agreeChecked = document.querySelectorAll('.nec-item:checked');
  if (selectAllCheckbox.checked == true || agreeChecked.length === 3) {
    alert('회원가입이 완료되었습니다.');
    sessionStorage.setItem('islogin', 'false');
    window.location.href = '../../../index.html';
  } else {
    alert('필수약관에 동의해주세요.');
  }
});

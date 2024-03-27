// 비밀번호 유효성 검사 함수
function validatePassword(password) {
  // 비밀번호 길이 확인
  if (password.length < 8 || password.length >= 16) {
    return '비밀번호는 8자 이상 16자 미만이어야 합니다.';
  }

  // 공백 포함 여부 확인
  if (password.includes(' ')) {
    return '비밀번호에 공백을 포함할 수 없습니다.';
  }

  // 대문자, 소문자, 숫자, 특수문자 포함 여부 확인
  var hasUpperCase = /[A-Z]/.test(password);
  var hasLowerCase = /[a-z]/.test(password);
  var hasNumber = /\d/.test(password);
  var hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecial)) {
    return '비밀번호는 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.';
  }

  // 모든 조건을 만족하면 유효한 비밀번호로 간주
  return '';
}

// 비밀번호 입력란 변경 시 호출되는 함수

// 비밀번호 입력란에 이벤트 리스너 추가
// document.getElementById('newPassword').addEventListener('input', handlePasswordChange);

// 비밀번호 변경 함수
function changePassword() {
  var newPassword = document.getElementById('newPassword').value;
  var confirmNewPassword = document.getElementById('confirmNewPassword').value;

  // 비밀번호 유효성 검사
  var errorMessage = validatePassword(newPassword);
  var unmatchMsg = document.getElementById('unmatchMsg');

  if (newPassword !== confirmNewPassword) {
    // 새 비밀번호와 새 비밀번호 확인이 일치하지 않을 때
    unmatchMsg.textContent =
      '새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.';
    unmatchMsg.style.display = 'block';

    // 비밀번호 입력 필드 초기화
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
  } else if (errorMessage) {
    // 유효성 검사에서 오류가 발생한 경우
    unmatchMsg.textContent = errorMessage;
    unmatchMsg.style.display = 'block';

    // 비밀번호 입력 필드 초기화
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
  } else {
    // 비밀번호 변경 로직 추가
    // 여기에 새 비밀번호를 서버에 전송하고 변경하는 로직을 추가해야 합니다.
    alert('비밀번호가 성공적으로 변경되었습니다.');
    newPassword = '';
    confirmNewPassword = '';

    // 새 비밀번호 입력 모달을 숨김
    var newPasswordModal = document.getElementById('newPasswordModal');
    var modalInstance = bootstrap.Modal.getInstance(newPasswordModal);
    modalInstance.hide();

    // 비밀번호 초기화
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
  }
}

// 즐겨찾기 버튼 클릭 시 기본 동작 중지 및 즐겨찾기 목록 보여주는 함수 호출
document
  .querySelector('.bookmark-btn')
  .addEventListener('click', function (event) {
    event.preventDefault(); // 기본 동작 중지

    // 여기에 즐겨찾기 목록을 보여주는 로직을 추가할 수 있습니다.
  });

function success() {
  alert('비밀번호 변경이 완료되었습니다.');
}

// 로그아웃 버튼 클릭 시 실행되는 함수
function logout() {
  // 로그아웃 처리
  alert('로그아웃 되었습니다.');
}

function checkPassword() {
  var currentPassword = document.getElementById('currentPassword').value;
  var userPassword = 'Test123#'; // 실제 사용자의 비밀번호 (서버에서 가져와야 함)

  if (currentPassword === userPassword) {
    // 비밀번호가 일치할 때 새 비밀번호 입력 모달을 보여줌
    showNewPasswordModal();
    // 비밀번호 입력 필드 초기화
    document.getElementById('currentPassword').value = '';
  } else {
    // 비밀번호가 일치하지 않을 때 알림 메시지 표시
    alert('비밀번호를 다시 확인해주세요.');
    // 비밀번호 입력 필드 초기화
    document.getElementById('currentPassword').value = '';
  }
}

function showNewPasswordModal() {
  // 새 비밀번호 입력 모달을 보여줌
  var newPasswordModal = document.getElementById('newPasswordModal');
  var modalInstance = new bootstrap.Modal(newPasswordModal);
  modalInstance.show();

  // 현재 비밀번호 입력 모달을 숨김
  var currentPasswordModal = document.getElementById('passwordChangeModal');
  var currentPasswordModalInstance =
    bootstrap.Modal.getInstance(currentPasswordModal);
  currentPasswordModalInstance.hide();
}

// 로그아웃에서 확인 시 로그인 페이지로 이동
function logout() {
  var confirmation = confirm('정말 로그아웃 하시겠습니까?');
  if (confirmation) {
    sessionStorage.setItem('isLogin', 'false');

    alert('로그아웃 되었습니다.');

    window.location.href = '../login/login.html';
  }
}

// 즐겨찾기 버튼을 클릭했을 때 데이터를 가져와서 카드를 생성하는 로직
const container = document.querySelector('.container');

fetch('../api/favorite.json')
  .then((response) => response.json())
  .then((json) => {
    json.forEach((element, index) => {
      const div = document.createElement('div');

      div.classList.add('card');

      div.innerHTML = `
      <div class="text-warp">
        <div class="first-line">
          <h2>${element.addressName}</h2>
          <h3>${element.totalQuantity}</h3>
        </div>
        <section class="brand">
        <div class="icon-wrapper"> 
          <img src="../assets/img/seoulBikeLogo.png" alt="따릉이로고">
          <p>따릉이 <b>${element.seoulBike}</b></p>
        </div>
        <div class="icon-wrapper">
          <img src="../assets/img/kickgoingLogo.png" alt="킥고잉로고">
          <p>킥고잉 <b>${element.kickgoing}</b></p>
         </div>
         <div class="icon-wrapper"> 
          <img src="../assets/img/elecleLogo.png" alt="일레클로고">
          <p>일레클 <b>${element.elecle}</b></p>
          </div>
        </section>
      </div>
      <div class="click-icon">
        <div class="mark-up" >
          <img
            src="../assets/icon/Star_checked.svg"
            class="favorite"
            alt="favorite-marked"
          />
        </div>
        <div class="map-click">
          <img
            src="../assets/icon/map_marked.svg"
            class="map"
            alt="map-marked"
            id=map${index}
          />
        </div>
      </div>`;
      container.append(div);

      document
        .querySelectorAll('.favorite')
        [index].addEventListener('click', () => {
          hideCard(index);
        });

      document.getElementById(`map${index}`).addEventListener('click', () => {
        let defaultLocation = {
          address: element.addressName,
          y: element.stationLatitude,
          x: element.stationLongitude,
        };

        sessionStorage.setItem('address', JSON.stringify(defaultLocation));

        window.location.replace('../../index.html');
      });
    });
  });

console.log(document.querySelectorAll('.favorite'));

function hideCard(index) {
  const card = document.querySelectorAll('.card')[index];
  if (card) {
    card.style.display = 'none';
  }
}

function moveToLocation(latitude, longitude) {
  window.open(`https://map.kakao.com/?q=${latitude},${longitude}`, '_blank');

  alert(`Moving to coordinates: Latitude ${latitude}, Longitude ${longitude}`);
}

//-----------사용자 아이디 표시
// 사용자의 ID 값을 표시하는 함수
function displayUsername(userId) {
  var usernameElement = document.querySelector('.UserName');
  usernameElement.textContent = userId;
}

// JSON 파일에서 사용자 정보 가져와서 ID 값 표시
fetch('../api/user.json')
  .then((response) => response.json())
  .then((user) => {
    var userId = user.id;
    displayUsername(userId);
  })
  .catch((error) => {
    console.error('Error fetching user data:', error);
  });
//------------------프로필 사진
// JavaScript
function handleProfilePicChange() {
  // 파일 선택(input type="file") 요소 선택
  var fileInput = document.getElementById('file-input');

  // 파일 선택 요소를 클릭하여 파일 선택 다이얼로그 열기
  fileInput.click();

  // 파일 선택(input type="file") 요소의 변경 이벤트 리스너 추가
  fileInput.addEventListener('change', function (event) {
    // 선택한 파일 가져오기
    var selectedFile = event.target.files[0];

    // 파일을 읽기 위한 FileReader 객체 생성
    var reader = new FileReader();

    // 파일을 읽기
    reader.onload = function (event) {
      // 읽은 데이터를 이미지로 설정하여 프로필 사진 요소에 표시
      var profilePic = document.querySelector('.profile-pic img');
      profilePic.src = event.target.result;
    };

    // 선택한 파일을 읽기
    reader.readAsDataURL(selectedFile);
  });
}
//---------------비밀번호 변경 유효성 검사

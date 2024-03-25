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
  } else {
    // 비밀번호가 일치하지 않을 때 알림 메시지 표시
    alert('비밀번호를 다시 확인해주세요.');
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

function changePassword() {
  var newPassword = document.getElementById('newPassword').value;
  var confirmNewPassword = document.getElementById('confirmNewPassword').value;

  if (newPassword !== confirmNewPassword) {
    // 새 비밀번호와 새 비밀번호 확인이 일치하지 않을 때 알림 메시지 표시
    alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
  } else {
    // 비밀번호 변경 로직 추가
    // 여기에 새 비밀번호를 서버에 전송하고 변경하는 로직을 추가해야 합니다.
    alert('비밀번호가 성공적으로 변경되었습니다.');

    // 새 비밀번호 입력 모달을 숨김
    var newPasswordModal = document.getElementById('newPasswordModal');
    var modalInstance = bootstrap.Modal.getInstance(newPasswordModal);
    modalInstance.hide();
  }
}
// ---------로그아웃에서 확인 시 로그인 페이지로 이동
function logout() {
  var confirmation = confirm('정말 로그아웃 하시겠습니까?');
  if (confirmation) {
    sessionStorage.setItem('is로그인', 'false');

    alert('로그아웃 되었습니다.');

    window.location.href = '../login/login.html';
  }
}
//----------------------------------------------즐겨찾기 항목----------------------
/// 즐겨찾기 버튼을 클릭했을 때 데이터를 가져와서 카드를 생성하는 로직

const container = document.querySelector('.container');

document.querySelector('#bookmark-btn').addEventListener('click', () => {
  fetch('../api/favorite.json')
    .then((response) => response.json()) // 읽어온 데이터를 JSON으로 변환
    .then((json) => {
      console.log(json);
      json.forEach((element, index) => {
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
          <div class="card card-body">
            <div class="first-line">
              <h2>${element.addressName}</h2>
              <h3>${element.totalQuantity}</h3>
            </div>
            <section class="brand">
              <p>따릉이 ${element.seoulBike}</p>
              <p>킥고잉 ${element.kickgoing}</p>
              <p>일레클 ${element.elecle}</p>
            </section>
          </div>
          <div class="click-icon">
            <div class="mark-up">
              <img
                src="../assets/icon/Star.svg"
                class="favorite"
                alt="favorite-marked"
                
              />
            </div>
            <div class="map-click">
              <img
                src="../assets/icon/map.svg"
                class="map"
                alt="map-marked"
              />
            </div>
          </div>`;

        container.append(div);

        document
          .querySelectorAll('.favorite')
          [index].addEventListener('click', () => {
            hideCard(index);
          });

        document
          .querySelectorAll('.map')
          [index].addEventListener('click', () => {
            const latitude = element.stationLatitude;
            const longitude = element.stationLongitude;
            moveToLocation(latitude, longitude);
          });
      });
    });
});

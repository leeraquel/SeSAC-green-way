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

// 로그아웃에서 확인 시 로그인 페이지로 이동
function logout() {
  var confirmation = confirm('정말 로그아웃 하시겠습니까?');
  if (confirmation) {
    sessionStorage.setItem('is로그인', 'false');

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
          <p>따릉이 ${element.seoulBike}</p>
          <p>킥고잉 ${element.kickgoing}</p>
          <p>일레클 ${element.elecle}</p>
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
//--------------즐겨찾기 화살표

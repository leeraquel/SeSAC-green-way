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
  // 로그아웃 확인을 받기 위한 인풋창 표시
  var confirmation = confirm('정말 로그아웃 하시겠습니까?');
  if (confirmation) {
    // 세션 스토리지에서 is로그인 값을 false로 설정
    sessionStorage.setItem('is로그인', 'false');
    // 로그아웃 알림창 표시
    alert('로그아웃 되었습니다.');
    // 로그인 페이지로 이동
    window.location.href = '로그인페이지주소';
  }
}

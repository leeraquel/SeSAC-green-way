function success() {
  alert('비밀번호 변경이 완료되었습니다.');
}

function verifyPassword() {
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // 현재 비밀번호와 JSON 데이터의 비밀번호를 비교하여 일치하는지 확인
  if (currentPassword === fetchedData.password) {
    // 새 비밀번호와 확인용 비밀번호가 일치하는지 확인
    if (newPassword === confirmPassword) {
      // 일치할 경우 다음 화면으로 넘어가는 코드 작성
      // 예시: window.location.href = 'nextPage.html';
      console.log('비밀번호 변경 가능');
    } else {
      alert('새 비밀번호와 확인용 비밀번호가 일치하지 않습니다.');
    }
  } else {
    alert('현재 비밀번호가 일치하지 않습니다.');
  }
}

// 페이지 로드 시 데이터를 받아오기 위해 fetchData() 함수 호출

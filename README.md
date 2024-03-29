# SeSAC-green-way-Seoul
사용자 위치 기반 공유 이동수단 정보를 제공하는 '스마트 모빌리티 플랫폼' 웹 페이지입니다. 

## index
- [Description](#Description)
- [Folder Structure](#Folder-Structure)
- [Technologies](#Technologies)
- [Tools](#Tools)
- [Data Sources](#Data-Sources)
- [Page Features](#Page-Features)
- [How To Use](#How-To-Use)

## Description
SeSAC-green-way-Seoul은 사용자 위치 기반 공유 이동수단 정보를 제공하는 통합 플랫폼 입니다. 
API를 연동하여 사용자의 현 위치 또는 검색한 위치를 기반으로 500m 반경의 공유 이동수단 정보와 날씨정보를 통합 제공합니다.
웹페이지는 모바일을 기준으로하며 JavaScript, HTML, CSS, Bootstrap을 활용해 구현하였습니다.
현재 해당 프로젝트는 netlify를 통해 배포된 상태입니다.

## Folder Structure

```bash
📦SeSAC-green-way-Seoul
 ┣ 📂src
 ┃ ┣ 📂api  // 오픈 API 및 Mock-Data 저장 폴더
 ┃ ┣ 📂assets  // 이미지, 아이콘, 로고로 구분하여 저장
 ┃ ┃ ┣ 📂icon
 ┃ ┃ ┣ 📂img
 ┃ ┃ ┣ 📂logo
      // 페이지별 폴더 관리 
 ┃ ┣ 📂bookmark // 기능별로 폴더를 구분하여 html, css, js 저장
 ┃ ┣ 📂join
 ┃ ┣ 📂login
 ┃ ┣ 📂main
 ┃ ┣ 📂mypage
 ┃ ┣ 📂search
 ┃ ┣ 📂styles // 공통 style css를 저장   
 ┃ ┗ 📂utils  // 공통 부분 js 및 css 저장
 ┃ ┃ ┣ 📂header
 ┃ ┃ ┣ 📂tabBar
 ┃ ┃ ┗ 📜utils.js
 ┣ 📜index.html  // 첫 화면에 로딩 될 html 
 ┣ 📜netlify.toml  // netlify 배포를 위한 환경변수 파일
 ┣ 📜README.md
 ┗ 📜_redirects //  netlify 배포를 위한 환경변수 파일
```

## Technologies
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">

## Tools
<img src="https://img.shields.io/badge/visualstudio-5C2D91?style=for-the-badge&logo=visualstudio&logoColor=white"> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"> <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> <a href="https://www.notion.so/2-C-96a44cf86ea745739afdb0f296b0de2f"><img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"></a>

## Data Sources
이 프로젝트에서는 다음과 같은 데이터 소스를 사용하였습니다.

### API
프로젝트에서는 외부 API를 사용하여 데이터를 가져왔습니다.

- 카카오 지도 - [키워드로 장소검색하고 목록으로 표출하기 - Kakao 지도 Web API](https://apis.map.kakao.com/web/sample/keywordList/)
- 따릉이 - [서울시 공공자전거 대여소 정보 api]([https://data.seoul.go.kr/dataList/OA-13252/F/1/datasetView.do](https://data.seoul.go.kr/dataList/OA-2219/S/1/datasetView.do))
- 날씨 - [Openweather API](https://openweathermap.org/api)
       - [미세먼지 API](https://data.seoul.go.kr/dataList/OA-1200/A/1/datasetView.do)
- 위치 - [Geolocation API](httpps://ipapi.co/)
- 좌표 값 주소명으로 변경 - [GeoCoding] (https://zrr.kr/4Z2L)

### Mock Data
오픈 api로 제공해주지 않는 데이터는 프로젝트의 초기 개발 및 테스트를 위해 모의 데이터를 사용하였습니다.

- 이동수단
  - Elecle-Mock-Data : `/src/api/elecle.json`
  - Kickgoing-Mock-Data : `/src/api/elecle.json`
- 즐겨찾기
  - Favorite-Mock-Data : `/src/api/favorite.json`
- 사용자
  - User-Mock-Data : `/src/api/user.json`

### Session Storage
웹 브라우저가 제공하는 저장소 중 하나로 html간의 데이터 통신을 위해 사용하였습니다.

- 주소
    - key : address / value: {"address":"서울특별시 마포구 양화로 72","x":126.916493990351,"y":37.5508138163956}
- 로그인 상태
    - key : isLogin / value: ture(false)

## Page Features
  1. Index Page
      - 실시간 기상 정보
        - session storage에 defalut값 저장
        - 이를 기반으로 실시간 기상 정보 통신
      - 마커 및 대여 현황 표시
        - 호출한 데이터를 이용해 헤이버사인 함수로 좌표기반 500m 이내 값 추출
        - 추출값 순회하며 마커 표시
        - 온 클릭 시 해당 정보 하단의 팝 카드로 랜더링
      - 마커 필터링
        - 브랜드 별로 필터링 기능 제공
        - 필터 클릭 시 해당 브랜드 마커만 출력
      - 현재 위치 조회
        - geoLocation API를 이용하여 사용자 현재 위치 조회 후 세션 저장
        - 마커링 함수 재호출
  2. Search Page
      - 검색 결과 리스팅
        - 사용자 장소 및 키워드 검색 시
        - 카카오 map 키워드로 검색하기 api 호출
        - 반환 값 순회하여 리스팅으로 유저 선택 유도
      - 현 위치로 검색
        - geoLocation API 호출하여 좌표 값 추출
        - 좌표 값을 geoCoding API로 주소명으로 변경
      - 대여 현황 표시
        - 선택 장소명에 일치하는 주소값 상단 표시
        - 즐겨찾기 기능 제공
        - 메인 로직 활용하여 배열의 누적 값 산출 후 표시
      - 지도로 연결
        - 버튼 클릭 시 session storage에 주소 값 저장
        - 메인 화면으로 링크 연결
  3. Favorite Page
      - 즐겨찾기 카드 리스트
        - Fetch 함수로 json data호출
        - 순회 함수로 카드 리스트 띄우기
      - 즐겨찾기 별아이콘 삭제/ 추가
        - 별 아이콘 클릭 시 카드 삭제 기능
      - 지도 아이콘 클릭 이벤트
        - 지도 아이콘 클릭 시 메인페이지의 해당 위치 지도 이동
        - 즐겨찾기 데이터 session storage에 저장
  4. My Page
      - 프로필
        - 사용자의 json 데이터를 받아와 출력
        - 프로필 사진 커스텀 가능
      - Password & Logout
        - 비밀번호 수정 시 사용자의 password를 받아와 비교
        - 2개의 비밀번호와 비밀번호 확인 시 일치여부 확인
        - 새 비밀번호 작성 시 유효성 검사
        - 로그아웃 시 로그인 페이지로 이동 구현
      - 즐겨찾기
        - 즐거찾기 클릭 시 데이터 호출하여 즐겨찾기 리스트 생성
        - 아이콘 클릭 시 해당 기능 동작
  5. Login Page
      - 로그인
        - Test 계정으로 접근 가능
        - 보기 아이콘 클릭 시 비밀번호 입력 값 확인 가능
        - 즐겨찾기, 마이페이지 접근 전 필수 페이지  
  6. Sign-up Page
      - 회원가입
        - 유효성 검사 오류 시 즉각적인 경고 알림
        - 정보 제공 필수 항목 동의 시 가입 완료 
        
## How To Use

 프로젝트를 개발하기 위해 다음 단계를 따라주세요.
 
 ### 0. 개발 환경 설정
  1) Visual Studio Code 설치
   먼저 [Visual Studio Code](https://code.visualstudio.com/)를 다운로드하고 설치하세요.
  2) Live Server 확장 프로그램 설치
   Visual Studio Code의 확장 매장에서 Live Server를 찾아 설치하세요. 이 확장 프로그램은 로컬 서버를 실행하여 프로젝트를 쉽게 테스트할 수 있도록 도와줍니다.
  3) 포트 번호 설정
   Live Server를 실행할 때 사용할 포트 번호를 5500으로 설정하세요.
    - Visual Studio Code에서 프로젝트 폴더를 열고, `index.html` 파일을 선택합니다.
    - 텍스트 편집기에서 마우스 오른쪽 버튼을 클릭하고 "Open with Live Server"를 선택합니다.
    - 웹 브라우저가 열리면 URL에 `http://localhost:5500`이 표시되어 있어야 합니다.
    이제 포트 번호를 5500으로 설정하여 Live Server를 사용하여 프로젝트를 실행할 수 있습니다.

 ### 1. 이 프로젝트를 클론합니다.
  ```bash
  git clone https://github.com/leeraquel/SeSAC-green-way-Seoul.git
  ```
  ### 2. 프로젝트 디렉토리로 이동합니다.
  ```bash
  cd SeSAC-green-way-Seoul
  ```
  ### 3. VSCode를 실행합니다.
  ```bash
  code .
  ```
  ### 4. 프로젝트를 로컬 서버에서 실행합니다. (예: Live Server VSCode extension 사용)
   - [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 확장 프로그램을 사용하여 VSCode에서 프로젝트를 열고 `index.html` 파일을 열고 "Go Live" 버튼을 클릭합니다.
   - 또는 로컬 웹 서버를 사용하여 `index.html` 파일을 엽니다.
  ### 5. 오픈 API 사용
   이 프로젝트는 외부 API를 사용하여 데이터를 가져옵니다. 프로젝트에서 사용하는 오픈 API는 키 값을 필요로 합니다. config.js 파일을 생성해서 아래와 같이 작성해주세요.
  ``` Javascript
  export const seoulKey = '공공데이터 API 키 값';
  export const googleKey = '구글 API 키 값';
  export const openWeatherKey = '날씨 API 키 값';


  ```
### 🚨현재 kakao api와 서울시 공공데이터 api 도메인이 배포 링크로 되어있어 로컬 실행 시 메인 화면 지도와 따릉이, 대기정보가 표시되지 않습니다.🚨
       동작 구현을 보시려면 배포 링크를 참고해주세요. 
  ### 배포
   - 이 프로젝트는 [Nelfty](https://nelfty.com/)를 사용하여 배포되었습니다.
     - **URL**: [green-way-seoul(https://green-way-seoul.netlify.app/)
     - **포트 번호**: 5500
       
  ### 테스트
   - 프로젝트에는 자동화된 테스트가 포함되어 있지 않습니다. 그러나 각 파일에 대한 수동 테스트를 진행할 수 있습니다.
     - **JavaScript**: JavaScript 파일에 대한 테스트는 콘솔을 사용하여 브라우저에서 실행된 결과를 확인할 수 있습니다.
     - **CSS**: CSS 파일을 열어 프로젝트가 예상대로 스타일링되었는지 확인합니다.
     - **CSS**: CSS 파일을 열어 프로젝트가 예상대로 스타일링되었는지 확인합니다.


  

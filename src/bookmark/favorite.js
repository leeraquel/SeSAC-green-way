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

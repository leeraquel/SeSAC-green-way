import { seoulKey } from '../../config.js';

fetch(`http://openapi.seoul.go.kr:8088/${seoulKey}/json/bikeList/1/100/`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) =>
    console.error('There was a problem with your fetch operation:', error)
  );

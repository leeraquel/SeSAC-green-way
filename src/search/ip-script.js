 const getCurrentLocation = () => {
    fetch("httpps://ipapi.co/json/")
        .then((response) => response.json())
        .then((data) => {
            const des = document.querySelector("p");
            des.innerHTML = 'Latitude:' ${data.latitude} Longitude: ${data.longitude}
        });
 };
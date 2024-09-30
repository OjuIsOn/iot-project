var map = L.map('map').setView([0,0], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true, // Use GPS and other high-accuracy methods
    timeout: 5000, // Maximum time to wait for a position update (in ms)
    maximumAge: 0 // Do not use a cached position
  });

let marker,circle;

var squareIcon = L.divIcon({
    className: 'custom-square-icon',
    iconSize: [20, 20],
});

function success(pos){
    const lat =30.183143;
    const lng=77.272701;
    const accuracy= pos.coords.accuracy;

    if(marker){
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

    marker=L.marker([lat,lng]).addTo(map);
    circle=L.circle([lat,lng], { radius: accuracy}).addTo(map);

    L.marker([29.909,76.87667], { icon: squareIcon }).addTo(map)
            .bindPopup('I am a square-shaped marker!');

    map.fitBounds(circle.getBounds());

    map.setView([lat,lng]);

    console.log("The current lat is "+lat);
    console.log("The current lng is "+ lng);
    console.log("The accuracy is around "+accuracy);
}

function error(err){

    if(err.code===1){
        alert("Please allow geolocation access");
    }else{
        alert("Error !!");
    }
}
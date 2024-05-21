// Map
var map = L.map('map').setView([0, 0], 2);

// OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 100,
}).addTo(map);

// icon plane
var planeIcon = L.icon({
    iconUrl: './plane.png', 
    iconSize: [38, 38], 
    iconAnchor: [19, 19], 
    popupAnchor: [0, -20] 
});

// plot the path, plane marker
function showPath() {
    var startLat = parseFloat(document.getElementById('start-lat').value);
    var startLon = parseFloat(document.getElementById('start-lon').value);
    var endLat = parseFloat(document.getElementById('end-lat').value);
    var endLon = parseFloat(document.getElementById('end-lon').value);
    var planeLat = parseFloat(document.getElementById('plane-lat').value);
    var planeLon = parseFloat(document.getElementById('plane-lon').value);

    if (isNaN(startLat) || isNaN(startLon) || isNaN(endLat) || isNaN(endLon) || isNaN(planeLat) || isNaN(planeLon)) {
        alert('Please enter valid coordinates.');
        return;
    }

    // waypoints
    var waypoints = [];
    document.querySelectorAll('.waypoint').forEach(function(waypoint, index) {
        var lat = parseFloat(waypoint.querySelector('.waypoint-lat').value);
        var lon = parseFloat(waypoint.querySelector('.waypoint-lon').value);
        if (!isNaN(lat) && !isNaN(lon)) {
            waypoints.push([lat, lon]);
        }
    });

    // polyline
    var latlngs = [[startLat, startLon], ...waypoints, [endLat, endLon]];

    if (window.polyline) {
        map.removeLayer(window.polyline);
    }
    if (window.planeMarker) {
        map.removeLayer(window.planeMarker);
    }

    window.polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

    // plane marker
    window.planeMarker = L.marker([planeLat, planeLon], {icon: planeIcon}).addTo(map);

    map.fitBounds(window.polyline.getBounds());
}

// add waypoint input
function addWaypoint() {
    var container = document.getElementById('waypoints-container');
    var count = container.querySelectorAll('.waypoint').length + 1;

    var div = document.createElement('div');
    div.className = 'input-group waypoint';

    var latLabel = document.createElement('label');
    latLabel.textContent = `Waypoint Latitude:`;
    var latInput = document.createElement('input');
    latInput.type = 'text';
    latInput.className = 'waypoint-lat';
    latInput.placeholder = `e.g., 39.9042`;

    var lonLabel = document.createElement('label');
    lonLabel.textContent = `Waypoint Longitude:`;
    var lonInput = document.createElement('input');
    lonInput.type = 'text';
    lonInput.className = 'waypoint-lon';
    lonInput.placeholder = `e.g., 116.4074`;

    div.appendChild(latLabel);
    div.appendChild(latInput);
    div.appendChild(lonLabel);
    div.appendChild(lonInput);

    container.appendChild(div);
}

document.getElementById('show-path').addEventListener('click', showPath);
document.getElementById('add-waypoint').addEventListener('click', addWaypoint);

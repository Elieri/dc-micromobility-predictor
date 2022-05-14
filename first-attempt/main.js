/* ----- create map ----- */

let startLocation = [38.904167, -77.016111];

/*console.log(`startLocation type: ${typeof startLocation}`);
console.log(`startLocation value: ${startLocation}`);*/

const map = L.map('map', preferCanvas=true).setView(startLocation, 12);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
}).addTo(map);

/* ----- geolocate user ----- */
/* use "sensors" menu in Chrome dev panel to spoof location 38.9343, -77.0452 */

// setting userLocation this way does NOT work due to async issues;
// flying to map location does work, though
let userLocation;
function geolocate() {
	if (!('geolocation' in navigator)) return;
	navigator.geolocation.getCurrentPosition(position => {
		userLocation = [position.coords.latitude, position.coords.longitude];
		console.log(`userLocation value inside callback function: ${userLocation}`);
		map.flyTo(userLocation, 16);
		return userLocation;
	});
	console.log(`userLocation inside function, outside callback: ${userLocation}`);
}
geolocate();
console.log(`userLocation value after function call: ${userLocation}`);


// testing promises - this didn't work
/*async function getUserPosition() {
	return new Promise((resolve, reject) =>
		navigator.geolocation.getCurrentPosition(resolve, reject)
	);
}

getUserPosition().then(position => {
	userLocation = [position.coords.latitude, position.coords.longitude];
});
console.log(getUserPosition);*/



/* ----- fetch vehicles as geoJSON ----- */
/* not really faster than the other method, it turns out */

async function fetchSpinGeoJSON() {
	let vehicles = {'type': 'FeatureCollection', 'features': []};
	await fetch('https://gbfs.spin.pm/api/gbfs/v1/washington_dc/free_bike_status')
	.then(resp => resp.json())
	.then(data => {
		for(let bike of data.data.bikes) {
			let coordinates = [parseFloat(bike.lon), parseFloat(bike.lat)];
			let properties = bike;
			delete properties.longitude;
			delete properties.latitude;
			let feature = {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': coordinates}, 'properties': properties}
			vehicles.features.push(feature);
		}
	})
	console.log(vehicles);
	L.geoJSON(vehicles).addTo(map);
}

fetchSpinGeoJSON();


/* ----- fetch vehicles and map as individual markers ----- */
/* VERY SLOW */

/*
fetch('https://gbfs.spin.pm/api/gbfs/v1/washington_dc/free_bike_status')
	.then(resp => resp.json())
	.then(data => {
		console.log(data);
		const scooters = data.data.bikes;
		const layerGroup = L.featureGroup().addTo(map);
		scooters.forEach(({lat, lon, bike_id}) => {
			layerGroup.addLayer(
				L.marker([lat, lon]).bindPopup(
					`ID: ${bike_id}`
				)
			)
		})
	});
*/

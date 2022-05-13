/* create map */

const map = L.map('map', preferCanvas=true).setView([38.89, -77.08], 14);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
}).addTo(map);

/* try to get vehicles as geoJSON; not currently working */

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
	});
	console.log(vehicles);
}

vehicles = fetchSpinGeoJSON();

L.geoJSON(vehicles).addTo(map);


/* fetch vehicles and map as individual markers */
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
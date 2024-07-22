// Client side rendering
export const displayMap = (locations) => {
  var map = L.map("map").setView(
    switchCoordinates(locations[0].coordinates),
    6
  );
  var myIcon = L.icon({
    iconUrl: "../img/pin.png",
    iconSize: [31, 40],
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  locations.forEach((loc) => {
    L.marker(switchCoordinates(loc.coordinates), { icon: myIcon })
      .addTo(map)
      .bindPopup(`<div class='custom-popup'>${loc.description}</div>`)
      .openPopup();
  });

  map.removeControl(map.zoomControl);
  L.control
    .zoom({
      position: "bottomleft",
    })
    .addTo(map);

  function switchCoordinates(arr) {
    return [arr[1], arr[0]];
  }
};

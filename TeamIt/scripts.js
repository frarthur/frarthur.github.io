// Initialize the map
const map = L.map('map').setView([46.603354, 1.888334], 5);

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load JSON data
let countryData = {};
fetch('data.json')
    .then(response => response.json())
    .then(data => countryData = data)
    .catch(error => console.error('Error loading data:', error));

// Update country data display
function updateCountryData(country) {
    const results = document.getElementById("results");
    const countryName = document.getElementById("country-name");
    const countryContent = document.getElementById("country-data");

    if (countryData[country]) {
        countryName.textContent = `Information for ${country}`;
        const { Suppliers, Transporters, Equipment, WasteManagement } = countryData[country];

        countryContent.innerHTML = `
            <h3>Suppliers</h3><ul>${Suppliers.map(f => `<li>${f}</li>`).join('')}</ul>
            <h3>Transporters</h3><ul>${Transporters.map(t => `<li>${t}</li>`).join('')}</ul>
            <h3>Equipment</h3><ul>${Equipment.map(e => `<li>${e}</li>`).join('')}</ul>
            <h3>Waste Management</h3><ul>${WasteManagement.map(d => `<li>${d}</li>`).join('')}</ul>
        `;
    } else {
        countryName.textContent = `No data available for ${country}`;
        countryContent.innerHTML = '';
    }
}

// Add interactions with the map
const countries = {
    "France": [46.603354, 1.888334],
    "Spain": [40.463667, -3.74922],
    "Finland": [61.92411, 25.748151],
    "Greece": [39.074208, 21.824312]
};

Object.keys(countries).forEach(country => {
    const [lat, lng] = countries[country];
    L.marker([lat, lng]).addTo(map)
        .bindPopup(country)
        .on('click', () => updateCountryData(country));
});



// Map initialization
const map = L.map('map').setView([50.0755381, 14.4378005], 3.4);

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Ajout d'un thème noir et blanc (CartoDB positron)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; <a href="https://carto.com/attributions">CartoDB</a>'
}).addTo(map);

// Load JSON data
let countryData = {};
fetch('data.json')  // Assure-toi que le chemin est correct ici
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load JSON data');
        }
        return response.json();
    })
    .then(data => {
        countryData = data;
    })
    .catch(error => {
        console.error('Data loading error:', error);
        alert('There was an error loading the data. Please check the console for details.');
    });

// Update displayed data
function updateCountryData(country) {
    const results = document.getElementById("results");
    const countryName = document.getElementById("country-name");
    const countryContent = document.getElementById("country-data");

    if (countryData[country]) {
        countryName.textContent = `Information for ${country}`;
        const { Suppliers, Transporters, WasteManagement, Agriculture, HowTo } = countryData[country];

        countryContent.innerHTML = `
            <section class="category-section">
                <div class="category">
                    <h3>Suppliers</h3><ul>${Suppliers.map(f => `<li>${f}</li>`).join('')}</ul>
                </div>
                <div class="category">
                    <h3>Transporters</h3><ul>${Transporters.map(t => `<li>${t}</li>`).join('')}</ul>
                </div>
                <div class="category">
                    <h3>Waste Management</h3><ul>${WasteManagement.map(e => `<li>${e}</li>`).join('')}</ul>
                </div>
                <div class="category">
                    <h3>Agriculture</h3><ul>${Agriculture.map(d => `<li>${d}</li>`).join('')}</ul>
                </div>
                <div class="category">
                    <h3>HowTo</h3><ul>${HowTo.map(d => `<li>${d}</li>`).join('')}</ul>
                </div>
            </section>
        `;
    } else {
        countryName.textContent = `No data for ${country}`;
        countryContent.innerHTML = '';
    }
}

// Add map interactions with green markers
const countries = {
    "France": [46.603354, 1.888334],
    "Spain": [40.463667, -3.74922],
    "Finland": [61.92411, 25.748151],
    "Greece": [39.074208, 21.824312]
};

Object.keys(countries).forEach(country => {
    const [lat, lng] = countries[country];
    L.circleMarker([lat, lng], {
        color: '#6AA84F', // Make the marker green
        radius: 15,      // Adjust the size of the marker
        weight: 2,      // Border thickness
        fillOpacity: 0.7 // Opacity of the marker fill
    }).addTo(map)
        .bindPopup(country)
        .on('click', () => updateCountryData(country));
});
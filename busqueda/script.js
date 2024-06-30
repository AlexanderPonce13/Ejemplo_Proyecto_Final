// Validación de Búsqueda de Equipos
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var searchCriteria = document.getElementById('searchCriteria').value;

    if (searchCriteria.trim() === '') {
        document.getElementById('searchCriteriaError').textContent = 'El criterio de búsqueda es obligatorio.';
        document.getElementById('searchCriteriaError').style.display = 'block';
    } else {
        document.getElementById('searchCriteriaError').style.display = 'none';
        document.getElementById('searchResults').textContent = 'Resultados de la búsqueda para: ' + searchCriteria;
    }
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none';
    } else {
        sidebar.style.display = 'block';
    }
}

function navigateTo(url) {
    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchResults = document.getElementById("searchResults");

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const searchCriteria = document.getElementById("searchCriteria").value.toLowerCase().trim();
        const equipmentList = JSON.parse(localStorage.getItem("equipmentList")) || [];

        const filteredResults = equipmentList.filter(equipment => {
            // Verifica si el número de serie o el nombre del equipo coinciden con el criterio de búsqueda
            return equipment.serialNumber.toLowerCase().includes(searchCriteria) || 
                   equipment.equipmentName.toLowerCase().includes(searchCriteria);
        });

        displaySearchResults(filteredResults);
    });

    function displaySearchResults(results) {
        searchResults.innerHTML = ""; // Limpia los resultados anteriores

        if (results.length === 0) {
            searchResults.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }

        const resultList = document.createElement("ul");

        results.forEach(result => {
            const listItem = document.createElement("li");
            listItem.textContent = `Número de Serie: ${result.serialNumber}, Nombre del Equipo: ${result.equipmentName}`;
            resultList.appendChild(listItem);
        });

        searchResults.appendChild(resultList);
    }
});

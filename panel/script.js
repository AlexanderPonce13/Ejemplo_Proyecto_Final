document.addEventListener('DOMContentLoaded', function() {
    // Aquí solamente vamos a llamar a la función para actualizar estadísticas
    updateMainPageStats();
    updateEquipmentLists();
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

// Función para actualizar las estadísticas en la página
function updateMainPageStats() {
    // Obtiene los datos de equipos almacenados localmente
    const equipmentData = JSON.parse(localStorage.getItem("equipmentList")) || [];
    
    // Calcula el total de equipos
    const totalEquipos = equipmentData.length;
    
    // Calcula el número de equipos activos y en mantenimiento
    const equiposActivos = equipmentData.filter(item => item.status === "activo").length;
    const equiposMantenimiento = equipmentData.filter(item => item.status === "mantenimiento").length;

    // Almacena las estadísticas en el almacenamiento local
    localStorage.setItem('totalEquipos', totalEquipos);
    localStorage.setItem('equiposActivos', equiposActivos);
    localStorage.setItem('equiposMantenimiento', equiposMantenimiento);

    // Actualiza el contenido de los elementos HTML con las estadísticas obtenidas
    document.getElementById('totalEquipos').textContent = totalEquipos;
    document.getElementById('equiposActivos').textContent = equiposActivos;
    document.getElementById('equiposMantenimiento').textContent = equiposMantenimiento;
}

function updateEquipmentLists() {
    const equipmentData = JSON.parse(localStorage.getItem("equipmentList")) || [];
    console.log('Equipment Data:', equipmentData); // Debug: Verifica los datos de equipos

    updateList('recentlyAdded', equipmentData);
    updateList('maintenance', equipmentData.filter(item => item.status === "mantenimiento"));
    updateList('oldest', equipmentData.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)));
}

function updateList(id, data) {
    const container = document.getElementById(id);
    const displayData = data.slice(0, 5);
    container.innerHTML = displayData.map(item => `<p>${item.equipmentName || 'Nombre no disponible'}</p>`).join('');
}

function toggleFullList(id) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const equipmentData = JSON.parse(localStorage.getItem("equipmentList")) || [];

    let fullData = [];
    if (id === 'recentlyAdded') {
        fullData = equipmentData;
    } else if (id === 'maintenance') {
        fullData = equipmentData.filter(item => item.status === "mantenimiento");
    } else if (id === 'oldest') {
        fullData = equipmentData.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    }

    // Construir el HTML para mostrar todos los datos de los dispositivos dentro de la ventana modal
    const html = fullData.map(item => `
        <div class="device-info">
            <p><strong>Nombre:</strong> ${item.equipmentName || 'Nombre no disponible'}</p>
            <p><strong>Número de Serie:</strong> ${item.serialNumber || 'No disponible'}</p>
            <p><strong>Fecha de Adquisición:</strong> ${item.acquisitionDate || 'No disponible'}</p>
            <p><strong>Estado:</strong> ${item.status || 'No disponible'}</p>
            <p><strong>Departamento:</strong> ${item.department || 'No disponible'}</p>
            <p><strong>Asignado a:</strong> ${item.assignee || 'No disponible'}</p>
        </div>
        <hr>
    `).join('');

    modalContent.innerHTML = html;

    // Mostrar la ventana modal
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
}


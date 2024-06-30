document.addEventListener("DOMContentLoaded", () => {
    const equipmentForm = document.getElementById("equipmentForm");

    equipmentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Obtener valores de los campos del formulario
        const newEquipment = getFormValues();

        // Validar la fecha de adquisición para que no sea futura
        const today = new Date().toISOString().split('T')[0];
        if (newEquipment.acquisitionDate > today) {
            // Mostrar mensaje de error y salir de la función
            document.getElementById("acquisitionDateError").textContent = "La fecha no puede ser futura";
            return;
        }

        // Limpiar mensaje de error si la fecha es válida
        document.getElementById("acquisitionDateError").textContent = "";

        // Obtener la lista de equipos del almacenamiento local o inicializarla si está vacía
        let equipmentList = JSON.parse(localStorage.getItem("equipmentList")) || [];

        // Agregar el nuevo equipo a la lista y guardarla en el almacenamiento local
        equipmentList.push(newEquipment);
        localStorage.setItem("equipmentList", JSON.stringify(equipmentList));

        // Reiniciar el formulario y mostrar mensaje de confirmación
        equipmentForm.reset();
        alert("Equipo agregado correctamente");

        // Actualizar las estadísticas en la página principal
        updateMainPageStats();
    });
});

// Resto del código...



// Función para obtener los valores del formulario
function getFormValues() {
    return {
        serialNumber: document.getElementById("serialNumber").value,
        equipmentName: document.getElementById("equipmentName").value,
        acquisitionDate: document.getElementById("acquisitionDate").value,
        status: document.getElementById("status").value,
        department: document.getElementById("department").value,
        assignee: document.getElementById("assignee").value,
    };
}

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



function updateMainPageStats() {
    // Obtener la lista de equipos del almacenamiento local o inicializarla si está vacía
    const equipmentList = JSON.parse(localStorage.getItem('equipmentList')) || [];

    // Calcular las estadísticas necesarias
    const totalEquipos = equipmentList.length;
    const equiposActivos = equipmentList.filter(e => e.status === 'activo').length;
    const equiposMantenimiento = equipmentList.filter(e => e.status === 'mantenimiento').length;

    // Guardar las estadísticas en el almacenamiento local
    localStorage.setItem('totalEquipos', totalEquipos);
    localStorage.setItem('equiposActivos', equiposActivos);
    localStorage.setItem('equiposMantenimiento', equiposMantenimiento);

    // Actualizar las secciones en la página principal si están presentes
    updateStatsCard("totalEquiposCard", totalEquipos);
    updateStatsCard("equiposActivosCard", equiposActivos);
    updateStatsCard("equiposMantenimientoCard", equiposMantenimiento);
}

// Función para actualizar las tarjetas de estadísticas
function updateStatsCard(cardId, value) {
    const card = document.getElementById(cardId);
    if (card) {
        card.querySelector("p").textContent = value;
    }
}
const editEquipment = (index) => {
    const equipment = equipmentData[index];
    document.getElementById('editSerialNumber').value = equipment.serialNumber;
    document.getElementById('editEquipmentName').value = equipment.equipmentName;
    
    // Establecer la fecha máxima como la fecha actual
    const currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('editAcquisitionDate').max = currentDate;
    
    document.getElementById('editAcquisitionDate').value = equipment.acquisitionDate;
    document.getElementById('editStatus').value = equipment.status;
    document.getElementById('editDepartment').value = equipment.department;
    document.getElementById('editAssignee').value = equipment.assignee;

    const editForm = document.getElementById("editForm");
    editForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que se envíe el formulario por defecto

        // Validar el formulario antes de enviar
        if (validateForm()) {
            // Lógica para guardar los cambios (a completar)
            // Una vez que se hayan guardado los cambios, puedes cerrar el modal, etc.
        }
    });
};

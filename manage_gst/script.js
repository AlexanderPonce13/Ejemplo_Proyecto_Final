document.addEventListener("DOMContentLoaded", () => {
    const equipmentForm = document.getElementById("equipmentForm");
    const equipmentTable = document.getElementById("equipmentTable").getElementsByTagName('tbody')[0];
    const editModal = document.getElementById('editModal');
    const closeModalBtn = editModal.querySelector('.close-btn');

    // Cerrar el modal al hacer clic en la "x"
    closeModalBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });

    // Cargar datos desde el almacenamiento local al cargar la página
    loadEquipmentData();

    equipmentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Obtener valores de los campos del formulario
        const newEquipment = getFormValues();

        // Validar la fecha de adquisición para que no sea futura
        const today = new Date().toISOString().split('T')[0];
        if (newEquipment.acquisitionDate > today) {
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

        // Actualizar la tabla de equipos
        loadEquipmentData();
    });
});

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

function loadEquipmentData() {
    const equipmentTable = document.getElementById("equipmentTable").getElementsByTagName('tbody')[0];
    const equipmentList = JSON.parse(localStorage.getItem("equipmentList")) || [];

    // Limpiar la tabla antes de agregar los datos
    equipmentTable.innerHTML = "";

    equipmentList.forEach((equipment, index) => {
        const row = equipmentTable.insertRow();
        row.insertCell(0).textContent = equipment.serialNumber;
        row.insertCell(1).textContent = equipment.equipmentName;
        row.insertCell(2).textContent = equipment.acquisitionDate;
        row.insertCell(3).textContent = equipment.status;
        row.insertCell(4).textContent = equipment.department;
        row.insertCell(5).textContent = equipment.assignee;

        const actionsCell = row.insertCell(6);
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.onclick = () => editEquipment(index);
        actionsCell.appendChild(editButton);
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none';
    } else {
        sidebar.style.display = 'block';
    }
}

function editEquipment(index) {
    const equipmentList = JSON.parse(localStorage.getItem("equipmentList")) || [];
    const equipment = equipmentList[index];
    document.getElementById('editSerialNumber').value = equipment.serialNumber;
    document.getElementById('editEquipmentName').value = equipment.equipmentName;

    const currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('editAcquisitionDate').max = currentDate;

    document.getElementById('editAcquisitionDate').value = equipment.acquisitionDate;
    document.getElementById('editStatus').value = equipment.status;
    document.getElementById('editDepartment').value = equipment.department;
    document.getElementById('editAssignee').value = equipment.assignee;

    const editForm = document.getElementById("editForm");
    editForm.onsubmit = function(event) {
        event.preventDefault();

        // Validar el formulario antes de enviar
        if (validateEditForm()) {
            equipmentList[index] = {
                serialNumber: document.getElementById('editSerialNumber').value,
                equipmentName: document.getElementById('editEquipmentName').value,
                acquisitionDate: document.getElementById('editAcquisitionDate').value,
                status: document.getElementById('editStatus').value,
                department: document.getElementById('editDepartment').value,
                assignee: document.getElementById('editAssignee').value
            };

            localStorage.setItem("equipmentList", JSON.stringify(equipmentList));
            loadEquipmentData();
            editModal.style.display = 'none';
        }
    };

    document.getElementById('editModal').style.display = 'block';
}

function validateEditForm() {
    const today = new Date().toISOString().split('T')[0];
    const acquisitionDate = document.getElementById('editAcquisitionDate').value;

    if (acquisitionDate > today) {
        document.getElementById("editAcquisitionDateError").textContent = "La fecha no puede ser futura";
        return false;
    }

    document.getElementById("editAcquisitionDateError").textContent = "";
    return true;
}

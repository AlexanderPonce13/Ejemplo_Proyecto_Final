document.addEventListener('DOMContentLoaded', function() {
    const editModal = document.getElementById('editModal');
    const closeModalBtn = editModal.querySelector('.close-btn');
    const editForm = document.getElementById('editForm');
    const equipmentTable = document.getElementById('equipmentTable').getElementsByTagName('tbody')[0];

    // Cerrar el modal al hacer clic en la "x"
    closeModalBtn.addEventListener('click', function() {
        editModal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera del contenido del modal
    window.addEventListener('click', function(event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });

    // Lógica para cargar los datos en la tabla
    const equipmentData = [
        {
            serialNumber: '12345',
            name: 'Laptop',
            acquisitionDate: '2022-01-15',
            status: 'En uso',
            department: 'IT',
            assignee: 'Juan Pérez'
        },
        {
            serialNumber: '67890',
            name: 'Proyector',
            acquisitionDate: '2021-11-25',
            status: 'Disponible',
            department: 'Ventas',
            assignee: ''
        }
    ];

    equipmentData.forEach(equipment => {
        const row = equipmentTable.insertRow();
        row.innerHTML = `
            <td>${equipment.serialNumber}</td>
            <td>${equipment.name}</td>
            <td>${equipment.acquisitionDate}</td>
            <td>${equipment.status}</td>
            <td>${equipment.department}</td>
            <td>${equipment.assignee}</td>
            <td>
                <button onclick="editEquipment('${equipment.serialNumber}')">Editar</button>
            </td>
        `;
    });

    // Función para abrir el modal y cargar los datos del equipo en el formulario
    window.editEquipment = function(serialNumber) {
        const equipment = equipmentData.find(eq => eq.serialNumber === serialNumber);
        if (equipment) {
            editForm.editSerialNumber.value = equipment.serialNumber;
            editForm.editEquipmentName.value = equipment.name;
            editForm.editAcquisitionDate.value = equipment.acquisitionDate;
            editForm.editStatus.value = equipment.status;
            editForm.editDepartment.value = equipment.department;
            editForm.editAssignee.value = equipment.assignee;
            editModal.style.display = 'block';
        }
    };

    // Función para manejar la barra lateral en pantallas pequeñas
    window.toggleSidebar = function() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.style.display === 'block') {
            sidebar.style.display = 'none';
        } else {
            sidebar.style.display = 'block';
        }
    };

    // Cerrar la barra lateral si se hace clic fuera de ella
    window.onclick = (event) => {
        const sidebar = document.getElementById('sidebar');
        if (event.target !== sidebar && !sidebar.contains(event.target) && event.target.className !== 'fas fa-bars') {
            sidebar.style.display = 'none';
        }
    };
});

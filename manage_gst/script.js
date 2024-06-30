document.addEventListener("DOMContentLoaded", () => {
    const equipmentTable = document.getElementById("equipmentTable").getElementsByTagName("tbody")[0];
    let equipmentData = JSON.parse(localStorage.getItem("equipmentList")) || [];

    const renderTable = () => {
        equipmentTable.innerHTML = "";
        equipmentData.forEach((item, index) => {
            const row = equipmentTable.insertRow();
            row.insertCell(0).textContent = item.serialNumber;
            row.insertCell(1).textContent = item.equipmentName;
            row.insertCell(2).textContent = item.acquisitionDate;
            row.insertCell(3).textContent = item.status;
            row.insertCell(4).textContent = item.department;
            row.insertCell(5).textContent = item.assignee;
            const actionsCell = row.insertCell(6);
            const editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.addEventListener("click", () => editEquipment(index));
            actionsCell.appendChild(editButton);
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", () => deleteEquipment(index));
            actionsCell.appendChild(deleteButton);
        });
    };

    const editEquipment = (index) => {
        const equipment = equipmentData[index];
        document.getElementById('editSerialNumber').value = equipment.serialNumber;
        document.getElementById('editEquipmentName').value = equipment.equipmentName;
        document.getElementById('editAcquisitionDate').value = equipment.acquisitionDate;
        document.getElementById('editStatus').value = equipment.status;
        document.getElementById('editDepartment').value = equipment.department;
        document.getElementById('editAssignee').value = equipment.assignee;
        document.getElementById('editModal').style.display = 'block';

        const saveChanges = () => {
            equipmentData[index] = {
                serialNumber: document.getElementById('editSerialNumber').value,
                equipmentName: document.getElementById('editEquipmentName').value,
                acquisitionDate: document.getElementById('editAcquisitionDate').value,
                status: document.getElementById('editStatus').value,
                department: document.getElementById('editDepartment').value,
                assignee: document.getElementById('editAssignee').value
            };
            localStorage.setItem("equipmentList", JSON.stringify(equipmentData));
            renderTable();
            document.getElementById('editModal').style.display = 'none';
            updateStats();
        };

        document.getElementById('editForm').onsubmit = (e) => {
            e.preventDefault();
            saveChanges();
        };
    };

    const deleteEquipment = (index) => {
        if (confirm("¿Está seguro de que desea eliminar este equipo?")) {
            equipmentData.splice(index, 1);
            localStorage.setItem("equipmentList", JSON.stringify(equipmentData));
            renderTable();
            updateStats();
        }
    };

    document.querySelector('.close-btn').addEventListener('click', () => {
        document.getElementById('editModal').style.display = 'none';
    });

    window.onclick = (event) => {
        if (event.target == document.getElementById('editModal')) {
            document.getElementById('editModal').style.display = 'none';
        }
    };

    const updateStats = () => {
        // Add any stats update logic if needed
    };

    renderTable();
});
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none';
    } else {
        sidebar.style.display = 'block';
    }
}
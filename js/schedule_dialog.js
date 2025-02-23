document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("date").addEventListener("input", function(event) {
        let value = event.target.value.replace(/\D/g, "");
        if (value.length > 8) value = value.slice(0, 8);
        if (value.length >= 5) {
            value = value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4);
        } else if (value.length >= 3) {
            value = value.slice(0, 2) + "/" + value.slice(2);
        }
        event.target.value = value;
    });

    document.getElementById("time").addEventListener("input", function(event) {
        let value = event.target.value.replace(/\D/g, "");
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length >= 3) {
            value = value.slice(0, 2) + ":" + value.slice(2);
        }
        event.target.value = value;
    });

    document.getElementById("close-dialog").addEventListener("click", function() {
        clearScheduleDialogFields();
    });

    document.getElementById("save-appointment").addEventListener("click", function(event) {
        event.preventDefault();

        const form = document.querySelector("form");
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        showProcessingDialog();

        let timeLeft = 3;
        const progressBar = document.getElementById("progress-bar");
        const timeRemainingElement = document.getElementById("time-remaining");

        const interval = setInterval(function() {
            timeLeft--;
            progressBar.style.width = ((10 - timeLeft) * 10) + "%";
            timeRemainingElement.textContent = `Tempo restante: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(interval);

                if (editingRow) {
                    updateTableData(editingRow);
                } else {
                    addTableData();
                }

                clearScheduleDialogFields();
                hideProcessingDialog();
                hideScheduleDialog();
            }
        }, 1000);
    });
});

function addTableData() {
    const patientName = document.getElementById("patient-name").value;
    const doctorName = document.getElementById("doctor-name").value;
    const planType = document.querySelector('input[name="plan"]:checked') ? document.querySelector('input[name="plan"]:checked').value : '';
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const tableBody = document.querySelector("table tbody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${patientName}</td>
        <td>${doctorName}</td>
        <td>${planType}</td>
        <td>${date}</td>
        <td>${time}</td>
    `;

    tableBody.appendChild(newRow);
}

function updateTableData(row) {
    const patientName = document.getElementById("patient-name").value;
    const doctorName = document.getElementById("doctor-name").value;
    const planType = document.querySelector('input[name="plan"]:checked') ? document.querySelector('input[name="plan"]:checked').value : '';
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    row.innerHTML = `
        <td>${patientName}</td>
        <td>${doctorName}</td>
        <td>${planType}</td>
        <td>${date}</td>
        <td>${time}</td>
    `;
}

function clearScheduleDialogFields() {
    document.getElementById("patient-name").value = '';
    document.getElementById("doctor-name").value = '';
    document.getElementById("date").value = '';
    document.getElementById("time").value = '';
    document.querySelector('input[name="plan"]:checked').checked = false;
}

function showScheduleDialog() {
    document.getElementById("dialog-container").style.display = "flex";
}

function hideScheduleDialog() {
    document.getElementById("dialog-container").style.display = "none";
}

function showProcessingDialog() {
    document.getElementById("processing-dialog").style.display = "flex";
}

function hideProcessingDialog() {
    const progressBar = document.getElementById("progress-bar");
    const timeRemainingElement = document.getElementById("time-remaining");
    progressBar.style.width = "0%";
    timeRemainingElement.textContent = "Tempo restante: 3s";

    document.getElementById("processing-dialog").style.display = "none";
}
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

    document.getElementById("save-appointment").addEventListener("click", function(event) {
        event.preventDefault();

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

        document.getElementById("dialog-container").style.display = "none";

        document.getElementById("patient-name").value = '';
        document.getElementById("doctor-name").value = '';
        document.getElementById("date").value = '';
        document.getElementById("time").value = '';
        document.querySelector('input[name="plan"]:checked').checked = false;
    });
});

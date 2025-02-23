let editingRow = null;

document.addEventListener("DOMContentLoaded", function() {
    const dialog = document.getElementById("dialog-container");
    const openButton = document.getElementById("new-schedule");
    const closeButton = document.getElementById("close-dialog");

    openButton.addEventListener("click", function() {
        dialog.style.display = "flex";
        editingRow = null;
    });

    closeButton.addEventListener("click", function() {
        dialog.style.display = "none";
    });

    dialog.addEventListener("click", function(event) {
        if (event.target === dialog) {
            dialog.style.display = "none";
        }
    });

    document.querySelector("table tbody").addEventListener("click", function(event) {
        if (event.target.tagName === "TD") {
            const row = event.target.closest("tr");
            const cells = row.querySelectorAll("td");

            document.getElementById("patient-name").value = cells[0].textContent;
            document.getElementById("doctor-name").value = cells[1].textContent;
            const plan = cells[2].textContent;
            document.querySelector(`input[name="plan"][value="${plan}"]`).checked = true;
            document.getElementById("date").value = cells[3].textContent;
            document.getElementById("time").value = cells[4].textContent;

            editingRow = row;
            dialog.style.display = "flex";
        }
    });
});
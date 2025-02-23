document.addEventListener("DOMContentLoaded", function() {
    const dialog = document.getElementById("dialog-container");
    const openButton = document.getElementById("new-schedule");
    const closeButton = document.getElementById("close-dialog");

    openButton.addEventListener("click", function() {
        dialog.style.display = "flex";
    });

    closeButton.addEventListener("click", function() {
        dialog.style.display = "none";
    });

    dialog.addEventListener("click", function(event) {
        if (event.target === dialog) {
            dialog.style.display = "none";
        }
    });
});
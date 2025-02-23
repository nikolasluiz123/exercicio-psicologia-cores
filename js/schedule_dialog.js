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
});

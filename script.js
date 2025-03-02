document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("theme-toggle");
    const body = document.body;

    // Apply saved theme on page load
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    // Check if the button exists (prevents errors on other pages)
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            body.classList.toggle("dark-mode");

            // Save theme preference
            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
    }
});

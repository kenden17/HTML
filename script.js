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


  document.addEventListener("DOMContentLoaded", function() {
    // Get the current URL
    const currentPage = window.location.pathname.split("/").pop();

    // List of all buttons and their corresponding page links
    const buttons = {
      "index.html": "homeButton",
      "Aphug.html": "aphugButton",
      "bio.html": "bioButton",
      "English.html": "englishButton",
      "geometry.html": "geometryButton",
      "health.html": "healthButton",
      "Spanish.html": "spanishButton"
    };

    // Check if the current page matches any button and add the 'active' class
    if (buttons[currentPage]) {
      document.getElementById(buttons[currentPage]).classList.add("active");
    }
  });
  document.addEventListener("DOMContentLoaded", function() {
    // Check if dark mode is enabled in the user's preferences
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Disable transitions initially
    document.body.style.transition = "none";
    
    // Apply the dark-mode class if the user prefers dark mode
    if (userPrefersDark) {
      document.body.classList.add('dark-mode');
    }

    // After a small delay, enable transitions for future mode changes
    setTimeout(() => {
      document.body.style.transition = "background-color 1s, color 1s cubic-bezier(0.79, 0.33, 0.14, 0.53)";
    }, 50); // Small delay to ensure that transitions are applied only after page load
  });



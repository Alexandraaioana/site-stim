// Funcție pentru a încărca HTML extern (header/footer)
function loadHTML(file, containerId, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
            if (callback) callback(); // Execută funcția după încărcare
        })
        .catch(error => console.error(`Eroare la încărcarea ${file}:`, error));
}

// Încărcare header și footer la încărcarea paginii
document.addEventListener("DOMContentLoaded", () => {
    loadHTML("header.html", "header-container", highlightActiveLink);
    loadHTML("footer.html", "footer-container");
});

// Evidențiere link activ în meniu
function highlightActiveLink() {
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll("#header-container nav a");

    links.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            link.classList.add("font-bold", "underline", "text-secondary");
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    loadHTML("header.html", "header-container", setupLanguageToggle);
    loadHTML("footer.html", "footer-container");
});

function setupLanguageToggle() {
    const langButton = document.getElementById("lang-toggle");
    if (!langButton) return;

    let currentLang = localStorage.getItem("lang") || "RO";
    langButton.textContent = currentLang;

    langButton.addEventListener("click", () => {
        currentLang = currentLang === "RO" ? "EN" : "RO";
        localStorage.setItem("lang", currentLang);
        langButton.textContent = currentLang;
        // aici putem adăuga logică de schimbare a textelor
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const popupButtons = document.querySelectorAll("[data-popup]");
    const popups = document.querySelectorAll("[id^='popup']");
    const closeButtons = document.querySelectorAll(".close-popup");

    // Deschidere pop-up
    popupButtons.forEach(button => {
        button.addEventListener("click", () => {
            const popupId = button.getAttribute("data-popup");
            const popup = document.getElementById(popupId);
            popup.classList.remove("hidden");
            popup.classList.add("flex");
        });
    });

    // Închidere cu X
    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest("[id^='popup']").classList.add("hidden");
        });
    });

    // Închidere prin click în afara cardului
    popups.forEach(popup => {
        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.classList.add("hidden");
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    loadShellContent();
});

async function loadShellContent() {
    try {
        const response = await fetch('./index.html');
        const html = await response.text();
        document.body.innerHTML = html;
        initializeEventListeners();
    } catch (error) {
        console.error('Error loading shell content:', error);
    }
}

function initializeEventListeners() {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const pageName = formatPageName(event.target.innerText);
            loadContent(pageName);
        });
    });
}

function formatPageName(pageName) {
    // Transform the page name to match the filename format, if necessary
    // Example: transforms "Settings" to "settings" if your HTML filenames are lowercase
    return pageName.toLowerCase();
}

async function loadContent(pageName) {
    try {
        const response = await fetch(`./${pageName}.html`);
        const html = await response.text();
        document.querySelector('section').innerHTML = html;
        // Optionally, sanitize the HTML content here
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Your existing generatePage functionality
function generatePage() {
    // Implementation of generatePage
}

// Your existing updateUIWithUserData functionality
function updateUIWithUserData(userData) {
    if (!userData) return;

    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userDetails').textContent = JSON.stringify(userData, null, 2);
}

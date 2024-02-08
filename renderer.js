// /Renderer.js
document.addEventListener('DOMContentLoaded', loadShellContent);

async function loadShellContent() {
    try {
        const response = await fetch('./index.html');
        document.body.innerHTML = await response.text();
        initializeEventListeners();
    } catch (error) {
        console.error('Error loading shell content:', error);
    }
}

function initializeEventListeners() {
    document.querySelectorAll(button).forEach(button => {
        button.addEventListener('click', handleLinkClick);
    });
}


function handleLinkClick(event) {
    event.preventDefault();
    loadContent(formatPageName(event.target.innerText));
}

function handleAuthButtonClick(event) {
    event.preventDefault();
    const apiKey = '053905e1fc8b0de378dc341a24ec68c7';
    window.electronAPI.openExternal(`http://www.last.fm/api/auth/?api_key=${apiKey}`);
}

function formatPageName(pageName) {
    return pageName.toLowerCase().replace(/\s+/g, '-');
}

async function loadContent(pageName) {
    try {
        const response = await fetch(`/pgcontent/${pageName}.html`);
        document.querySelector('section').innerHTML = await response.text();
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

function updateUIWithUserData(userData) {
    if (!userData) return;

    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userDetails').textContent = JSON.stringify(userData, null, 2);
}

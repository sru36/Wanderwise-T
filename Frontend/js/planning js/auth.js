
// auth.js
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();

    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const logoutBtn = document.getElementById('logoutBtn');

    loginForm?.addEventListener('submit', handleLogin);
    signupForm?.addEventListener('submit', handleSignup);
    logoutBtn?.addEventListener('click', handleLogout);
});

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    if (!email || !password) return alert('Please fill in all fields');
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    window.location.reload();
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (!name || !email || !password || !confirmPassword) return alert('Please fill in all fields');
    if (password !== confirmPassword) return alert('Passwords do not match');
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    window.location.reload();
}

function handleLogout() {
    localStorage.clear();
    window.location.reload();
}

function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const authContainer = document.getElementById('auth-container');
    const planningContainer = document.getElementById('planning-container');
    if (isLoggedIn === 'true') {
        authContainer?.classList.remove('active');
        planningContainer?.classList.add('active');
    } else {
        planningContainer?.classList.remove('active');
        authContainer?.classList.add('active');
    }
}

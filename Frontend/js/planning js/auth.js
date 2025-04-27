// auth.js - Handles user authentication functionality

// Check if user is already logged in
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
        document.getElementById('auth-container').classList.remove('active');
        document.getElementById('planning-container').classList.add('active');
        loadPackages(); // Load package suggestions
    }
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here we're simulating login - in a real app, you'd validate with a server
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    
    // Show planning interface
    document.getElementById('auth-container').classList.remove('active');
    document.getElementById('planning-container').classList.add('active');
    loadPackages(); // Load package suggestions
}

// Handle signup form submission
function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Here we're simulating signup - in a real app, you'd send this to a server
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    
    // Show planning interface
    document.getElementById('auth-container').classList.remove('active');
    document.getElementById('planning-container').classList.add('active');
    loadPackages(); // Load package suggestions
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Show auth interface
    document.getElementById('planning-container').classList.remove('active');
    document.getElementById('auth-container').classList.add('active');
    
    // Reset forms
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
    document.getElementById('tripForm').reset();
    document.getElementById('results-container').classList.add('hidden');
}

// Check if user is logged in, otherwise redirect to login page
function checkUserAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Export functions for use in other modules
export { 
    checkAuthStatus,
    handleLogin,
    handleSignup,
    handleLogout,
    checkUserAuth
};
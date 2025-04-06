
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }

    // Login form submission
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Check credentials (in production, this would be a server-side check)
        if (username === 'admin' && password === 'akshay1236') {
            // Successful login
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            // Failed login
            loginError.classList.remove('hidden');
        }
    });
});

// Logout functionality (used in dashboard)
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}
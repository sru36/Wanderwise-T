document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = data.redirect;
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('Error during login. Please try again.');
    console.error('Login error:', error);
  }
});
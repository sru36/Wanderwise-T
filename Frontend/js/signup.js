document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Explicitly use the backend server URL
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      window.location.href = data.redirect;
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('Error during signup. Please try again.');
    console.error('Signup error:', error);
  }
});
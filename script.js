// Sign Up
document.getElementById('signup-form').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const res = await fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  alert(data.message);
});

// Sign In
document.getElementById('signin-form').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;
  const res = await fetch('/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  alert(data.message);
  if (res.ok) {
    window.location.href = 'dashboard.html';
  }
});

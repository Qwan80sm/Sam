<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8" />
  <title>تسجيل حساب</title>
</head>
<body>
  <h2>تسجيل حساب جديد</h2>
  <form id="register-form">
    <input type="text" id="username" placeholder="اسم المستخدم" required><br>
    <input type="email" id="email" placeholder="البريد الإلكتروني" required><br>
    <input type="password" id="password" placeholder="كلمة المرور" required><br>
    <button type="submit">تسجيل</button>
  </form>

  <p id="result"></p>

  <script>
    document.getElementById('register-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const result = await response.json();
      document.getElementById('result').textContent = result.message || result.error;
    });
  </script>
</body>
</html>

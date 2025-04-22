const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const usersFile = path.join(__dirname, 'users.json');

function getUsers() {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile, 'utf8');
  return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  if (users.find(user => user.username === username)) {
    return res.json({ success: false, message: 'اسم المستخدم موجود مسبقًا' });
  }

  users.push({ username, password });
  saveUsers(users);
  res.json({ success: true, message: 'تم إنشاء الحساب بنجاح' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    res.json({ success: true, message: 'تم تسجيل الدخول بنجاح' });
  } else {
    res.json({ success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
  }
});

app.listen(PORT, () => {
  console.log(`السيرفر يعمل على http://localhost:${PORT}`);
});

let isLogin = true;

function toggleMode() {
  const formTitle = document.getElementById('formTitle');
  const toggleText = document.getElementById('toggleText');
  const button = document.querySelector('button');

  isLogin = !isLogin;

  if (isLogin) {
    formTitle.innerText = "تسجيل الدخول";
    button.innerText = "تسجيل الدخول";
    toggleText.innerText = "ليس لديك حساب؟";
  } else {
    formTitle.innerText = "إنشاء حساب";
    button.innerText = "إنشاء حساب";
    toggleText.innerText = "هل لديك حساب؟";
  }

  document.getElementById('message').innerText = "";
}

function handleAction() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!username || !password) {
    message.style.color = "orange";
    message.innerText = "الرجاء ملء جميع الحقول";
    return;
  }

  fetch(isLogin ? "/login" : "/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, password})
  })
    .then(res => res.json())
    .then(data => {
      message.style.color = data.success ? "lightgreen" : "red";
      message.innerText = data.message;
      if (data.success && isLogin) {
        setTimeout(() => {
          window.location.href = "XC1.html";
        }, 1000);
      } else if (data.success && !isLogin) {
        toggleMode();
      }
    })
    .catch(err => {
      message.style.color = "red";
      message.innerText = "حدث خطأ أثناء المعالجة";
    });
}

const login = async (email, password) => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (res.status == 200) {
      showAlert("success", "Logged in successfull!");
      window.setTimeout(() => {
        location.assign("/overview");
      }, 1500);
    } else {
      showAlert("error", "incorrect Id or password");
    }
  } catch (err) {
    showAlert("error", err.message);
  }
};

const form = document.querySelector(".form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

const logout = async () => {
  try {
    console.log("fetching ....");
    const res = await fetch("http://127.0.0.1:3000/api/v1/users/logout");
    if (res.status == 200) {
      console.log("reloading....");
      location.reload(true);
    } else {
      showAlert("Error", "error logging out! Try again ");
    }
  } catch (err) {
    showAlert("Error", "error logging out! Try again");
  }
};
const logOutBtn = document.querySelector(".nav__el--logout");
if (logOutBtn) {
  logOutBtn.addEventListener("click", logout);
}

// Utils
const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};
let login_username = document.getElementById("login_username");
let login_password = document.getElementById("login_password");
let signup_username = document.getElementById("signup_username");
let signup_password = document.getElementById("signup_password");
let logIn = document.getElementById("logIn");
let signUp = document.getElementById("signUp");
let signup_btn = document.getElementById("signup_btn");
let login_btn = document.getElementById("login_btn");
let role = document.getElementById("role");
signUp.style.display = "none";

let obj;
let init = () => {
  obj = localStorage.getItem("users");
  if (obj) {
    obj = JSON.parse(obj);
  }
};

init();
let clear = () => {
  login_username.value = "";
  login_password.value = "";
  signup_username.value = "";
  signup_password.value = "";
};
let users = obj || {};

let saveLocal = () => {
  localStorage.setItem("users", JSON.stringify(users));
};

let showProduct = (isAdmin) => {
  if (isAdmin) {
    window.location.href = "pages/admin.html";
  } else {
    window.location.href = "pages/customer.html";
  }
};

let toggleContainer = (a, b) => {
  a.style.display = "flex";
  b.style.display = "none";
};

let toggleClass = (a, b) => {
  a.className = "btn btn-primary";
  a.style.boxShadow = "none";
  b.className = "btn btn";
};

logIn.addEventListener("submit", () => {
  event.preventDefault();
  let username = login_username.value;
  let password = login_password.value;
  let user = users[username];
  sessionStorage.setItem("username", username);
  if (user) {
    if (password === users[username].password) {
      alert("Logged In");
      showProduct(users[username].isAdmin);
    } else {
      alert("Invalid username and password");
    }
  } else {
    alert("Invalid username and password");
  }
  login_username.value = "";
  login_password.value = "";
});

signUp.addEventListener("submit", () => {
  event.preventDefault();
  let isAdmin = role.checked;
  let username = signup_username.value;
  let password = signup_password.value;
  let user = users[username];
  if (user) {
    alert("Account already exists");
  } else {
    users[username] = {
      username: username,
      password: password,
      isAdmin,
      cart: {},
    };
    saveLocal();
    alert("Account added successfully");
  }
  signup_username.value = "";
  signup_password.value = "";
  role.checked = false;
  toggleContainer(logIn, signUp);
  toggleClass(login_btn, signup_btn);
});

login_btn.addEventListener("click", () => {
  toggleContainer(logIn, signUp);
  toggleClass(login_btn, signup_btn);
});

signup_btn.addEventListener("click", () => {
  toggleContainer(signUp, logIn);
  toggleClass(signup_btn, login_btn);
});

let cart = document.getElementById("cart");
let cartList = document.getElementById("cartList");
let home = document.getElementById("product");
let productDesc = document.getElementById("productDesc");
let showUser = document.getElementById("showUser");
let showProduct = document.getElementById("showProduct");
let logOut = document.getElementById("logOut");
let imgUrl, products, username, users;

let goBack = () => {
  window.location.href = "../index.html";
};

let init = () => {
  username = sessionStorage.getItem("username");
  users = localStorage.getItem("users");
  if (!username || !users) {
    alert("LogIn First");
    goBack();
  } else {
    users = JSON.parse(users);
  }
  products = localStorage.getItem("products");
  if (products) {
    products = JSON.parse(products);
  } else {
    alert("No Products Found");
    goBack();
  }

  arr = users[username].cart;
  if (JSON.stringify(arr) === JSON.stringify({})) {
    alert("No item in the cart");
    window.location.href = "../pages/customer.html";
  }
  for (element in arr) {
    addToCart(arr[element]);
  }
  showUser.innerHTML = `Welcome ${username}!`;
};

let saveLocal = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

let createProduct = (property, value) => {
  let element = document.createElement("div");
  element.className = "property";
  let label = document.createElement("label");
  label.innerHTML = property;
  let input = document.createElement("input");
  input.value = value;
  input.disabled = "true";
  element.appendChild(label);
  element.appendChild(input);
  return element;
};

let addToCart = (product) => {
  let mainDiv = document.createElement("div");
  mainDiv.className = "col-lg-4 col-md-6";
  let div = document.createElement("div");
  div.className = "col-md-12 product";

  let img = document.createElement("img");
  img.className = "image";
  img.src = product.image;
  div.appendChild(img);

  div.appendChild(createProduct("Product Name", product.name));
  div.appendChild(createProduct("Product Price", product.price));
  div.appendChild(createProduct("Product Quantity", product.quantity));

  let element = document.createElement("div");
  element.className = "property";
  let removeCart = document.createElement("button");
  removeCart.className = "updateButton btn btn-danger";
  removeCart.innerHTML = "Delete";
  removeCart.addEventListener("click", () => {
    let node = event.target.parentElement.parentElement.parentElement;
    node.remove();
    console.log(username);
    delete users[username].cart[product.name];
    saveLocal(users);
    console.log("deleted");
  });

  let viewDescription = document.createElement("button");
  viewDescription.className = "deleteButton btn btn-warning";
  viewDescription.innerHTML = "View Description";

  viewDescription.addEventListener("click", () => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.className = "image";
    img.src = product.image;
    let h5 = document.createElement("h5");
    h5.innerHTML = "Description:";
    let h6 = document.createElement("h6");
    h6.innerHTML = product.description;
    div.appendChild(img);
    div.appendChild(h5);
    div.appendChild(h6);
    productDesc.innerHTML = "";
    productDesc.appendChild(div);
    showDesc.click();
  });

  element.appendChild(removeCart);
  element.appendChild(viewDescription);
  div.appendChild(element);
  mainDiv.appendChild(div);
  cartList.appendChild(mainDiv);
};

showProduct.addEventListener("click", () => {
  window.location.href = "../pages/customer.html";
});

logOut.addEventListener("click", () => {
  window.location.href = "../index.html";
  alert("Logged Out");
  sessionStorage.clear();
});
init();

let list = document.getElementById("productList");
let productDesc = document.getElementById("productDesc");
let showDesc = document.getElementById("showDesc");
let showCart = document.getElementById("showCart");
let cart = document.getElementById("cart");
let cartList = document.getElementById("cartList");
let home = document.getElementById("product");
let showUser = document.getElementById("showUser");
let logOut = document.getElementById("logOut");
let imgUrl;
let products;
let username;
let init = () => {
  let obj = localStorage.getItem("products");
  if (obj) {
    obj = JSON.parse(obj);
  }
  products = obj || {
    Ac: {
      name: "Ac",
      description: "cools your room",
      price: "15999",
      quantity: "2",
      image:
        "https://media.istockphoto.com/photos/repairman-in-uniform-installing-the-outside-unit-of-air-conditioner-picture-id1303189903?b=1&k=20&m=1303189903&s=170667a&w=0&h=nbAfqp56SNxBWlWjuknQ2jOP2chMyPzeFvCsTpkNWeI=",
    },
    Microwave: {
      name: "Microwave",
      description: "grill in few minutes",
      price: "11999",
      quantity: "1",
      image:
        "https://media.istockphoto.com/photos/an-asian-chinese-female-putting-cakes-on-a-plate-to-microwave-to-heat-picture-id1211304273?b=1&k=20&m=1211304273&s=170667a&w=0&h=MwLBQp26SYrT_wGHn0HRzIVGZNJ2YOMEjj1Vh8R5fv8=",
    },
    Shoes: {
      name: "Shoes",
      description: "Step ahead of neighbour",
      price: "1499",
      quantity: "1",
      image:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    },
  };
  for (element in products) {
    add(products[element]);
  }
  localStorage.setItem("products", JSON.stringify(products));

  obj = localStorage.getItem("users");
  if (obj) {
    obj = JSON.parse(obj);
  }
  users = obj;
  username = sessionStorage.getItem("username");
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

let add = (product) => {
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
  let addCart = document.createElement("button");
  addCart.className = "updateButton btn btn-info";
  addCart.innerHTML = "Add to Cart";
  addCart.addEventListener("click", () => {
    if (users[username].cart[product.name]) {
      console.log("already added");
    } else {
      users[username].cart[product.name] = product;
      saveLocal(users);
      console.log("added");
    }
  });

  let viewDescription = document.createElement("button");
  viewDescription.className = "deleteButton btn btn-danger";
  viewDescription.innerHTML = "View Description";

  viewDescription.addEventListener("click", () => {
    productDesc.innerHTML = product.description;
    showDesc.click();
  });

  element.appendChild(addCart);
  element.appendChild(viewDescription);
  div.appendChild(element);
  mainDiv.appendChild(div);
  list.appendChild(mainDiv);
};

showCart.addEventListener("click", () => {
  if (username) {
    console.log("done");
    window.location.href = "../pages/cart.html";
  } else {
    window.location.href = "../index.html";
    alert("Login First");
    sessionStorage.clear();
  }
});

logOut.addEventListener("click", () => {
  window.location.href = "../index.html";
  alert("Logged Out");
  sessionStorage.clear();
});
init();

let productName = document.getElementById("getName");
let productDescription = document.getElementById("getDescription");
let productPrice = document.getElementById("getPrice");
let productQuantity = document.getElementById("getQuantity");
let productImage = document.getElementById("getImage");
let productContainer = document.getElementById("productContainer");
let addProduct = document.getElementById("addProduct");
let list = document.getElementById("productList");
let logOut = document.getElementById("logOut");
let showUser = document.getElementById("showUser");
let imgUrl;
let products;

let init = () => {
  let obj = localStorage.getItem("products");
  if (obj) {
    obj = JSON.parse(obj);
  }
  let userName = sessionStorage.getItem("username");
  showUser.innerHTML = `Welcome ${userName}!`;
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
  saveLocal(products);
};

let validate = (product) => {
  let result = {
    status: false,
    message: "",
  };
  if (!product.name) {
    result.message = "Invalid Name";
  } else if (!product.description) {
    result.message = "Invalid Description";
  } else if (!product.price) {
    result.message = "Invalid Price";
  } else if (!product.quantity) {
    result.message = "Invalid Quantity";
  } else {
    result.status = true;
  }
  return result;
};

let saveLocal = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

let clearProduct = () => {
  productName.value = "";
  productDescription.value = "";
  productPrice.value = "";
  productQuantity.value = "";
  productImage.value = "";
};

let setProduct = (product) => {
  productName.value = product.name;
  productDescription.value = product.description;
  productPrice.value = product.price;
  productQuantity.value = product.quantity;
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
  div.appendChild(createProduct("Product Description", product.description));
  div.appendChild(createProduct("Product Price", product.price));
  div.appendChild(createProduct("Product Quantity", product.quantity));

  let element = document.createElement("div");
  element.className = "property";
  let updateProduct = document.createElement("button");
  updateProduct.className = "updateButton btn btn-info";
  updateProduct.innerHTML = "Update";

  updateProduct.addEventListener("click", () => {
    setProduct(product);
    let node = event.target.parentElement.parentElement.parentElement;
    node.remove();
    delete products[product.name];
    saveLocal(products);
  });

  let deleteProduct = document.createElement("button");
  deleteProduct.className = "deleteButton btn btn-danger";
  deleteProduct.innerHTML = "Delete";

  deleteProduct.addEventListener("click", () => {
    let node = event.target.parentElement.parentElement.parentElement;
    node.remove();
    delete products[product.name];
    saveLocal(products);
  });

  element.appendChild(updateProduct);
  element.appendChild(deleteProduct);
  div.appendChild(element);
  mainDiv.appendChild(div);
  list.appendChild(mainDiv);
};

productImage.addEventListener("change", (e) => {
  let reader = new FileReader();
  reader.addEventListener("load", () => {
    imgUrl = reader.result;
  });
  reader.readAsDataURL(e.srcElement.files[0]);
});

productContainer.addEventListener("submit", () => {
  event.preventDefault();
  let product = {
    name: productName.value,
    description: productDescription.value,
    price: productPrice.value,
    quantity: productQuantity.value,
    image: imgUrl,
  };

  clearProduct();

  let result = validate(product);

  if (result.status === true) {
    if (products[product.name]) {
      alert("Product already exist");
    } else {
      add(product);
      products[product.name] = product;
      saveLocal(products);
    }
  } else {
    alert(result.message);
  }
});

logOut.addEventListener("click", () => {
  window.location.href = "../index.html";
  alert("Logged Out");
  sessionStorage.clear();
});

init();

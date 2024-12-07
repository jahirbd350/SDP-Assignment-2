const allProduct = () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    .then((res) => res.json())
    .then((data) => {
      displayProduct(data);
    });
};

const displayProduct = (products) => {
  const productContainer = document.getElementById("product-container");
  products.meals.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${product.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${product.strMeal}</h5>
        <p class="card-text">${product.strInstructions.slice(0, 50)}</p>
        <button type="button"
        class="btn btn-success" onclick="addToCart('${product.strMeal}','${
      product.idMeal
    }')"
        >Add to Cart</button>
        </br>
        <button type="button"
        class="btn btn-info mt-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal" onclick="singleProduct(${
          product.idMeal
        })">Details</button>
      </div>
      `;
    productContainer.appendChild(div);
  });
  // console.log(products.meals);
};

const singleProduct = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      displaySingleProduct(data.meals);
    });
};

const displaySingleProduct = (product) => {
  const modalContainer = document.getElementById("modal-container");

  const div = document.createElement("div");
  console.log(product[0]);

  div.innerHTML = `
      <div class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
              ${product[0].strMeal}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-center">
              <img width="250px" src="${product[0].strMealThumb}" />
              <p>${product[0].strInstructions.slice(0, 100)}</p>
            </div>
            <div class="modal-footer">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  modalContainer.appendChild(div);
};
allProduct();

const cartCount = document.getElementById("cartCount").innerText;
const cartCount2 = parseInt(cartCount);

const addToCart = (name, price) => {
  const cartContainer = document.getElementById("cart-container");

  const div = document.createElement("div");
  div.classList.add("cart-info");
  div.innerHTML = `
    <h4>${name}</h4>
    <h3 class="price">${price}</h3>
  `;

  cartContainer.appendChild(div);
  updateTotal();
  cartCount2 += 1;
  document.getElementById("cartCount").innerText = cartCount2;
};

const updateTotal = () => {
  const allPrice = document.getElementsByClassName("price");
  let count = 0;
  for (const element of allPrice) {
    count += parseFloat(element.innerText);
  }
  document.getElementById("totalPrice").innerText = count.toFixed(2);
};

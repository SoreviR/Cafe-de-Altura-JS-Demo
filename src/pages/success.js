//-------------------------------- Data from local storage (products) ----------------------------------------------
let cartProducts = JSON.parse(localStorage.getItem("cart-products"));
if (cartProducts === null) {
  cartProducts = [];
}

//-------------------------------- Data from local storage (total price) ----------------------------------------------
let checkoutTotals = JSON.parse(localStorage.getItem("checkout-total-price"));
if (checkoutTotals === null) {
  checkoutTotals = [];
}

//------------------------------------ Rendering cart products -------------------------------------------
const productsContainer = document.querySelector("#products-container");

const renderingProducts = () => {
  productsContainer.innerHTML = "";
  cartProducts.forEach((product) => {
    productsContainer.innerHTML += `<div class="flex gap-6">                
          <figure class="w-14 h-14">
              <img src=${product.img_url} alt="" />
          </figure>
      
          <div class="flex flex-col w-full gap-1">
              <p class="text-sm font-semibold leading-4">
              ${product.brand}
              </p>
              <p class="text-sm font-normal leading-4">
              Paquete de café, 250 gr
              </p>
          </div>
      
          <h3 class="product-price text-lg font-semibold leading-6">${
            product.price * product.__v
          },00€</h3>
      </div>
      
      <img src="../assets/images/Divider.jpg" alt="" class="h-[1px] w-[776px]" />`;
  });
};
renderingProducts();

//---------------------- Totals information -------------------
const subtotal = document.querySelector(".subtotal");
subtotal.textContent = `${checkoutTotals[0]}`;
const delivery = document.querySelector(".delivery");
delivery.textContent = `${checkoutTotals[1]}`;
const totalPrice = document.querySelector(".total-price");
totalPrice.textContent = `${checkoutTotals[2]}`;

//---------------------------------- Clearing local storage after finish ------------------------
const finishButton = document.querySelector("#finished");
finishButton.addEventListener("click", () => {
  localStorage.removeItem("cart-products");
  localStorage.removeItem("checkout-total-price");
});

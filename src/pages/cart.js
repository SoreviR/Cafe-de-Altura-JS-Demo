//--------------------------- Fetching API data --------------------------
const getData = async (url) => {
  const response = await fetch(url);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error parsing JSON:", error, data);
  }
};

const cafeDeAlturaApiUrl = "https://cafe-de-altura.vercel.app/api/products";
const datos = await getData(cafeDeAlturaApiUrl);
const coffeData = datos.products;

//-------------------------------- Data from local storage ----------------------------------------------
let cartProducts = JSON.parse(localStorage.getItem("cart-products"));
if (cartProducts === null) {
  cartProducts = [];
}

//------------------------------------ Rendering cart products -------------------------------------------
const productsContainer = document.querySelector("#cart-products");

const renderingProducts = () => {
  productsContainer.innerHTML = "";
  cartProducts.forEach((product) => {
    productsContainer.innerHTML += `<div class="flex gap-6">
          <div class="flex gap-2 items-center">
              <button
              class="minus-button w-6 h-6 bg-no-repeat bg-center"
              style="background-image: url(../assets/icons/minus-symbol.svg)"
              ></button>
              <p
              class="text-xs text-Green-color font-normal leading-4 px-2 py-1 bg-[#eaefec] rounded-full"
              >
              ${product.__v}
              </p>
              <button
              class="add-button w-6 h-6 bg-no-repeat bg-center"
              style="background-image: url(../assets/icons/plus-symbol.svg)"
              ></button>
          </div>
      
          <figure class="w-14 h-14">
              <img src=${product.img_url} alt="" />
          </figure>
      
          <div class="flex flex-col w-[506px] gap-1">
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

  //------------------------------- Add and minus buttons logic ----------------------------------------
  const addButtons = document.querySelectorAll(".add-button");
  addButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      cartProducts[index].__v += 1;
      bagCount += 1;
      cartBagCount();
      renderingProducts();
      h2Count();
      subtotalCalculation();
      localStorage.setItem("cart-products", JSON.stringify(cartProducts));
    });
  });

  const minusButtons = document.querySelectorAll(".minus-button");
  minusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      cartProducts[index].__v -= 1;
      bagCount -= 1;
      cartBagCount();

      if (cartProducts[index].__v === 0) {
        cartProducts.splice(index, 1);
      }
      h2Count();
      renderingProducts();
      subtotalCalculation();
      localStorage.setItem("cart-products", JSON.stringify(cartProducts));
    });
  });
};
renderingProducts();

let bagCount = 0;
const productCount = () => {
  cartProducts.map((element) => (bagCount += element.__v));
};
productCount();

//------------ Icon bag count -----------------
const cartBagCount = () => {
  const cartBag = document.querySelector(".cart-count");
  if (bagCount > 0) {
    cartBag.classList.remove("hidden");
    cartBag.textContent = `${bagCount}`;
  } else {
    cartBag.classList.add("hidden");
  }
};
cartBagCount();

//----------------------------- H2 count ---------------------------------
const h2Count = () => {
  const cestaCount = document.querySelector("#cesta-count");
  cestaCount.textContent = `Cesta (${bagCount})`;
};
h2Count();

//----------------------------------- Shipping selection -------------------------------------------
const deliverySelection = document.querySelectorAll(".delivery-selection");
deliverySelection.forEach((radio) => {
  radio.addEventListener("click", () => {
    checkDelivery();
    subtotalCalculation();
  });
});

let deliveryPrice = 0;
const checkDelivery = () => {
  //   const deliverySelection = document.querySelectorAll(".delivery-selection");
  const freeDeliverySelection = document.querySelector("#free-delivery");
  const urgentDeliverySelection = document.querySelector("#urgent-delivery");

  if (freeDeliverySelection.checked) {
    const deliveryType = document.querySelector(".delivery-type");
    deliveryType.textContent = "GRATIS";
    deliveryPrice = 0;
  } else {
    const deliveryType = document.querySelector(".delivery-type");
    deliveryType.textContent = "9,00 €";
    deliveryPrice = 9;
  }
};
checkDelivery();

//----------------------------------- Total calculations ---------------------------------------

const subtotalCalculation = () => {
  const subtotal = document.querySelector(".subtotal");
  const productPrices = document.querySelectorAll(".product-price");

  let totalSum = 0;
  if (productPrices.length !== 0) {
    productPrices.forEach((product) => {
      const newPrice = product.textContent.slice(0, -1).replace(",", ".");
      totalSum += Number(newPrice);
    });
  }
  subtotal.textContent = `${totalSum},00`;

  const totalProductsPrice = document.querySelector(".total-product-price");
  let totalPrice = totalSum + deliveryPrice;
  totalProductsPrice.textContent = `${totalPrice},00 €`;
};
subtotalCalculation();

//---------------------------------- Saving total price in local storage ---------------------------------------------
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.addEventListener("click", () => {
  const totalProductsPrice = document.querySelector(".total-product-price");
  const deliveryPrice = document.querySelector(".delivery-type");
  const totalProducts = document.querySelector(".subtotal");

  const subtotal = totalProducts.textContent;
  const delivery = deliveryPrice.textContent;
  const totalPrice = totalProductsPrice.textContent;

  const checkoutTotal = [subtotal, delivery, totalPrice];

  localStorage.setItem("checkout-total-price", JSON.stringify(checkoutTotal));
});

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

//------------------------------------ Rendering new products -------------------------------------------
const productsContainer = document.querySelector("#products-container");
const productsArray = [
  "Costa Rica Tarrazú",
  "Colombia Los Naranjos",
  "Laos Amanecer",
  "Etiopía Yrgacheff",
  "Kenia Ndunduri",
  "Etiopía Sidamo",
  "Costa Rica Monte Bello",
  "Colombia La Casita",
];

productsArray.forEach((product) => {
  const productInfo = coffeData.find((item) => item.brand === product);

  if (productInfo.available) {
    productsContainer.innerHTML += `<div class="group hover:bg-Taupe-color p-6 gap-6 rounded-lg border border-Taupe-color flex flex-col items-center">
      <figure class="">
          <img src="${productInfo.img_url}" alt="" />
      </figure>
        <h5 class="text-sm font-semibold leading-4">${productInfo.brand}</h5>
        <p class="text-sm font-normal leading-4" >${productInfo.price},00 €</p>
      
      <button class="rounded-[4px] p-2 bg-[#2a5b45b3] text-White-color text-sm font-semibold leading-4 group-hover:bg-Green-color" >Añadir</button>
  </div>`;
  } else {
    productsContainer.innerHTML += `<div class="opacity-50  p-6 gap-6 rounded-lg border border-Taupe-color flex flex-col items-center">
      <figure class="">
          <img src="${productInfo.img_url}" alt="" />
      </figure>
        <h5 class="text-sm font-semibold leading-4">${productInfo.brand}</h5>
        <p class="text-sm font-normal leading-4" >${productInfo.price},00 €</p>
      
      <button class="rounded-[4px] p-2 bg-[#2a5b45b3] text-White-color text-sm font-semibold leading-4 group-hover:bg-Green-color" disabled>Añadir</button>
  </div>`;
  }
});

//------------------------------------- Adding to cart logic ----------------------------------------------------
let bagCount = 0;
cartProducts.map((element) => (bagCount += element.__v));

const cardButtons = document.querySelectorAll("#products-container button");

cardButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const product = coffeData.find(
      (item) => item.brand === productsArray[index]
    );

    //-------- Quantity logic ---------

    const productIndex = cartProducts.findIndex(
      (element) => element.brand === product.brand
    );

    if (productIndex === -1) {
      product.__v += 1;
      cartProducts.push(product);
    } else {
      product.__v += 1;
    }

    //------------------------- Cart bag count --------------------
    bagCount += 1;
    cartBagCount();
  });
});

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

const cartButton = document.querySelector(".cart-bag-icon");
cartButton.addEventListener("click", () => {
  localStorage.setItem("cart-products", JSON.stringify(cartProducts));
});

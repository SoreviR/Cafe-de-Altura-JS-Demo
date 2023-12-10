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
const newProductsContainer = document.querySelector(".new-products-container");
const newProductsArray = [
  "Costa Rica Tarrazú",
  "Colombia Los Naranjos",
  "Laos Amanecer",
  "Etiopía Yrgacheff",
];

newProductsArray.forEach((product) => {
  const productInfo = coffeData.find((item) => item.brand === product);

  newProductsContainer.innerHTML += `<div class="group hover:bg-Taupe-color p-6 gap-6 rounded-lg border border-Taupe-color flex flex-col items-center">
      <figure class="">
          <img src="${productInfo.img_url}" alt="" />
      </figure>
        <h5 class="text-sm font-semibold leading-4">${productInfo.brand}</h5>
        <p class="text-sm font-normal leading-4" >${productInfo.price},00 €</p>
      
      <button  class="rounded-[4px] p-2 bg-[#2a5b45b3] text-White-color text-sm font-semibold leading-4 group-hover:bg-Green-color">Añadir</button>
  </div>`;
});

//------------------------------------- Adding to cart logic ----------------------------------------------------
let bagCount = cartProducts.length;

const cardButtons = document.querySelectorAll(".new-products-container button");

cardButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const product = coffeData.find(
      (item) => item.brand === newProductsArray[index]
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

    bagCount += 1;

    cartBagCount();
  });
});

//------------------------- Cart bag count --------------------
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

const storebuttons = document.querySelectorAll(".button-store");
storebuttons.forEach((button) => {
  button.addEventListener("click", () => {
    localStorage.setItem("cart-products", JSON.stringify(cartProducts));
  });
});

const cartButton = document.querySelector(".cart-bag-icon");
cartButton.addEventListener("click", () => {
  localStorage.setItem("cart-products", JSON.stringify(cartProducts));
});

//------------------------------------------------ Rendering FAQ ----------------------------------------------------------

const faqContainer = document.querySelector("#faq-container");

const faqArray = [
  {
    question: "¿Cómo hago el pedido?",
    asnwer:
      "Selecciona el café que desees probar y completa el proceso de compra. Si lo prefieres, te preguntaremos cada cuánto quieres que te lo mandemos a casa y así nunca te quedarás sin café.",
  },
  {
    question: "¿Por qué los precios son tan bajos?",
    asnwer:
      "Viajamos constantemente para encontrar los mejores granos y a los agricultores más exigentes. Si podemos ofrecerte estos precios es porque tratamos directamente con los productores de café, sin intermediarios. Así obtenemos el mejor precio para ti y la persona que está detrás de los granos de café recibe el mayor beneficio posible.",
  },
  {
    question: "¿Es posible enviar café a mi oficina?",
    asnwer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, autem corrupti. Rerum, aliquid, nobis aspernatur culpa quo dolores molestias deserunt maxime sapiente tempora delectus distinctio atque quam dolor, nostrum tenetur",
  },
];

faqArray.forEach((item, index) => {
  faqContainer.innerHTML += `
<article class="faq-arcticle flex flex-col p-6 gap-4 bg-White-color w-[668px] rounded-[10px]">
    <div class="flex justify-between">
        <h3 class="text-lg font-semibold leading-6">${item.question}</h3>
        <button class=" cursor-pointer" type="button"><img src="../assets/icons/arrow\ down.svg"></button>
     </div>
     <img src="../assets/images/Divider.jpg" alt="divider" />
    <p class="faq-answer hidden text-xs font-normal leading-4">${item.asnwer}</p>   
</article>
`;
});

//-------------------- Faq button logic --------------------
const questionButtons = document.querySelectorAll("#faq-container button");
const answersArray = document.querySelectorAll(".faq-answer");

questionButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    answersArray[index].classList.toggle("hidden");
    if (button.innerHTML === `<img src="../assets/icons/arrow\ down.svg">`) {
      button.innerHTML = `<img src="../assets/icons/arrow\ up.svg">`;
    } else {
      button.innerHTML = `<img src="../assets/icons/arrow\ down.svg">`;
    }
  });
});

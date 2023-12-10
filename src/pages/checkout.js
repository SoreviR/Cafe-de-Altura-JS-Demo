//-------------------------------- Data from local storage ----------------------------------------------
let checkoutTotals = JSON.parse(localStorage.getItem("checkout-total-price"));
if (checkoutTotals === null) {
  checkoutTotals = [];
}

const subtotal = document.querySelector(".subtotal");
subtotal.textContent = `${checkoutTotals[0]}`;
const delivery = document.querySelector(".delivery");
delivery.textContent = `${checkoutTotals[1]}`;
const totalPrice = document.querySelector(".total-price");
totalPrice.textContent = `${checkoutTotals[2]}`;

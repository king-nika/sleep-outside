import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    const totalContainer = document.querySelector(".cart-footer");
    const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);

    totalContainer.classList.remove("hide");
    totalContainer.querySelector("p").textContent = `Total: $${total}`;
  } else {
    document.querySelector(".product-list").innerHTML =
      "<p>No Items in Cart</p>";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

import { loadHeaderFooter } from "../utils.mjs";
loadHeaderFooter();

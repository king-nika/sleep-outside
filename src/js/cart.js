import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function removeCartItem(id) {
  let cartItems = getLocalStorage("so-cart");
  cartItems = cartItems.filter((item) => item.Id !== id);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}

function addRemoveListeners() {
  document.querySelectorAll(".cart-card__remove").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      removeCartItem(id);
    });
  });
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    const totalContainer = document.querySelector(".cart-footer");
    const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);

    totalContainer.classList.remove("hide");
    totalContainer.querySelector("p").textContent = `Total: $${total}`;
    addRemoveListeners(); // Add this line
  } else {
    document.querySelector(".product-list").innerHTML =
      "<p>No Items in Cart</p>";
    document.querySelector(".cart-footer").classList.add("hide");
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
  <button class="cart-card__remove" aria-label="Remove ${item.Name} from cart" data-id="${item.Id}">
    <span class="material-symbols-outlined">&times;</span>
  </button>
</li>`;

  return newItem;
}

renderCartContents();

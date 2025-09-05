import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Retrieve the existing cart data or initialize an empty array if none exists
  let cartItems = getLocalStorage("so-cart");

  if (!Array.isArray(cartItems)) {
    // Ensure cart is an array
    cartItems = [];
  }
  // Add the new product to the cart array
  cartItems.push(product);
  // Store the updated array as a JSON string
  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

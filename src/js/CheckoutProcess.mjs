import ExternalServices from "./ExternalServices.mjs";
import {
  alertMessage,
  getLocalStorage,
  removeAllAlerts,
  setLocalStorage,
} from "./utils.mjs";

const services = new ExternalServices();

function packageItems(items) {
  const simplifiedItems = items.map((item) => ({
    id: item.Id,
    price: item.FinalPrice,
    name: item.Name,
    quantity: 1,
  }));
  return simplifiedItems;
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJson = {};

  formData.forEach((value, key) => {
    convertedJson[key] = value;
  });

  return convertedJson;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    const parentElement = document.querySelector(this.outputSelector);

    const summaryElement = parentElement.querySelector("#cartTotal");
    const itemNumElement = parentElement.querySelector("#num-items");

    itemNumElement.innerText = this.list.length;

    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = `$${this.itemTotal}`;
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = this.itemTotal * 0.06; // 6% tax

    // display the totals.
    this.shipping = 10 + (this.list.length - 1) * 2; // $10 base + $2 per item
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(
      `${this.outputSelector} #orderTotal`,
    );

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
    const formElement = document.forms["checkout-form"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    try {
      await services.checkout(order);
      setLocalStorage("so-cart", []);
      window.location.href = "success.html";
    } catch (error) {
      // get rid of any preexisting alerts.
      removeAllAlerts();
      for (let message in error.message) {
        alertMessage(error.message[message]);
      }
    }
  }
}

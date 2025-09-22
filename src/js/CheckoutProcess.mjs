import { getLocalStorage } from "./utils.mjs";

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

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = this.itemTotal * 0.06; // 6% tax
    // display the totals.
    this.shipping = 10 + this.list.length * 2; // $10 base + $2 per item
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);

    tax.innerText = `$${this.tax.toFixed(2)}`;
  }
}

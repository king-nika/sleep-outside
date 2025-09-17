import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category");
const dataSource = new ProductData();
const myList = new ProductList(
  category,
  dataSource,
  document.querySelector(".product-list"),
);

myList.init();


import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();


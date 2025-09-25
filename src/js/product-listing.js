import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category");
const dataSource = new ExternalServices();
const myList = new ProductList(
  category,
  dataSource,
  document.querySelector(".product-list"),
);

myList.init();

import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

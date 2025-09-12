import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");
const category = getParam("category");
const productDetail = new ProductDetails(productId, dataSource, category);
productDetail.init();

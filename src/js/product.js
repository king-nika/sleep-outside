import { getParam } from "./utils.mjs";
import ProductDetails from "./ ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();
const productId = getParam("product");
const category = getParam("category");
const productDetail = new ProductDetails(productId, dataSource, category);
productDetail.init();

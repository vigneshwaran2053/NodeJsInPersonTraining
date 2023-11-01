const authJwt = require("../middlewear/authJwt.js");

module.exports = app => {
const products = require("../controller/product.controller.js");
var router = require("express" ).Router();//access rest api methods(GET POSt PUT DELETE)
//Create a new Tutorial
router.get("/",[authJwt.verifyToken], products.showAll);
router.get("/", products.showAll);
router.post("/", products.create);
router.delete("/deleteproduct/:id", products.delete);
app.use("/api/products", router);
};
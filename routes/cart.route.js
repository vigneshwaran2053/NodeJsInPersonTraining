module.exports = app => {
    const cart = require("../controller/cart.controller.js");
    var router = require("express" ).Router();//access rest api methods(GET POSt PUT DELETE)
    //Create a new Tutorial
    router.get("/", cart.showAll);
    router.post("/createcart", cart.create);
    router.put("/updatecart/:id", cart.update);
    router.delete("/deletecart/:id", cart.delete);
    router.delete("/deletecart", cart.deleteAll);
    app.use("/api/cart", router);
};
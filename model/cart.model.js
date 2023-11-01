const { mongo, Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema({
        cartid:Number,
        productid:Number,
        quantity:Number,
        totalprice:Number
    });

    schema.method("toJSON",function()
    {
        const { __v,_id,...object } = this.toObject();
        object.id= _id;
        return object;
    });

    const Product = mongoose.model("cart",schema)
    return Product;
}
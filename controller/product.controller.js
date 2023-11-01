const db = require("../model");
const Products = db.products;
// Retrieve all Products from the database,
exports.showAll = (req, res) => {
Products.find({})
.then(data =>{
res.send (data);
})
.catch(err => {
    res.status(500).send({
    message:
     err.message || "Some error occurred while retrieving Products."
    });
 })
};


exports.create = (req, res) => {
    if(!req.body.title){
        res.status(400).send({message:"Tile cannot be empty"})
        return;
    }
    const Product = new Products({
        title:req.body.title,
        description: req.body.description,
        price: req.body.price,
        model: req.body.model
    });
    Product.save()
    .then(data =>{
    res.send (data);
    })
    .catch(err => {
        res.status(500).send({
        message:
         err.message || "Some error occurred while retrieving Products."
        });
    })
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Products.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Products with id=${id}. Maybe Products was not found!`
          });
        } else {
          res.send({
            message: "Products was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Products with id=" + id
        });
      });
  };


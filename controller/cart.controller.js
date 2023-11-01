const db = require("../model");
const Cart = db.carts;
// Retrieve all Products from the database,
exports.showAll = (req, res) => {
Cart.find({})
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
  if(!req.body.cartid){
      res.status(400).send({message:"cartID should not be empty"})
      return;
  }
  const carts = new Cart({
      cartid:req.body.cartid,
      productid: req.body.productid,
      quantity: req.body.quantity,
      totalprice: req.body.totalprice
  });
  carts.save()
  .then(data => {
  res.send(data);
  })
  .catch(err => {
      res.status(500).send({
      message:
       err.message || "Some error occurred while retrieving cart."
      });
  });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Update Data can not be empty!"
    });
  }

  const id = req.params.id;
  
  req.body.totalprice *= req.body.quantity; 

  Cart.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update cart with id=${id}. Maybe cart was not found!`
        });
      } else res.send({ message: "cart was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating cart with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Cart.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete cart with id=${id}. cart with the id was not found!`
        });
      } else {
        res.send({
          message: "cart is deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete cart with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Cart.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} cart deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cart."
      });
    });
};

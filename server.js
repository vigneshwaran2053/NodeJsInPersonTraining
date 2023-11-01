const xpress = require('express');
const cors = require('cors');

const app = xpress();//to access rest api
const db = require("./model")
app.use(xpress.json());
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  })
//routing path
app.get("/",(req,res)=>{ 
    res.json({message:"welcome"});
});
require("./routes/product.route.js")(app);
require("./routes/cart.route.js")(app);
require("./routes/auth.route.js")(app);
const PORT = process.env.PORT || 8083;
app.listen(PORT, ()=>{
    console.log('server is running on port');
})
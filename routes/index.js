const express = require("express");
const Sneaker = require("../models/Sneaker");
const router = express.Router();



router.get("/", (req, res) => {
  res.render('index')
});

router.get("/sneakers/:cat", async (req, res, next) => {
  const category = req.params.cat
  let sneakers = null

  if(category === "collection"){
    sneakers = await Sneaker.find()
  }
  else{
    sneakers = await Sneaker.find({category})
  }

  console.log(sneakers)
  res.render('products', {
    category, 
    sneakers
  })
});

router.get("/one-product/:id", async (req, res, next ) => {
  const id = req.params.id
  const sneaker =  await Sneaker.findOne({_id: id})
  

  console.log(sneaker)
  res.render('one_product', {
    sneaker
  })
});




module.exports = router;

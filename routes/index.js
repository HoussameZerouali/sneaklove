const express = require("express");
const Sneaker = require("../models/Sneaker");
const router = express.Router();



router.get("/", (req, res) => {
  res.render('index')
});

router.get("/sneakers/:cat", async (req, res, next) => {
  const category = req.params.cat
  let sneakers = null

  try{
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
  }
  catch(err){
    next(err)
  }
});

router.get("/one-product/:id", async (req, res, next ) => {
  const id = req.params.id

  try{
    const sneaker =  await Sneaker.findOne({_id: id})
  
    res.render('one_product', {
      sneaker
    })
  }
  catch(err){
    next(err)
  }
});


module.exports = router;

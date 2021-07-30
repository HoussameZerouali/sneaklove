const express = require("express");
const router = express.Router();



router.get("/", (req, res) => {
  res.render('index')
});

router.get("/sneakers/:cat", (req, res) => {
  res.render('products', {
    category: req.params.cat
  })
});

router.get("/one-product/:id", (req, res) => {
  res.render('one_product', {
    sneaker: req.params.id,
  })
});




module.exports = router;

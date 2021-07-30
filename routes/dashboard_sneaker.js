const express = require("express"); // import express in this module
const router = express.Router(); // create an app sub-module (router)
const protectPrivateRoute = require('../middlewares/protectPrivateRoute')
const Sneaker = require('../models/Sneaker')


router.get('/prod-add', protectPrivateRoute, (req, res, next) => {
    res.render('products_add')
})


router.get('/prod-manage', protectPrivateRoute, (req, res, next) => {
    res.render('products_manage')
})


router.post('/prod-add', protectPrivateRoute, async (req, res, next) => {
    try{
        const data = req.body

        const newSneaker = await Sneaker.create(data)
        res.redirect('/one-product/' + newSneaker._id)
        console.log('new sneaker created', data)
    }
    catch(err){
        res.render('products_add',  {
            msg : {status: err.status, text: err.text}
          })
    }

})

module.exports = router;

const express = require("express"); // import express in this module
const router = express.Router(); // create an app sub-module (router)
const protectPrivateRoute = require('../middlewares/protectPrivateRoute');
const Sneaker = require("../models/Sneaker");
const Tag = require("../models/Tag");
const fileUploader = require('../config/cloudinary');


//ADD
router.get('/prod-add', protectPrivateRoute, async (req, res, next) => {
    
    try {
        const tags = await Tag.find();
        res.render('products_add', {
            tags: tags
        })
    }
    catch(err){
        console.log(err)
        next(err)
    }
})

router.post('/prod-add', protectPrivateRoute, fileUploader.single('image'), async (req, res, next) => {   
  
    try{
        const data = req.body
        const img = req.file

        if(img){
            await Sneaker.create({...data, image: img.path})
        }
        else{
            await Sneaker.create(data)
        }

        res.redirect('/prod-add')
    }
    catch(err){
        console.log(err)
        res.render('products_add',  {
            msg : {status: err.status, text: err.text}
          })
    }
})

//MANAGE
router.get('/prod-manage', protectPrivateRoute, (req, res, next) => {
    Sneaker.find().then((result) => {
        res.render('products_manage', {sneakers : result})
    }).catch((err) => {
        console.log(err)
    })
})

//EDIT
router.get("/product-edit/:id", protectPrivateRoute, async (req, res, next ) => {
 
    try{
        const id = req.params.id
        const sneaker =  await Sneaker.findOne({_id: id})
    
        res.render('product_edit', {
          sneaker
        })
    }
    catch{
        next(err)
    }
  });

  router.post("/product-edit/:id", protectPrivateRoute, async (req, res, next) => {
  console.log('BODY', req.body)
    try{
        const id = req.params.id
        const data =  req.body

      

        const editSneaker = await Sneaker.findByIdAndUpdate(id, data, {new: true})
        res.redirect('/prod-manage')
    }
    catch(err){
        next(err)
    }
})

//DELETE
router.get("/product-delete/:id", protectPrivateRoute, async (req, res, next ) => {
    const id = req.params.id

    try{
        const sneaker =  await Sneaker.deleteOne({_id: id})
        res.status(204).redirect('/prod-manage')
    }
    catch(err){
        next(err)
    }
  });

//ADD TAG
router.post('/add-tag', protectPrivateRoute, async (req, res, next) => {
    try {
        await Tag.create(req.body)
        res.redirect('/prod-add')
    }catch(err){
        console.log(err)
        next(err)
    }
    
})



module.exports = router;



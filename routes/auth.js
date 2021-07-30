const express = require("express");
const router = express.Router();
const User = require('../models/User')


router.get("/signup", (req, res) => {
    res.render('signup')
  });

  router.post("/signup", async (req, res, next) => {
    console.log('POST', req.body)
    try{
      const data = req.body
      console.log(data)

      const newUser = await User.create(data)

      console.log('New user created: ', newUser)
      res.redirect('/signin')
    }
    catch(err){
      console.log('Err creating new user')

      res.render('signup', {
        msg : {status: "error", text: "Error creating new User"}
      })
    }
    
  });
  
  router.get("/signin", (req, res) => {
    res.render("signin");
  });

module.exports = router;
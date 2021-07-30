const express = require("express");
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const saltRounds = 10


router.get("/signup", (req, res) => {
    res.render('signup')
  });

router.post("/signup", async (req, res, next) => {

  try{
    const data = req.body

    if(!data.email || !data.password || !data.name || !data.lastname) throw new Error({status: "error", text: "All fields required"})

    const alreadyExist = await User.findOne({email: data.email})

    if(alreadyExist) throw new Error({status: "error", text: "Email already exists"})

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedpwd = bcrypt.hashSync(password, salt);
    data.password = hashedpwd

    const newUser = await User.create(data)

    res.redirect('/signin')
    console.log('New user created: ', newUser)
  }
  catch(err){

    res.render('signup', {
      msg : {status: err.status, text: err.text}
    })
  }
  console.log('Err creating new user')

});
  
  router.get("/signin", (req, res) => {
    res.render("signin");
  });

  router.post("/signin", async (req, res, next) => {

    try{
      const {email, password} = req.body

      const user = await User.findOne({email})

      if(!user) throw new Error({status: "error", text: "Wrong credentials"})

      const isValidPwd = bcrypt.compareSync(
        password,
        user.password
      )

      if(!isValidPwd) throw new Error({status: "error", text: "Wrong credentials"})

      req.session.currentUser = user
      res.redirect('/', {msg: "You are logged in !"})
 
    }
    catch(err){
      console.log('Err connecting')

      res.render('signin', {
        msg : {status: err.status, text: err.text}
      })
    }
    
  });

module.exports = router;
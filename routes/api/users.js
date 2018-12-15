const express = require('express');
const router = express.Router();
const User=require('../../models/User')
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys=require('../../config/keys')
const passport=require('passport')

const validateRegisterInput = require('../../validator/register');
const validateLoginInput = require('../../validator/login');
// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   post api/users/registation
// @desc    Tests users route
// @access  Public
router.post('/register', (req, res) =>{
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
User.findOne({email:req.body.email})
.then(user =>{
   if(user){
       return res.status(400).json({email:'Email Already Exits'})
   }else{
    const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
       const newUser=new User({
           name:req.body.name,
           email:req.body.email,
             avatar,
           password:req.body.password
         
         
       })
       bcrypt.genSalt(10,(err, salt)=> {
        bcrypt.hash(newUser.password, salt,(err, hash)=> {
            if(err)throw err;
            // Store hash in your password DB.
            newUser.password=hash;
            newUser.save()
            .then(user =>res.json(user))
            .catch(err=>console.log(err))

        })
    })
   }
})
})
// @route   GET api/users/login
// @desc    Tests users route
// @access  Public
router.post('/login',(req,res)=>{
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    email=req.body.email,
    password=req.body.password
  User.findOne({email}).then(user=>{
      if(!user){
          errors.user='User Not Found';
        return  res.status(400).json(errors)
      }else{
          //password check
          bcrypt.compare(password,user.password).then(isMatch=>{
              if(isMatch){
                  //isuser match
                  const payload={id:user.id,email:user.email,name:user.name,avatar:user.avatar};
                  //send token
                  jwt.sign(
                    payload,
                    keys.Secretekey,
                  { expiresIn: 60 * 60 },
                  (err,token)=>{
                      res.json({
                          success:true,
                          token:"Bearer "+token

                      })
                  });
                
               }else{
                errors.password='Password Wrong';
               return  res.status(400).json(errors)
               }
            
   
            })
        }
      
  })
})
// @route   GET api/users/testpassportjwt
// @desc    Tests users route
// @access  Public
router.get('/current',passport.authenticate ('jwt',{session:false}),(req,res)=>{

 res.json({
     id:req.user.id,
     name:req.user.name,
     email:req.user.email
 })
})
module.exports = router;

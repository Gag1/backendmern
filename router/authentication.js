const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");



const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const expresshbs = require("express-handlebars");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

//User.deleteMany().then((res) => console.log(res))


//Compile the Handlebars email template into a function that can be used to render the template:
const emailTemplate = handlebars.compile(
  fs.readFileSync(path.join(__dirname, "views/index.handlebars"), "utf8")
);
/*
Handlebars is a popular templating engine for building dynamic web pages
To use Handlebars with Nodemailer, you can create a HTML email template using 
Handlebars and then use Nodemailer's built-in capability to render the template
 and send it as an email. Here are the steps to use Handlebars with Nodemailer:
*/

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "gagikyesayan2091@gmail.com",
    pass: "chwafzjpjkgdsxtw",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//chwafzjpjkgdsxtw


const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    emailToken: `${Math.random()}${Date.now()}`,
    confirmation: false,
  });

  await user.save();

  const emailOptions = {
    from: "gagikyesayan2091@gmail.com",
    to: user.email,
    subject: "Confirmation message !",
    html: emailTemplate({ confirmationToken: user.emailToken }),
  };

  transporter.sendMail(emailOptions, (err) => console.log(err));
  res.status(200).json({ message: "Registration successful" });
});



const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "email is wrong" });
    }
    if(!user.confirmation){
      return res.status(400).json({ error: "confirm your email please." });
    }

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      return res.status(400).json({ error: "password is wrong" });
    }

    const token = jwt.sign(
      { userId: user.id, userName: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: "An error occurred during login" });
  }
});

const emailConfirmationRouter = express.Router();

emailConfirmationRouter.get('',async (req,res) =>{
     let token = req.query.token;
     const confirmedUsersNumber = await User.find({emailToken:token}).count();
   
    if(confirmedUsersNumber>0){
    const changedUserData = await User.find({emailToken:token});

    const confirmationValue = changedUserData.map((item) =>{
      return item.confirmation = true;
    })
    const changedUser = new User(...changedUserData);
    changedUser.save();
    res.redirect('http://localhost:3000/login');
         
    }
     
})
const resetPassword = express.Router();

resetPassword.post('/',(req,res) =>{
  const userEmail = req.body.email;

User.find({email:userEmail}).then((user) =>{
    if(user == 0){
      res.status(401).json({message:'incorrect email !'});
    }else{
      res.status(201).json({message:'check your email please !'});
     
      const forgotPasswordUser =  user.map( (item)  => {
         item.forgotPasswordCode = Math.random();
        const emailOptions = {
          from: "gagikyesayan2091@gmail.com",
          to: userEmail,
          subject: "Forgot password ?",
          html:`<h2> ${item.forgotPasswordCode}</h2>`
        };
        const addedForgotPasswordCode = new User(...user);
        addedForgotPasswordCode.save().then(() =>{
          transporter.sendMail(emailOptions, (err) => console.log(err));
        })

        return;
    })
  }
}) 
})


const checkEmailCode = express.Router();

checkEmailCode.post('/',async(req,res) =>{
  const userEmailResetCode = req.body.code;

  const resetUser = await User.find( {forgotPasswordCode:userEmailResetCode})

  if(resetUser == []){
      res.status(401).json({message:'wrong email code !'});
    }else{
     const hashedPassword = await bcrypt.hash(req.body.password,10)

     const list = resetUser.map((item) =>{
      return item.password = hashedPassword;
     })
      const changedPasswordUser = new User(...resetUser)
      await changedPasswordUser.save()
      res.status(201).json({message:'you have successfully changed your password !'});
    }
})

const authenticationRoutes = {
  registerRouter,
  loginRouter,
  emailConfirmationRouter,
  resetPassword,
  checkEmailCode
}

module.exports = {
  authenticationRoutes,
};

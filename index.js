const express = require('express');
require('dotenv').config();
const routers = require('./router/authentication');
const mongoose = require('mongoose');
const cors = require('cors');

const url = "mongodb+srv://GagikDB:Gagik123@cluster0.zebbtoj.mongodb.net/";

const router1 = routers.authenticationRoutes.registerRouter;
const router2 = routers.authenticationRoutes.loginRouter;
const router3 = routers.authenticationRoutes.emailConfirmationRouter;
const router4 = routers.authenticationRoutes.resetPassword;
const router5 = routers.authenticationRoutes.checkEmailCode;


    

  mongoose.connect(url)
  .then(() =>{

    console.log('connected')

    const app = express();
  
    app.use(cors(
      {
          origin: ["https://clientmern.vercel.app"],
          methods: ["POST","GET"],
          credentials:true
      }
    ))

  
    app.use(express.json());
  
    app.use('/registeredData', router1);
    app.use('/loginedData', router2);
    app.use('/confirm-email',router3);
    app.use('/resetPassword',router4);
    app.use('/postEmailCodeAndPassword',router5);
  
  
   app.listen(3001);
    
  })



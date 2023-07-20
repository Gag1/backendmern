// const express = require('express');
// const nodemailer = require('nodemailer');
// const mailRouter = express.Router();
// const hbs = require('nodemailer-express-handlebars');
// const expresshbs = require('express-handlebars');
// const handlebars = require('handlebars');
// const fs = require('fs');
// const path = require('path');
// const User = require('../models/user');

// //Compile the Handlebars email template into a function that can be used to render the template:
// const emailTemplate = handlebars.compile(fs.readFileSync(path.join(__dirname, 'views/index.handlebars'), 'utf8'));
// /*
// Handlebars is a popular templating engine for building dynamic web pages
// To use Handlebars with Nodemailer, you can create a HTML email template using 
// Handlebars and then use Nodemailer's built-in capability to render the template
//  and send it as an email. Here are the steps to use Handlebars with Nodemailer:
// */
// const transporter = nodemailer.createTransport({
//     service:'gmail',
//     port:587,
//     secure:false,
//     auth:{
//         user:'gagikyesayan2091@gmail.com',
//         pass:'wkcfbhjqvsxekykj'
//     },
//     tls:{
//         rejectUnauthorized:false
//     }
// })


// const emailOptions = {
//     from:'gagikyesayan2091@gmail.com',
//     to:'gagikyesayan2022@gmail.com',
//     subject:'testing my node js app',
//     html:emailTemplate()
// }

// emailTemplate() can pass arguments which will be used in index.handlebars 
// transporter.sendMail(emailOptions,(err) => console.log(err));


// module.exports = mailRouter;
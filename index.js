const express=require('express');

const cors=require('cors');

// const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars');
// const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
app.use(cors());
app.use(express.json())
// Static folder
// app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.render('contact');
// });

app.post('/send', (req, res) => {
  const user_body = `
  <h3>Hi, ${req.body.name}</h3><br/>
  Our team will contact you as soon as possible<br/><br/> 
  Thanks <br/>
  The Law Office of the Peter Sebastian.
  `;
  const admin_body=`<h3>Hi Peter </h3> 
  <br/> 
  We have new lead, please reply within 24 hours 
  <br/><br/> 
  Name: ${req.body.name}<br/>
  Email ID:${req.body.email} <br/>
  Phone:${req.body.phone}<br/>
  Message:${req.body.message}
  <br/><br/>
  Thanks <br/>
  Lead Manager`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'test258231@gmail.com', // 
        pass: 'Test@224488'  //"gmgiqgppfhvlfllm" 
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
   let mailOptions = {
      from: 'test258231@gmail.com', // sender address
      to: 'aakankshaagr2018@gmail.com', // req.body.email list of receivers
      subject:"We have received your query, we will get back to you shorlty." , // Subject line

      html: user_body // html body
  };

  // send mail with defined transport object to users
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }

      res.render('contact', {msg:'Email has been sent'});
  });
 
  
   mailOptions = {
      from: 'test258231@gmail.com', //"it.addroid@gmail.com";   sender address
      to: 'aakankshaagr2018@gmail.com', // support@vbeasy.com   list of receivers
      subject:"New Lead from Ads/Website" , // Subject line

      html: admin_body // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }

      res.render('contact', {msg:'Email has been sent'});
  });
  }); 
app.listen(5000,()=>{
    console.log("server has started on port 5000");
})
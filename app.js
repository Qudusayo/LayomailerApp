const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

 //view engine setup goes here
 app.engine('handlebars' , exphbs());
 app.set('view engine', 'handlebars');

  //Body Parser Middleware(search for its doc on google)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//static/public folder
 app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('layouts/main');
});

 app.post('/send', (req, res) =>{
    name = req.body.name;
    subject = req.body.subject;
    email = req.body.email;
    message = req.body.message;


      // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'layomuhammed@gmail.com',
      pass: 'layogmail2'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  var mailOptions = {
    from: 'layomuhammed@gmail.com',
    to: 'layomuhammed@gmail.com',
    subject: `${subject}`,
    html: `<h1 style="text-align: center;">Welcome: ${name}</h1><p style="text-align:center; ">${message}</p><br><p>From ${email}</p>`
};


transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.render('layouts/main', {msg: 'Email has been sent'})
    }
});      

});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

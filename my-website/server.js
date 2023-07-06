const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("static"));
app.use(express.static("static/me"));
app.use(express.static("static/background"));
app.use(express.static("static/c"));
app.use(express.static("static/C++"));
app.use(express.static("static/CSS"));
app.use(express.static("static/html"));
app.use(express.static("static/javascript"));
app.use(express.static("static/mongodb"));
app.use(express.static("static/Node"));
app.use(express.static("static/Oracle"));
app.use(express.static("static/react"));

app.use(express.urlencoded({ extended: true }));

const exphbs = require("express-handlebars");
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      json: (context) => {
        return JSON.stringify(context);
      },
    },
  })
);

app.set("view engine", ".hbs");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'carissa.cho3@gmail.com',
    pass: 'nnfbpdxnxxnxlpyu'
  }
});

// endpoints
app.get("/", (req, res) => {
  res.render("home", { layout: "nav"});
});

app.get("/about", (req, res) => {
  res.render("about", { layout: "nav"});
});

app.get("/contact", (req, res) => {
  res.render("contact", { layout: "nav"});
});

app.post("/information", (req, res) => {
  const valid =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  if(email.match(valid)){
    var mailOptions = {
      from: `${email}`,
      to: 'carissa.cho3@gmail.com',
      subject:`${name}`,
      text: `${message}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return res.render("message", { layout: "nav",message: `[ERROR]: Sorry but at this time we couldn't process your email!`});
      } else {
        return res.render("message", { layout: "nav",message: `Email Has Successfully Been Sent`});
      }
    });
  }
  else{
    return res.render("message", { layout: "nav", message: `[ERROR]: Sorry but ${email} is not a valid email`});
  }
 

  // res.render("contact", { layout: "nav"});
});


// start server
const onHttpStart = () => {
  console.log("Express http server listening on: " + HTTP_PORT);
  console.log(`http://localhost:${HTTP_PORT}`);
};
app.listen(HTTP_PORT, onHttpStart);

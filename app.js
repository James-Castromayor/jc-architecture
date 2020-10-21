//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//Include lodash use in arrays, numbers, obj, strings, etc
const _ = require('lodash');

const homeStartingContent = "Tell us your dream house and we design for you.";
const aboutContent = "Our design team can make changes to any plan, big or small, to make it perfect for your needs. Our QuikQuotes will get you the cost to build a specific house design in a specific zip code.";
const contactContent = "JohnnyGanni@BBC.com";

const app = express();

//Variables
// var posts = [{
//   title:"Alam mo bakit?", content:"Kasi pwet mo may rocket?"
//   },{
//   title:"San?", content:"Darating?"
// }];
var posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Home Address
app.get ("/", (req, res) =>{
  //Show home.ejs
  res.render("home", { titleContent:"Project", startingContent:homeStartingContent, posts:posts });
})

//About Address
app.get ("/about", (req, res) =>{
  //Show home.ejs
  res.render("about", { titleContent:"About", startingContent:aboutContent });
})

//Contact Address
app.get ("/contact", (req, res) =>{
  //Show home.ejs
  res.render("contact", { titleContent:"Contact", startingContent:contactContent });
})

//Compose Address
app.get ("/compose", (req, res) =>{
  //Show home.ejs
  res.render("compose", { titleContent:"Compose", startingContent:contactContent });
})

app.post("/compose", (req, res)=>{
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect('/');
})

//Add Notes
app.post("/addNotes", (req, res)=>{
  res.redirect('/compose');
})

//Dynamic Posting - Rerouting
app.get ('/post/:postName', (req,res) => {
  //console.log(req.params.postName);
  const requestedTitle = _.lowerCase(req.params.postName);

  //Check if there is a match post
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle)
    {
      //console.log("Match found");
      res.render("post", {titleContent:post.title, startingContent:post.content, posts:posts});
    }
  })

})

//Send Inquiry
app.get ("/sendInquiry", (req, res) =>{
  //Show home.ejs
  res.render("contact", { titleContent:"Contact", startingContent:contactContent });
})


//Send Inquiry in CONTACT
app.post("/sendInquiry", (req, res)=>{
  // const post = {
  //   title: req.body.postTitle,
  //   content: req.body.postBody
  // };
  // posts.push(post);
  res.redirect('/');
})

app.listen(process.env.PORT || '3000', function() {
  console.log("Server started.");
});

//----------------------------------------------------------------------------------------//
//Name: Brandon Schultz                                                                   //
//Date: 5-18-20                                                                           //
//Description: File contains code for a web application that receives POST/GET requests   //
//using the same URL.                                                                     //
//----------------------------------------------------------------------------------------//

//----------------------------------------------------------------------------------------//
//-Variables                                                                              //
//-express: Imports express module. Used in handling of HTTP requests and responses.      //
//-app: Used for association between express and my program.                              //
//-handlebars:Imports express-handlebars module. Makes "main.handlebars" file the         //
//default layout.                                                                         //
//-bodyParser:Imports module that simplifies obtaining form data by parsing bodies        //
//of requests sent from client.                                                           //
//----------------------------------------------------------------------------------------//
var express = require("express");
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Allowes express to use handlebars as view engine.
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

//Port associated with URL. |   http://flip3.engr.oregonstate.edu:27428/
app.set("port", 27428);

//Get function that associates the intial page with "initial.handlebars" file.
app.get("/",function(req,res)
{
 res.render("initial");
});

//----------------------------------------------------------------------------------------//
//Upon receiving a GET request, function renders a page that has a H1 tag displaying "GET //
//Request Received" before adding to an HTML table that shows all parameter names and     //
//values which were sent in the URL query string.                                         //
//----------------------------------------------------------------------------------------//
app.get("/get-display",function(req,res)
{
 var dataArray = [];
 for (var j in req.query)
 {
  dataArray.push({"name":j, "value":req.query[j]})
 }
 var context = {};
 context.dataList = dataArray;
 res.render("getReqData", context);
});

//----------------------------------------------------------------------------------------//
//Upon receiving a POST request, function renders a page that has a H1 tag displaying     //
//"POST Request Received" before adding to an HTML table that shows all parameter names   //
//and values which were sent in the URL query string.                                     //
//Additionally, displays table that contains  property names and values that were         //
//received in the request body.                                                           //
//----------------------------------------------------------------------------------------//
app.post("/post-display",function(req,res)
{
 var dataArray = [];
 for (var j in req.query)
 {
    dataArray.push({"name":j, "value":req.query[j]})
 }

 for (var j in req.body)
 {
    dataArray.push({"name":j, "value":req.body[j]})
 }
 var context = {};
 context.dataList = dataArray;
 res.render("postReqData", context);
});

//First use call. Takes the request and response as arguements and will display 
//an error message.
app.use(function(req,res)
{
 res.status(404);
 res.render("404");
});

//2nd use call. Generalized error handler
app.use(function(err,req,res,next)
{
 console.error(err.stack);
 res.type("plain/text");
 res.status(500);
 res.render("500");
});

//Listen method that finds port value and logs it to console. 
app.listen(app.get("port"),function()
{
 console.log("Express started on http://localhost:" + app.get("port") + ";press Ctrl-C to terminate.");
});
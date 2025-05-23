const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
let Listing = require("./models/listing.js");
app.use(express.urlencoded({ extended: true }));
const methodoverride = require("method-override");
app.use(methodoverride("_method"));
const ejsmate = require("ejs-mate");
app.engine("ejs", ejsmate);

//db connection establishment start
async function main() {
  mongoose.connect("mongodb://localhost:27017/wanderlust");
}
main()
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("error");
  });
//connection establishment done

app.listen(8080, () => {
  console.log(`http://localhost:${8080}`);
});

app.get("/", (req, res) => {
  res.send("RUNNING");
});

app.get("/listings", async (req, res) => {
  let lists = await Listing.find();
  // console.log(lists);
  res.render("./listings/lists.ejs", { lists });
});

app.get("/listings/new", (req, res) => {
  res.render("./listings/newlist.ejs");
}); //placing this above the /listing/:id to avoid errors ,if it is placed after it new is treated as :id
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const list = await Listing.findById(id);
  // console.log(list);
  res.render("./listings/list.ejs", { list });
});

// app.post("/listings",async (req,res) => {
//     let {title,description,imagelink,price,location,country} = req.body;
//    let newdata = await Listing.insertMany({
//         title:title,
//         description:description,
//         image:imagelink,
//         price:price,                //lengthy way, to resolve this we use the below code
//         location:location,
//         country:country
//     })
//     console.log(newdata);
//     res.redirect("/listings")
// });
app.post("/listings", async (req, res) => {
  let listing = req.body.listing; //returns all the entered data in the form because there we stored all data in a listing object
  let newdata = new Listing(listing);
  await newdata.save();
  res.redirect("/listings");
});

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findById(id);
  console.log(list);
  res.render("./listings/edit.ejs", { list });
});

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let olddata = await Listing.findById(id);
  let listing = req.body.listing;
  // console.log(listing);
  await Listing.findByIdAndUpdate(id, listing);
  res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedData = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

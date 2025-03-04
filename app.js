const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

main()
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
  }

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res)=>{
    res.send("Hi, I am root!")
})


// INDEX ROUTE
app.get("/listings", async (req, res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});


// NEW ROUTE
app.get("/listings/new", (req, res) =>{
    res.render("listings/new.ejs");
});

//SHOW ROUTE
app.get("/listings/:id", async (req, res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//CREATE ROUTE
app.post("/listings", async (req, res)=>{
    // let {title, description, image, price, location, country} = req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});


// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "my new villa",
//         description: "by the beach",
//         image: {
//             filename: 'listingimage',
//             url: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
//           },
//         price: 1000,
//         location: "goa",
//         country: "india",
//     });
//     await sampleListing.save();
//     console.log("sample wasa saved");
//     res.send("successful testing");
// })

app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
});

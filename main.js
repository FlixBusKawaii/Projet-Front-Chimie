const express = require("express");

let app = express();

app.use(express.static("public"));

app.get("/",(req,res) => {
    res.redirect("recap_produit.html");
});

app.listen(2500, () => {
    console.log("API gestion de produit lancée.");
})
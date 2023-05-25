const URL_FOR_PRODUCTS = 'http://localhost:3010/products'
const table = document.querySelector("#products");
const form_for_products = document.querySelector("#pform");
const form_for_armoire = document.querySelector("#aform");

const binary_table = [
    0b000000001, 
    0b000000010, 
    0b000000100, 
    0b000001000, 
    0b000010000, 
    0b000100000, 
    0b001000000, 
    0b010000000, 
    0b100000000, 
];

let products_keys = ["id", "idType", "idArmoir", "DatePeremption"];
let type_product_keys = ["idType", "Nom", "ImageP", "LienFicheDeSecurite", "Pictogramme"];
let armoir_keys = ["idArmoir", "NomArmoire", "Localisation", "Image"];

const check_Produit={
    idType: /^[0-9]+$/,
    DatePeremption: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
};

form_for_products.addEventListener("submit", event => {
    let type_of_data = 'Produit';
    let rawdata = new FormData(form_for_products);
    let data = {};
    rawdata.forEach((value, key) => {
        if(value.match(check_Produit[key]) == null){
            document.getElementById("error").innerHTML = "Vérifiez les informations";
            event.preventDefault();
            return;
        }
        data[key] = value;
    });
    for(let input of document.querySelectorAll("form input:not([type='submit'])")){
        input.value = "";
    }
    let final_data = {key:type_of_data, data:data};
    event.preventDefault();
    return add_product(final_data);
});

const add_product = item => fetch(URL_FOR_PRODUCTS, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
})  .then(res=>res.text())
    .then(res=>{
        if(!isNaN(parseInt(res)))
        {
            alert("Votre produit a été placé dans l'armoire "+res+".");
        }
        else{
            alert(res);
        }
})
    .then(document.location.href="recap_produit.html");
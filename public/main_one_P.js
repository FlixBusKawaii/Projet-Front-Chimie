const URL_FOR_PRODUCTS = 'http://localhost:3010/products'
const table = document.querySelector("#products");
const form_for_products = document.querySelector("#pform");
const form_for_armoire = document.querySelector("#aform");

let products_keys = ["id", "idType", "idArmoir", "DatePeremption"];
let type_product_keys = ["idType", "Nom", "ImageP", "LienFicheDeSecurite", "Pictogramme"];
let armoir_keys = ["idArmoir", "NomArmoire", "Localisation", "Image"];

const check_Produit={
    idType: /^[0-9]+$/,
    DatePeremption: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
};

let current_product;

const load_P=()=>{
    fetch(URL_FOR_PRODUCTS+"?key=id&data"+document.location.search.get("id"))
    .then(res => res.json())
    .then(json => constructProduct(json));
}

const constructProduct=product=>{
    console.log(product);
}


/*const get_more_of_P = () => {
    let new_user = {};
    let row = document.getElementById("user-" + current_product.id);
    let row_data = row.children;
    row_json = document.createElement("tr");
    row_json.id = "?-" + item.id;
    row_json.innerHTML = `
    <td>${item.id}</td>
    <td>${item.idType}</td>
    <td>${item.idArmoir}</td>
    <td>${item.DatePeremption}</td>
    ${picto}
    `;
    table.appendChild(row);
};*/
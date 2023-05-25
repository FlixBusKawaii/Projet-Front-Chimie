const URL_FOR_PRODUCTS = 'http://localhost:3010/products'
const table = document.querySelector("#products");
const form_for_products = document.querySelector("#pform");
const form_for_armoire = document.querySelector("#aform");

const binary_table = [
    s1 = 0b000000001, 
    s2 = 0b000000010, 
    s3 = 0b000000100, 
    s4 = 0b000001000, 
    s5 = 0b000010000, 
    s6 = 0b000100000, 
    s7 = 0b001000000, 
    s8 = 0b010000000, 
    s9 = 0b100000000, 
];

let products_keys = ["id", "idType", "idArmoir", "DatePeremption"];
let type_product_keys = ["idType", "Nom", "ImageP", "LienFicheDeSecurite", "Pictogramme"];
let armoir_keys = ["idArmoir", "NomArmoire", "Localisation", "Image"];

const check_Produit={
    idType: /^[0-9]+$/,
    DatePeremption: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
};

const get_products = () => fetch(URL_FOR_PRODUCTS+"?key=Nom")
    .then(res => res.json())
    .then(json => constructTableProduct(json));

const construct_picto = binary_seq => {
    let mot_picto = "";
    let i=1;
    for(let P in binary_table){
        if(binary_seq&P == P){
            let pick = 'P'+i.toString()+'.jpg';
            mot_picto += '<td><img src="'+pick+'"></td>';
        }
    }
    return mot_picto;
};

const constructTableProduct = tab => {
    table.innerHTML = "";
    for(let item of tab)
    {
        let picto = construct_picto(item.Pictogramme);
        let row = document.createElement("tr");
        row.id = "?-" + item.id;
        row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.idType}</td>
        <td>${item.idArmoir}</td>
        <td>${item.DatePeremption}</td>
        ${picto}
        `;
        table.appendChild(row); 
    }
};

get_products();
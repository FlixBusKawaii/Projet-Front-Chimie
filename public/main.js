const URL_FOR_PRODUCTS = 'http://localhost:3010/products'
const table = document.querySelector("#products");
const form_for_products = document.querySelector("#pform");
const form_for_armoire = document.querySelector("#aform");

const s1=0b000000001=1;
const s2=0b000000010=2;

const sp=3;
(sp&s1)==s1

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
]

function binary_search(List, Index, Column){
    var First = 0;
    var Last = List.length-1;
    while(First <= Last){
        var Middle = Math.floor((First+Last)/2);
        if(List[Middle][Column] < Index){
            Last = Middle + 1;
        }
        else if(List[Middle][Column] > Index){
            Last = Middle - 1;
        }
        else{
            return List[Middle];
        }
    }
    return false;
}

let products_keys = ["id", "idType", "idArmoir", "DatePeremption"];
let type_product_keys = ["idType", "Nom", "ImageP", "LienFicheDeSecurite", "Pictogramme"];
let armoir_keys = ["idArmoir", "NomArmoire", "Localisation", "Image"];

const get_products = () => fetch(URL_FOR_PRODUCTS)
    .then(res => res.json())
    .then(json => refreshTable(json));

const constructTableProduct = tab => {
    table.innerHTML = "";
    for(let item of tab)
    {
        let row = document.createElement("tr");
        row.id = "?-" + item.id;
        row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.idType}</td>
        <td>${item.idArmoir}</td>
        <td>${item.DatePeremption}</td>
        `;
        table.appendChild(row); 
    }
};

const constructTableArmoir = tab => {
    table.innerHTML = "";
    for(let item of tab)
    {
        let row = document.createElement("tr");
        row.id = "?-" + item.id;
        row.innerHTML = `
        <td>${item.idArmoire}</td>
        <td>${item.NomArmoire}</td>
        <td>${item.Localisation}</td>
        <td>${item.Image}</td>
        `;
        table.appendChild(row); 
    }
};

form_for_products.addEventListener("submit", event => {
    let rawdata = new FormData(form);
    let data = {};
    rawdata.forEach((value, key) => {
        if(value.match(user_checker[key]) == null){
            document.getElementById("error").innerHTML = "Vérifiez les informations";
            event.preventDefault();
            return;
        }
        data[key] = value;
    });
    for(let input of document.querySelectorAll("form input:not([type='submit'])")){
        input.value = "";
    }
    event.preventDefault();
    return add_user(data);
});

form_for_armoire.addEventListener("submit", event => {
    let rawdata = new FormData(form);
    let data = {};
    rawdata.forEach((value, key) => {
        if(value.match(user_checker[key]) == null){
            document.getElementById("error").innerHTML = "Vérifiez les informations";
            event.preventDefault();
            return;
        }
        data[key] = value;
    });
    for(let input of document.querySelectorAll("form input:not([type='submit'])")){
        input.value = "";
    }
    event.preventDefault();
    return add_user(data);
});

const add_product = item => fetch(URL_FOR_PRODUCTS, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
}).then(get_products);

get_products();

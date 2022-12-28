let productTitle = document.querySelector(".title");

let productPrice = document.querySelector(".price");

let productTaxes = document.querySelector(".taxes");

let productAds = document.querySelector(".ads");

let productDiscount = document.querySelector(".discount");

let productTotal = document.querySelector(".total");

let productCount = document.querySelector(".count");

let productCatigory = document.querySelector(".catigory");

let productCreateButton = document.querySelector(".create-button");

let tbodyTable = document.querySelector(".container table tbody");

let formInputs =  document.querySelectorAll("form input:not(.create-button)");

let deletAllButton = document.querySelector("table caption");

let countOfProductsSpan = document.querySelector(".container table caption span.count-products");






//function total
productPrice.onkeyup = function () {
    productTotal.value = `Total:${+productPrice.value}`
}
productTaxes.onkeyup = function () {
    productTotal.value = `Total:${+productPrice.value - +productTaxes.value}`
}
productAds.onkeyup = function () {
    productTotal.value = `Total:${+productPrice.value - +productTaxes.value - +productAds.value}`
}
productDiscount.onkeyup = function () {
    productTotal.value = `Total:${+productPrice.value - +productTaxes.value - +productAds.value - +productDiscount.value}`
}
//end function total


// function clear all inputs
function clearInputs () {
    formInputs.forEach(e => e.value = "");
    productTotal.value = "Total";
}
// end function clear all inputs


// function creat-button
let dataStore;
if (window.localStorage.getItem("product") != null) {
    dataStore = JSON.parse(window.localStorage.getItem("product"));
    countOfProductsSpan.textContent = `${dataStore.length}`
}else {
    dataStore = [];
}

productCreateButton.onclick = function () {
    if (productTitle.value != "" && productPrice.value != "") {
        for(let i=1; i <= +productCount.value; i++ ) {
            let objectData = {
                title: productTitle.value,
                price: productPrice.value, 
                taxes: productTaxes.value,
                ads: productAds.value,
                discount: productDiscount.value,
                total: productTotal.value,
                catigory: productCatigory.value,
            }
            dataStore.push(objectData);
        }
        clearInputs ()
        window.localStorage.setItem("product", JSON.stringify(dataStore));
    } 
    readData ()
    countOfProductsSpan.textContent = `${dataStore.length}`
}
// end function creat-button


//function read data
readData ();
function readData () {
    let table = "";
    for(let i = 0; i < dataStore.length; i++) {
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataStore[i].title}</td>
                <td>${dataStore[i].price}</td>
                <td>${dataStore[i].taxes}</td>
                <td>${dataStore[i].ads}</td>
                <td>${dataStore[i].discount}</td>
                <td>${dataStore[i].total}</td>
                <td>${dataStore[i].catigory}</td>
                <td class="update" onclick="updateProductData(${i})">Update</td>
                <td class="delete" onclick="deleteProductData(${i})">Delete</td>
            </tr>
        ` 
    }
    tbodyTable.innerHTML = table

    
}
//end function read data


// function delete product data
function deleteProductData(i) {
    dataStore.splice(i, 1);
    window.localStorage.product = JSON.stringify(dataStore);  
    readData ()
    countOfProductsSpan.textContent = `${dataStore.length}`;
}
// end function delete product data


// function update product data
function updateProductData(i) {
    productTitle.value = dataStore[i].title
    productPrice.value = dataStore[i].price
    productTaxes.value = dataStore[i].taxes
    productAds.value = dataStore[i].ads
    productDiscount.value = dataStore[i].discount
    productTotal.value = dataStore[i].total
    productCatigory.value = dataStore[i].catigory
    productCreateButton.value = "Update";

    productCreateButton.onclick = function() {
        dataStore[i].title = productTitle.value
        dataStore[i].price = productPrice.value
        dataStore[i].taxes = productTaxes.value
        dataStore[i].ads = productAds.value
        dataStore[i].discount = productDiscount.value
        dataStore[i].total = productTotal.value
        dataStore[i].catigory = productCatigory.value

        dataStore.splice(i, 1, dataStore[i]);
        window.localStorage.product = JSON.stringify(dataStore);
        readData()
        countOfProductsSpan.textContent = `${dataStore.length}`
        productCreateButton.value = "Create";
        clearInputs ();
    }
    window.scroll({
        top: 0, 
        behavior: "smooth",
    })
}
// end function update product data


//function delete all
deletAllButton.onclick = function() {
    if (window.localStorage.product != null) {
        let warningOfDeleteAll = document.createElement("div");
        warningOfDeleteAll.className = "warning";

        let warningContainer = document.createElement("div");
        warningContainer.className = "warning-container"
        warningOfDeleteAll.appendChild(warningContainer);

        let warningHeader = document.createElement("h2");
        warningHeader.textContent = "WARNING";
        warningContainer.appendChild(warningHeader);

        let warningP = document.createElement("p");
        warningP.innerHTML = "Program Will Delete All Data..<br>Do You Want Continue???";
        warningContainer.appendChild(warningP);

        let warningContinueButton = document.createElement("button")
        warningContinueButton.className = "continue-button";
        warningContinueButton.textContent = "Continue";
        warningContainer.appendChild(warningContinueButton);

        let warningCansleButton = document.createElement("button")
        warningCansleButton.className = "cansle-button";
        warningCansleButton.textContent = "Cansle";
        warningContainer.appendChild(warningCansleButton);

        document.body.prepend(warningOfDeleteAll);

        warningContinueButton.onclick = function () {
            window.localStorage.clear();
            dataStore = [];
            readData ();
            countOfProductsSpan.textContent = `${dataStore.length}`;
            warningOfDeleteAll.remove();
        }
        warningCansleButton.onclick = function () {
            warningOfDeleteAll.remove();
        }
    }
    
}
//end function delete all



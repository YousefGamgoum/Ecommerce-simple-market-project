let UserName = document.getElementById("UserName");
const user = JSON.parse(sessionStorage.getItem("user"));
UserName.innerText = `Hello, ${user.name}`;

let logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click",()=>{
    sessionStorage.clear();
})

function addToCart(product) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.ID === product.ID);
    let quantaty = document.getElementById("quantaty");
    if (existingItem) {
        existingItem.quantity += 1; 
        quantaty.innerText = `${existingItem.quantity}`;
    } else {
        cart.push({ ...product, quantity: 1 });
        quantaty.innerText = "1";
    }
    sessionStorage.setItem("cart", JSON.stringify(cart)); 
    
    showMessage();
}
function showMessage() {
    let message = document.getElementById("successMessage");
    message.style.display = "block";
    message.style.opacity = 1;

    setTimeout(() => {
        message.style.opacity = 0; 
        setTimeout(() => {
            message.style.display = "none";
        }, 500); 
    }, 3000);
}
let productViewDetails = document.getElementById("productViewDetails");
window.onload = function () {
    const product = JSON.parse(sessionStorage.getItem("product"));
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.ID === product.ID);
    let quant;
    if(existingItem){
        quant = existingItem.quantity;
    } else{quant=0;}
    let productContainer = document.createElement("div");
    productContainer.classList.add("container","text-center");
    productContainer.setAttribute("id","productView");
    console.log(productContainer);
    productContainer.innerHTML = `<div class="text-start">
            <button class="btn btn-lg btn-danger" id="back"><i class="bi bi-arrow-left-circle-fill me-3"></i>Back</button>
            <img src="${product.img}" alt="">
        </div>
        <div class=" container text-start" id="details">
            <div class="detailsAlign"><p class="h2 text-danger">Name: </p><span class="h2 text-dark">${product.name}</span></div>
            <div class="detailsAlign"><p class="h2 text-danger">Price: </p><span class="h2 text-dark">${product.price}$</span></div>
            <div class="detailsAlign"><p class="h2 text-danger">Quantaty in cart: </p><span class="h2 text-dark" id="quantaty">${quant}</span></div>
            <div class="detailsAlign"><p class="h2 text-danger">Category: </p><span class="h2 text-dark">${product.category}</span></div>
            <button class="btn btn-lg btn-success " id="AddToCart" >ADD to cart</button>
        </div>`
        productViewDetails.appendChild(productContainer);
            let AddToCart = document.getElementById("AddToCart");
            AddToCart.addEventListener("click", (e) => {
                e.preventDefault();
                addToCart(product);
                
            });
            let back = document.getElementById("back");
            back.addEventListener("click",()=>{
                window.location.href = "Home.html";
            })
}








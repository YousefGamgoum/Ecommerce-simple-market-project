let UserName = document.getElementById("UserName");
const user = JSON.parse(sessionStorage.getItem("user"));
UserName.innerText = `Hello, ${user.name}`;
let CartProducts = document.getElementById("CartProducts");
let nothing = document.getElementById("nothing");
let total = document.getElementById("total");
let totalAmount = document.getElementById("totalAmount");
let goback = document.getElementById("goback");
let BuyNow = document.getElementById("BuyNow");
window.onload = function () {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    if(cart.length > 0 && cart){
        total.style.display = "flex";
        cart.forEach((value) => {
            let item = document.createElement("div");
            item.classList.add("productInCard","container");
            let VID = value.ID;
            item.setAttribute("id",`D${VID}`);
            item.innerHTML = `<div class="productInCardData">
                            <img src="${value.img}" alt="">
                            <p>${value.name}</p>
                        <p>${value.price}$</p>
                    </div>
                    <div class="productInCardBtns">
                        <button class="btn btnOnCart minusBtn removeFromCart" data-id="${value.ID}"><i class="bi bi-dash"></i></button>
                        <p id="Q${value.ID}">${value.quantity}</p>
                        <button class="btn btnOnCart plusBtn AddToCart" data-id="${value.ID}"><i class="bi bi-plus"></i></button>
                    </div>`;
                   
                    
                    CartProducts.appendChild(item);
        });
        let Amount = cart.map((value)=> {
            let AmountQuan = parseInt(value.price)*value.quantity;
            return AmountQuan;
        } );
        let TAmount = Amount.reduce((total,value,index,arr)=>total+=value,0);
        totalAmount.innerText = `total amount: ${TAmount}$`;
        document.querySelectorAll(".AddToCart").forEach(button => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                const productId = parseInt(e.target.closest("button").dataset.id);
                addToCart(productId);
            });
        });
        document.querySelectorAll(".removeFromCart").forEach(button => {
            button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = parseInt(e.target.closest("button").dataset.id);
            removeFromCart(productId);
        });
    });
    } else {
        nothing.style.display = "block";
    }
}

function addToCart(productId) {
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    let quantity = document.getElementById(`Q${productId}`);
    let Item = cart.find(item => item.ID === productId);
    console.log(Item);
    Item.quantity += 1;
    quantity.innerText = Item.quantity;
    let Amount = cart.map((value)=> {
        let AmountQuan = parseInt(value.price)*value.quantity;
        return AmountQuan;
    } );
    let TAmount = Amount.reduce((total,value,index,arr)=>total+=value,0);
    totalAmount.innerText = `total amount: ${TAmount}$`;
    sessionStorage.setItem("cart", JSON.stringify(cart));
}
function removeFromCart(productId) {
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    let quantity = document.getElementById(`Q${productId}`);
    let Item = cart.find(item => item.ID === productId);
    console.log(Item);
    Item.quantity --;
    if(Item.quantity > 0 ){
        quantity.innerText = Item.quantity;
        let Amount = cart.map((value)=> {
            let AmountQuan = parseInt(value.price)*value.quantity;
            return AmountQuan;
        } );
        let TAmount = Amount.reduce((total,value,index,arr)=>total+=value,0);
        totalAmount.innerText = `total amount: ${TAmount}$`;
    }
    else{
        let D = document.getElementById(`D${productId}`);
        D.remove();
        cart = cart.filter(item => item.ID !== productId);
        if(cart.length == 0 ){nothing.style.display = "block";total.style.display = "none";}
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
}


goback.addEventListener("click",()=>{window.location.href = "Home.html";})

BuyNow.addEventListener("click",(e)=>{
    window.location.href = "Shipped.html";
    sessionStorage.removeItem("cart");
})

let goTop = document.getElementById("goTop");

  window.onscroll = function () {
    if (document.documentElement.scrollTop > 200) {
        goTop.style.display = "block";
    } else {
        goTop.style.display = "none";
    }
  };
  goTop.addEventListener("click",()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  })
  
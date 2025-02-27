let UserName = document.getElementById("UserName");
const user = JSON.parse(sessionStorage.getItem("user"));
UserName.innerText = `Hello, ${user.name}`;

let logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click",()=>{
    sessionStorage.clear();
})

let myImages = [
    "./assets/1.jpg",
    "./assets/2.jpg",
    "./assets/3.jpg",
    "./assets/4.jpg",
  ];
let SliderImg = document.getElementById("SliderImg");

let imgIndex = 0;
function slideLeft() {
    imgIndex++;
  if (imgIndex >= myImages.length) {
    imgIndex = 0;
  }
  SliderImg.setAttribute("src", myImages[imgIndex]);
}
function slideRight() {
    imgIndex--;
  if (imgIndex < 0) {
    imgIndex = (myImages.length)-1;
  }
  SliderImg.setAttribute("src", myImages[imgIndex]);
}
function autoSlide() {
    imgIndex++;
    if (imgIndex >= myImages.length) {
        imgIndex = 0;
    }
    SliderImg.setAttribute("src", myImages[imgIndex]);
}
let intervalImg = setInterval(autoSlide, 3000);
document.querySelector('.slider-container').addEventListener('mouseenter', () => {
    clearInterval(intervalImg);
});

document.querySelector('.slider-container').addEventListener('mouseleave', () => {
    intervalImg = setInterval(autoSlide, 3000);
});


let allBtn = document.getElementById("all");
let clothesBtn = document.getElementById("clothes");
let makeupBtn = document.getElementById("makeup");
let phonesBtn = document.getElementById("phones");
let products = document.getElementById("products");
let productsArr = [{ ID:1, name: "Denim Jacket", price: 50, category: "Clothes", img:"./assets/products/Denim Jacket.jpg"},
    { ID:2, name: "Running Shoes", price: 80, category: "Clothes", img:"./assets/products/Running Shoes.jpg"},
    { ID:3, name: "Hoodie Sweatshirt", price: 40, category: "Clothes", img:"./assets/products/Hoodie Sweatshirt.jpg"},
    { ID:4, name: "Jeans", price: 60, category: "Clothes", img:"./assets/products/Jeans.jpg"},
    { ID:5, name: "Matte Lipstick", price: 16, category: "Makeup", img:"./assets/products/Matte Lipstick.jpg"},
    { ID:6, name: "Foundation", price: 25, category: "Makeup", img:"./assets/products/Foundation.jpg"},
    { ID:7, name: "Mascara", price: 13, category: "Makeup", img:"./assets/products/Mascara.jpg"},
    { ID:8, name: "Eyeshadow Palette", price: 30, category: "Makeup", img:"./assets/products/Eyeshadow Palette.jpg"},
    { ID:9, name: "iPhone 14", price: 1000, category: "Phones", img:"./assets/products/iPhone 14.jpg"},
    { ID:10, name: "Samsung Galaxy S23", price: 900, category: "Phones", img:"./assets/products/Samsung Galaxy S23.jpg"},
    { ID:11, name: "Google Pixel 7", price: 800, category: "Phones", img:"./assets/products/Google Pixel 7.jpg"},
    { ID:12, name: "OnePlus 11", price: 730, category: "Phones", img:"./assets/products/OnePlus 11.jpg"}];

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

    function addToCart(product) {
        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        const existingItem = cart.find(item => item.ID === product.ID);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        sessionStorage.setItem("cart", JSON.stringify(cart));
        showMessage();
    }
    function viewDeatils(product){
        window.sessionStorage.setItem("product",JSON.stringify(product));
        window.location.href = "productView.html";
    }
    
window.onload = function () {
    allBtn.style.backgroundColor = "rgb(219, 68, 68)";
    allBtn.style.color = "white";
    productsArr.forEach((value,index,arr)=>{
        let cards = document.createElement("div");
        cards.classList.add("col-lg-4","col-md-6","col-sm-12");
        cards.innerHTML = `
                  <div class="card m-0 p-0 mt-5" id="productCard" style="width: 18rem;">
                    <img src="${value.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h2 class="card-title ">${value.name}</h2>
                      <p class="card-text fw-bolder h5 mt-4">Price: ${value.price}$</p>
                      <div class="mt-4 container-fluid" id="cardBtns">
                        <a href="#" class="btn viewDetails" data-id="${value.ID}"><i class="bi bi-eye-fill" id="eye"></i></a>
                        <a href="#" class="btn btn-success AddToCart" data-id="${value.ID}"><i class="bi bi-plus-lg " id="plus"></i></a>
                      </div>
                    </div>
                  </div>`;
                  
                products.appendChild(cards);
    })
    document.querySelectorAll(".AddToCart").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = parseInt(e.target.closest("a").dataset.id);
            const selectedProduct = productsArr.find(product => product.ID === productId);
            if (selectedProduct) {
                addToCart(selectedProduct);
            }
        });
    });
    document.querySelectorAll(".viewDetails").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = parseInt(e.target.closest("a").dataset.id);
            const selectedProduct = productsArr.find(product => product.ID === productId);
            if (selectedProduct) {
                viewDeatils(selectedProduct);
            }
        });
    });
};
allBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    products.innerHTML="";
    allBtn.style.backgroundColor = "rgb(219, 68, 68)";
    allBtn.style.color = "white";
    clothesBtn.style.backgroundColor = "white";
    clothesBtn.style.color = "black";
    makeupBtn.style.backgroundColor = "white";
    makeupBtn.style.color = "black";  
    phonesBtn.style.backgroundColor = "white";
    phonesBtn.style.color = "black";  
    productsArr.forEach((value,index,arr)=>{
        console.log(value.name);
        console.log(value.img);
        let cards = document.createElement("div");
        cards.classList.add("col-lg-4","col-md-6","col-sm-12");
        cards.innerHTML = `
                  <div class="card m-0 p-0 mt-5" id="productCard" style="width: 18rem;">
                    <img src="${value.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h2 class="card-title ">${value.name}</h2>
                      <p class="card-text fw-bolder h5 mt-4">Price: ${value.price}$</p>
                      <div class="mt-4 container-fluid" id="cardBtns">
                        <a href="#" class="btn viewDetails" data-id="${value.ID}"><i class="bi bi-eye-fill" id="eye"></i></a>
                        <a href="#" class="btn btn-success AddToCart" data-id="${value.ID}"><i class="bi bi-plus-lg " id="plus"></i></a>
                      </div>
                    </div>
                  </div>`;
                
                products.appendChild(cards);
    })
    document.querySelectorAll(".AddToCart").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = parseInt(e.target.closest("a").dataset.id);
            const selectedProduct = productsArr.find(product => product.ID === productId);
            addToCart(selectedProduct);
        });
    });
    document.querySelectorAll(".viewDetails").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = parseInt(e.target.closest("a").dataset.id);
            const selectedProduct = productsArr.find(product => product.ID === productId);
            if (selectedProduct) {
                viewDeatils(selectedProduct);
            }
        });
    });
})
clothesBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    products.innerHTML="";
    clothesBtn.style.backgroundColor = "rgb(219, 68, 68)";
    clothesBtn.style.color = "white";
    allBtn.style.backgroundColor = "white";
    allBtn.style.color = "black";
    makeupBtn.style.backgroundColor = "white";
    makeupBtn.style.color = "black";  
    phonesBtn.style.backgroundColor = "white";
    phonesBtn.style.color = "black";  
    const clothesProducts = productsArr.filter(product => product.category === "Clothes");
    clothesProducts.forEach((value,index,arr)=>{
        console.log(value.name);
        console.log(value.img);
        let cards = document.createElement("div");
        cards.classList.add("col-lg-4","col-md-6","col-sm-12");
        cards.innerHTML = `
                  <div class="card m-0 p-0 mt-5" id="productCard" style="width: 18rem;">
                    <img src="${value.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h2 class="card-title ">${value.name}</h2>
                      <p class="card-text fw-bolder h5 mt-4">Price: ${value.price}$</p>
                      <div class="mt-4 container-fluid" id="cardBtns">
                        <a href="#" class="btn viewDetails" data-id="${value.ID}"><i class="bi bi-eye-fill" id="eye"></i></a>
                        <a href="#" class="btn btn-success AddToCart" data-id="${value.ID}"><i class="bi bi-plus-lg " id="plus"></i></a>
                      </div>
                    </div>
                  </div>`;
                  
                products.appendChild(cards);
    })
    document.querySelectorAll(".AddToCart").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = parseInt(e.target.closest("a").dataset.id);
            const selectedProduct = productsArr.find(product => product.ID === productId);
            addToCart(selectedProduct);
        });
    });
    document.querySelectorAll(".viewDetails").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = parseInt(e.target.closest("a").dataset.id);
            const selectedProduct = productsArr.find(product => product.ID === productId);
            if (selectedProduct) {
                viewDeatils(selectedProduct);
            }
        });
    });
})
phonesBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    products.innerHTML="";
    phonesBtn.style.backgroundColor = "rgb(219, 68, 68)";
    phonesBtn.style.color = "white";
    allBtn.style.backgroundColor = "white";
    allBtn.style.color = "black";
    clothesBtn.style.backgroundColor = "white";
    clothesBtn.style.color = "black";  
    makeupBtn.style.backgroundColor = "white";
    makeupBtn.style.color = "black";  
    const PhonesProducts = productsArr.filter(product => product.category === "Phones");
    PhonesProducts.forEach((value,index,arr)=>{
        console.log(value.name);
        console.log(value.img);
        let cards = document.createElement("div");
        cards.classList.add("col-lg-4","col-md-6","col-sm-12");
        cards.innerHTML = `
                  <div class="card m-0 p-0 mt-5" id="productCard" style="width: 18rem;">
                    <img src="${value.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h2 class="card-title ">${value.name}</h2>
                      <p class="card-text fw-bolder h5 mt-4">Price: ${value.price}$</p>
                      <div class="mt-4 container-fluid" id="cardBtns">
                        <a href="#" class="btn viewDetails" data-id="${value.ID}"><i class="bi bi-eye-fill" id="eye"></i></a>
                        <a href="#" class="btn btn-success AddToCart" data-id="${value.ID}"><i class="bi bi-plus-lg " id="plus"></i></a>
                      </div>
                    </div>
                  </div>`;
                  
                products.appendChild(cards);
    })
    document.querySelectorAll(".AddToCart").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = parseInt(e.target.closest("a").dataset.id);
            const selectedProduct = productsArr.find(product => product.ID === productId);
            addToCart(selectedProduct);
        });
    });
    document.querySelectorAll(".viewDetails").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = parseInt(e.target.closest("a").dataset.id);
            const selectedProduct = productsArr.find(product => product.ID === productId);
            if (selectedProduct) {
                viewDeatils(selectedProduct);
            }
        });
    });
})

makeupBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    products.innerHTML="";
    makeupBtn.style.backgroundColor = "rgb(219, 68, 68)";
    makeupBtn.style.color = "white";
    allBtn.style.backgroundColor = "white";
    allBtn.style.color = "black";
    clothesBtn.style.backgroundColor = "white";
    clothesBtn.style.color = "black";  
    phonesBtn.style.backgroundColor = "white";
    phonesBtn.style.color = "black";  
    const MakeupProducts = productsArr.filter(product => product.category === "Makeup");
    MakeupProducts.forEach((value,index,arr)=>{
        console.log(value.name);
        console.log(value.img);
        let cards = document.createElement("div");
        cards.classList.add("col-lg-4","col-md-6","col-sm-12");
        cards.innerHTML = `
                  <div class="card m-0 p-0 mt-5" id="productCard" style="width: 18rem;">
                    <img src="${value.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h2 class="card-title ">${value.name}</h2>
                      <p class="card-text fw-bolder h5 mt-4">Price: ${value.price}$</p>
                      <div class="mt-4 container-fluid" id="cardBtns">
                        <a href="#" class="btn viewDetails" data-id="${value.ID}"><i class="bi bi-eye-fill" id="eye"></i></a>
                        <a href="#" class="btn btn-success AddToCart" data-id="${value.ID}"><i class="bi bi-plus-lg " id="plus"></i></a>
                      </div>
                    </div>
                  </div>`;
                  
                products.appendChild(cards);
    })
    document.querySelectorAll(".AddToCart").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = parseInt(e.target.closest("a").dataset.id);
            const selectedProduct = productsArr.find(product => product.ID === productId);
            addToCart(selectedProduct);
        });
    });
    document.querySelectorAll(".viewDetails").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = parseInt(e.target.closest("a").dataset.id);
            const selectedProduct = productsArr.find(product => product.ID === productId);
            if (selectedProduct) {
                viewDeatils(selectedProduct);
            }
        });
    });
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
  
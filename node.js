const products=[
    {
        id:1,
        name:"Shoes",
        price:3999,
        category:"Fashion",
        image:"image copy 4.png"

        
    },
    {
          id: 2,
        name: "Headphones",
        price: 3499,
        category: "Electronics",
        image: "image.png"

    },
    {
        id: 3,
        name: "Laptop",
        price: 54999,
        category: "Electronics",
        image: "image copy.png"

    },
    {
        id: 4,
        name: "Backpack",
        price: 1899,
        category: "Accessories",
        image: "image copy 6.png",
        quantity:1

    },
     {
        id: 9,
        name: "Water bottle",
        price: 599,
        category: "Accessories",
        image: "image copy 9.png",
        quantity:1

    },
     {
        id:6,
        name:"Shirt",
        price:1799,
        category:"Fashion",
        image:"image copy 5.png"

        
    },
     {
        id:7,
        name:"pants",
        price:2799,
        category:"Fashion",
        image:"image copy 7.png"

        
    },
      {
          id: 8,
        name: "RO purifier",
        price: 34999,
        category: "Electronics",
        image: "image copy 8.png"

    },

    {
        id: 5,
        name: "Watch",
        price: 1999,
        category: "Accessories",
        image: "image copy 3.png"
    }

]


const productContainer=document.getElementById("productContainer");
const cartContainer=document.getElementById("cartContainer");
const searchInput=document.getElementById("search");
const categorySelect=document.getElementById("category");
const total =document.getElementById("total");
const clearCart=document.getElementById("clearCart");
const body=document.querySelector(".body")
const logo="logo.jpeg";
let cart = JSON.parse(localStorage.getItem("cart"))||[];

function displayProducts(productsList){

productContainer.innerHTML=""
productsList.forEach(product => {
    productContainer.innerHTML+=`
    <div class="product-card">
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.category}</p>
    <h4>${"₹"+product.price}</h4>
    <button onclick=addToCart(${product.id})>Add to Cart</button>
    </div>
    `
    
});

}

function addToCart(id){

const product=products.find(item=>item.id===id);
const existingProduct=cart.find(item=>item.id===id);

if(existingProduct){
    existingProduct.quantity++;
}else{
    cart.push({
        ...product,
        quantity: 1
    });
}
localStorage.setItem("cart",JSON.stringify(cart));
renderCart()

}

searchInput.addEventListener("input",filterProducts);
categorySelect.addEventListener("change",filterProducts)

function filterProducts(){
    const searchText=searchInput.value.toLowerCase();
    const selectedCategory=categorySelect.value;
    const filtered=products.filter(product=>{
        const matchesSearch=product.name.toLowerCase().includes(searchText);
        const matchCategory=selectedCategory==="All"||product.category===selectedCategory;

        return matchesSearch && matchCategory

    });

    displayProducts(filtered);



}

displayProducts(products)
renderCart()


function renderCart(){
cartContainer.innerHTML="";
if(cart.length===0){
    cartContainer.innerHTML="  <p id='noitemtxt'>No items in cart!</p>   ";
    total.textContent=0
    return;
}

let grandTotal=0;
cart.forEach(item=>{
grandTotal+=item.price*item.quantity;
cartContainer.innerHTML+=
`<div class="cart-value">
<img src="${item.image}" alt="${item.name}">
<div class="cart-info">
<h4>${item.name}</h4>
<p>${item.price}</p>
<div class="quantity">
<button onclick="decreaseQuantity(${item.id})">-</button>
<span>${item.quantity}</span>
<button onclick="increaseQuantity(${item.id})">+</button>

</div>


</div>

<button class="remove-btn" onclick="removeItem(${item.id})">
Remove
</button>
</div>
`
})

total.textContent=grandTotal;
localStorage.setItem("cart",JSON.stringify(cart));

}

function increaseQuantity(id){
    const product=cart.find(item=>item.id===id);
    if(product){
        product.quantity++
        renderCart()
    }
}

function decreaseQuantity(id){
    const product=cart.find(item=>item.id===id);
    if(!product) return;
    if(product.quantity>1){
        product.quantity--
        renderCart()
    }
    else{
        cart = cart.filter(item=>item.id!==id)
    }
    renderCart()
}
function removeItem(id){
    cart = cart.filter(item=>item.id!==id)
    renderCart()
}

clearCart.addEventListener("click",()=>{
cart=[];
renderCart()
})

function zoom(){
    const div=document.createElement("div")
    div.classList.add("imageExpand")
    const img=document.createElement("img")
    const deleteBtn=document.createElement("button")
    deleteBtn.textContent="X"
    deleteBtn.classList.add("delBtn")
    img.src=logo

    document.body.appendChild(div)
    div.appendChild(img)
    div.appendChild(deleteBtn)
    deleteBtn.addEventListener("click",()=>{
        document.body.removeChild(div)
    })


}
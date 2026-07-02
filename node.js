
const container=document.getElementById("container");
const productContainer=document.getElementById("container");
document.getElementById("btn").addEventListener("click",()=>{


    const userData = {
    
    name:document.getElementById("name").value,
    email:document.getElementById("email").value,
    phone:document.getElementById("phone").value,
    password:document.getElementById("password").value,
    dob:document.getElementById("dob").value
    
    
}
localStorage.setItem("userData",JSON.stringify(userData));


})




function display(){
    let myform = JSON.parse(localStorage.getItem("userData"))

    container.innerHTML=`
    <div class="product-card">
  
    <h3 class="styl">name:${myform.name}</h3>
    <h3 class="styl">email: ${myform.email}</h3>
    <h4 class="styl">phone:${myform.phone}</h4>
    <h4 class="styl">password:${myform.password}</h4>
    <h4 class="styl">dob:${myform.dob}</h4>
    </div>
    `
    
};


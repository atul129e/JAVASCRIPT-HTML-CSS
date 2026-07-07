
const img = document.getElementById('user-img');
const userNmae =document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const btn = document.getElementById('fetch-btn');
const userPhone = document.getElementById('user-phone');
const userAge = document.getElementById('user-age');
const loc = document.getElementById('user-loc');

async function  getRandomUser(){

 const response = await fetch("https://randomuser.me/api/")
const data = await response.json();

const user = data.results[0]
img.src=user.picture.large;
userNmae.textContent=user.name.first
userEmail.textContent=user.email
userPhone.textContent=user.phone
loc.textContent = user.location.city+ ","+ user.location.country
userAge.textContent=user.dob.age


}
btn.addEventListener('click',getRandomUser)


getRandomUser()
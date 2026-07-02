const container = document.getElementById("container");

document.getElementById("myForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: document.getElementById("password").value,
        dob: document.getElementById("dob").value
    };

    // Local Storage
    localStorage.setItem("userData", JSON.stringify(userData));

    try {

        await fetch("https://script.google.com/macros/s/AKfycbxtZvsHBIobZdbRB024sKC4I5etCfQUJL85YO9Iro7VoOGBXuzu9ygm4L0Ue6G6C4Ms/exec", {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(userData)

        });

        alert("Form Submitted Successfully ✅");

        document.getElementById("myForm").reset();

    } catch (error) {

        console.error(error);

        alert("Something went wrong ❌");

    }

});

function display() {

    const myform = JSON.parse(localStorage.getItem("userData"));

    if (!myform) {
        alert("No Data Found");
        return;
    }

    container.innerHTML = `
        <div class="product-card">
            <h3 class="styl">Name : ${myform.name}</h3>
            <h3 class="styl">Email : ${myform.email}</h3>
            <h3 class="styl">Phone : ${myform.phone}</h3>
            <h3 class="styl">Password : ${myform.password}</h3>
            <h3 class="styl">DOB : ${myform.dob}</h3>
        </div>
    `;
}
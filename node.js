const container = document.getElementById("container");

// Form Submit
document.getElementById("btn").addEventListener("click", async (e) => {

    e.preventDefault();

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: document.getElementById("password").value,
        dob: document.getElementById("dob").value
    };

    // Local Storage me Save
    localStorage.setItem("userData", JSON.stringify(userData));

    // Google Sheet me Save
    try {

        const response = await fetch("https://script.google.com/macros/s/AKfycbwZPt-ubU79CjciQ8CqlCouz_BFha61Z48GdcnXTb89zqebUXSTpiWwZ8EOY1PD8qm6/exec", {

            method: "POST",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(userData)

        });

        if (response.ok) {
            alert("Form Submitted Successfully ✅");
        } else {
            alert("Data could not be saved.");
        }

        document.getElementById("myForm").reset();

    } catch (error) {

        console.log(error);
        alert("Something went wrong!");

    }

});

// Show Data
function display() {

    const myform = JSON.parse(localStorage.getItem("userData"));

    if (!myform) {
        alert("No Data Found!");
        return;
    }

    container.innerHTML = `
        <div class="product-card">
            <h3 class="styl">Name: ${myform.name}</h3>
            <h3 class="styl">Email: ${myform.email}</h3>
            <h4 class="styl">Phone: ${myform.phone}</h4>
            <h4 class="styl">Password: ${myform.password}</h4>
            <h4 class="styl">DOB: ${myform.dob}</h4>
        </div>
    `;

}
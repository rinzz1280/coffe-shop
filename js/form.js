
// =====================================
// REGISTER
// =====================================

const registerForm = document.getElementById("formRegister");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const fullName = document.getElementById("full_name").value.trim();
        const gender = document.getElementById("gender").value;
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check email
        const emailExists = users.some(function (user) {
            return user.email === email;
        });

        if (emailExists) {
            alert("This email is already registered!");
            return;
        }

        // Create user
        const newUser = {
            fullName: fullName,
            gender: gender,
            email: email,
            password: password
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Register successful!");

        // Go to login
        window.location.href = "login.html";
    });
}



// =====================================
// LOGIN
// =====================================

function login(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(function (user) {

        return user.email === email &&
               user.password === password;

    });


    if (user) {

        // Save logged-in user
        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        alert("Login successful!");

        // Login success → Menu
        window.location.href = "menu.html";

    } else {

        alert("Email or Password is incorrect!");

    }
}



// =====================================
// CHECK LOGIN
// =====================================

function checkLogin() {

    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {

        alert("Please Login first!");

        window.location.href = "login.html";

    }
}



// =====================================
// LOGOUT
// =====================================

function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";
}


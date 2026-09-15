
// ================= REGISTER =================

const formRegister = document.getElementById("formRegister");

if (formRegister) {

    formRegister.addEventListener("submit", function (event) {

        event.preventDefault();

        const full_name =
            document.getElementById("full_name").value.trim();

        const gender =
            document.getElementById("gender").value;

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        // Check email already exists
        const existingUser =
            users.find(user => user.email === email);

        if (existingUser) {

            alert("Email already exists!");

            return;
        }

        const newUser = {

            full_name: full_name,

            gender: gender,

            email: email,

            password: password
        };

        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Register successfully!");

        window.location.href = "login.html";
    });
}


// ================= LOGIN =================

function login(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        user =>
            user.email === email &&
            user.password === password
    );

    if (!user) {

        alert("Email or Password is incorrect!");

        return;
    }

    // Save logged-in user
    localStorage.setItem(
        "auth_login",
        JSON.stringify(user)
    );

    alert("Login successfully!");

    window.location.href = "../pages/menu.html";
}


// ================= CHECK LOGIN =================

function checkLogin() {

    const auth_login =
        localStorage.getItem("auth_login");

    if (!auth_login) {

        alert("Please login first!");

        window.location.href = "login.html";

        return false;
    }

    return true;
}


// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("auth_login");

    alert("Logout successfully!");

    window.location.href = "login.html";
}


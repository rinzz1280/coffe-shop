
// ========================================
// DEFAULT PRODUCTS
// ========================================

// const defaultProducts = [
//     {
//         id: 1,
//         name: "Espresso",
//         category: "Coffee",
//         price: 3.50,
//         stock: 20,
//         image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
//         description: "Rich and bold espresso with a smooth crema."
//     },

//     {
//         id: 2,
//         name: "Cappuccino",
//         category: "Coffee",
//         price: 4.50,
//         stock: 15,
//         image: "https://images.unsplash.com/photo-1534778101976-62847782c213",
//         description: "Creamy espresso topped with silky milk foam."
//     },

//     {
//         id: 3,
//         name: "Caffe Latte",
//         category: "Coffee",
//         price: 4.75,
//         stock: 10,
//         image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d",
//         description: "Smooth espresso blended with steamed fresh milk."
//     },

//     {
//         id: 4,
//         name: "Americano",
//         category: "Coffee",
//         price: 3.75,
//         stock: 20,
//         image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
//         description: "Espresso combined with hot water for a clean taste."
//     },

//     {
//         id: 5,
//         name: "Chocolate Cake",
//         category: "Dessert",
//         price: 5.50,
//         stock: 8,
//         image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d",
//         description: "Soft chocolate cake with rich chocolate cream."
//     },

//     {
//         id: 6,
//         name: "Sweet Donut",
//         category: "Dessert",
//         price: 3.25,
//         stock: 12,
//         image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
//         description: "Freshly baked donut with a delicious sweet topping."
//     }
    
// ];

    // Check product already in cart
    let product = cart.find(function (item) {
        return item.name === name;
    });


// ========================================
// GET PRODUCT FROM LOCAL STORAGE
// ========================================

let products = JSON.parse(
    localStorage.getItem("pro")
);


// ========================================
// IF NO PRODUCT DATA
// CREATE DEFAULT DATA
// ========================================

if (!products || products.length === 0) {

    products = defaultProducts;

    localStorage.setItem(
        "pro",
        JSON.stringify(products)
    );
}


// ========================================
// DISPLAY PRODUCT
// ========================================

function displayProducts(data) {

    const container =
        document.getElementById("productContainer");

    if (!container) return;

    container.innerHTML = "";


    data.forEach(product => {

        const outOfStock =
            Number(product.stock) <= 0;


        container.innerHTML += `

            <div class="coffee-card">

                <div class="coffee-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    ${
                        product.category === "Coffee"
                        ? `<span class="popular">Popular</span>`
                        : ""
                    }

                </div>


                <div class="coffee-info">

                    <div class="coffee-name">

                        <h3>
                            ${product.name}
                        </h3>

                        <span>
                            $${Number(product.price).toFixed(2)}
                        </span>

                    </div>


                    <p>
                        ${product.description || ""}
                    </p>


                    <button
                        class="order-btn"
                        onclick="addToCart(${product.id})"
                        ${outOfStock ? "disabled" : ""}
                    >

                        <i class="fa-solid fa-cart-shopping"></i>

                        ${
                            outOfStock
                            ? "Out of Stock"
                            : "Order Now"
                        }

                    </button>

                </div>

            </div>

        `;
    });
}


// ========================================
// CATEGORY FILTER
// ========================================

const categoryButtons =
    document.querySelectorAll(".category");


categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active from all
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        // Add active
        this.classList.add("active");


        const category =
            this.innerText.trim();


        if (category === "All") {

            displayProducts(products);

        } else {

            const filtered =
                products.filter(product =>
                    product.category.toLowerCase() ===
                    category.toLowerCase()
                );

            displayProducts(filtered);
        }

    });

});


// ========================================
// ADD TO CART
// ========================================

function addToCart(productId) {

    // Get latest product data
    let products =
        JSON.parse(localStorage.getItem("pro")) || [];


    // Find product
    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) {

        alert("Product not found!");

        return;
    }


    // Check stock
    if (Number(product.stock) <= 0) {

        alert("This product is out of stock!");

        return;
    }


    // Get cart
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // Check existing item
    const existing =
        cart.find(
            item => item.productId === product.id
        );


    if (existing) {

        existing.qty += 1;

        existing.total =
            existing.qty * existing.price;

    } else {

        cart.push({

            productId: product.id,

            name: product.name,

            price: Number(product.price),

            qty: 1,

            total: Number(product.price)

        });
    }

    }

    // Save cart
    localStorage.setItem("cart", JSON.stringify(cart));


    // Go checkout
    window.location.href =
        "checkout.html";


// ========================================
// LOGIN MODAL
// ========================================

function openLogin() {

    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.classList.add("show");
    }

}


function closeLogin() {

    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.classList.remove("show");
    }

}


// ========================================
// CUSTOMER LOGIN
// ========================================

const menuLoginForm = document.getElementById("menuLoginForm");

if (menuLoginForm) {

    menuLoginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const email =
            document.getElementById("menuLoginEmail").value.trim();

        const password =
            document.getElementById("menuLoginPassword").value.trim();


        // Get users
        const users =
            JSON.parse(localStorage.getItem("user") || "[]");


        // Find customer
        const customer = users.find(function(user) {

            return (
                user.email === email &&
                user.password === password &&
                user.role === "user"
            );

        });


        // Wrong login
        if (!customer) {

            alert("Email or Password is incorrect!");

            return;
        }


        // Save current customer
        localStorage.setItem(
            "currentUser",
            JSON.stringify(customer)
        );


        alert("Login successful!");


        // Close popup
        closeLogin();

    });

}

// ========================================
// REGISTER MODAL
// ========================================

function openRegister() {

    closeLogin();

    const modal =
        document.getElementById("registerModal");

    if (modal) {
        modal.classList.add("show");
    }

}


function closeRegister() {

    const modal =
        document.getElementById("registerModal");

    if (modal) {
        modal.classList.remove("show");
    }

}


function backToLogin() {

    closeRegister();

    openLogin();

}


// ========================================
// CUSTOMER REGISTER
// ========================================

const menuRegisterForm =
    document.getElementById("menuRegisterForm");

if (menuRegisterForm) {

    menuRegisterForm.addEventListener("submit", function(e) {

        e.preventDefault();


        const firstName =
            document
                .getElementById("registerFirstName")
                .value
                .trim();

        const lastName =
            document
                .getElementById("registerLastName")
                .value
                .trim();

        const email =
            document
                .getElementById("registerEmail")
                .value
                .trim();

        const password =
            document
                .getElementById("registerPassword")
                .value
                .trim();


        // Get existing users
        const users =
            JSON.parse(
                localStorage.getItem("user") || "[]"
            );


        // Check email
        const existingUser =
            users.find(function(user) {

                return user.email === email;

            });


        if (existingUser) {

            alert("This email is already registered!");

            return;
        }


        // Create customer
        const newUser = {

            id: Date.now(),

            first_name: firstName,

            last_name: lastName,

            email: email,

            password: password,

            role: "user"

        };


        // Add user
        users.push(newUser);


        // Save
        localStorage.setItem(
            "user",
            JSON.stringify(users)
        );


        alert("Register successful!");


        // Clear form
        menuRegisterForm.reset();


        // Close register
        closeRegister();


        // Open login
        openLogin();

    });

}


// ========================================
// DISPLAY PRODUCTS WHEN PAGE LOADS
// ========================================


displayProducts(products);


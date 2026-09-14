
// ===============================
// GET ELEMENTS
// ===============================

const productTable = document.getElementById("productTable");
const searchInput = document.getElementById("searchProduct");
const productForm = document.getElementById("productForm");
const productModal = document.getElementById("productModal");


// ===============================
// GET PRODUCTS FROM LOCAL STORAGE
// ===============================

let products = JSON.parse(
    localStorage.getItem("products")
) || [];


// ===============================
// SHOW PRODUCTS
// ===============================

function showProducts(data = products) {

    productTable.innerHTML = "";

    if (data.length === 0) {

        productTable.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No products found
                </td>
            </tr>
        `;

        return;
    }


    data.forEach((product, index) => {

        let statusClass = "";

        if (product.stock === 0) {

            statusClass = "unavailable";

        } else if (product.stock <= 10) {

            statusClass = "low-stock";

        } else {

            statusClass = "available";
        }


        productTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>
                    ${product.name}
                </td>

                <td>
                    ${product.category}
                </td>

                <td>
                    $${Number(product.price).toFixed(2)}
                </td>

                <td>
                    ${product.stock}
                </td>

                <td>
                    <span class="status ${statusClass}">
                        ${product.stock === 0
                            ? "Out of Stock"
                            : product.stock <= 10
                                ? "Low Stock"
                                : "Available"}
                    </span>
                </td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editProduct(${product.id})">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${product.id})">

                        Delete

                    </button>

                </td>

            </tr>
        `;
    });
}


// ===============================
// SEARCH
// ===============================

function searchProduct() {

    const keyword =
        searchInput.value.toLowerCase().trim();


    const result = products.filter(product =>

        product.name
            .toLowerCase()
            .includes(keyword)

        ||

        product.category
            .toLowerCase()
            .includes(keyword)
    );


    showProducts(result);
}


// ===============================
// OPEN FORM
// ===============================

function openProductForm() {

    productForm.reset();

    document.getElementById("productId").value = "";

    document.getElementById("modalTitle").textContent =
        "Add Product";

    productModal.classList.add("show");
}


// ===============================
// CLOSE FORM
// ===============================

function closeProductForm() {

    productModal.classList.remove("show");
}


// ===============================
// ADD / EDIT PRODUCT
// ===============================

productForm.addEventListener("submit", function (e) {

    e.preventDefault();


    const id =
        document.getElementById("productId").value;

    const name =
        document.getElementById("productName").value.trim();

    const category =
        document.getElementById("productCategory").value;

    const price =
        Number(document.getElementById("productPrice").value);

    const stock =
        Number(document.getElementById("productStock").value);


    if (!name || !category) {

        alert("Please fill all fields.");

        return;
    }


    if (id) {

        // EDIT

        const product =
            products.find(item =>
                item.id == id
            );


        if (product) {

            product.name = name;
            product.category = category;
            product.price = price;
            product.stock = stock;
        }

    } else {

        // ADD

        products.push({

            id: Date.now(),

            name: name,

            category: category,

            price: price,

            stock: stock
        });
    }


    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );


    showProducts();

    closeProductForm();

});


// ===============================
// EDIT PRODUCT
// ===============================

function editProduct(id) {

    const product =
        products.find(item =>
            item.id == id
        );


    if (!product) return;


    document.getElementById("productId").value =
        product.id;

    document.getElementById("productName").value =
        product.name;

    document.getElementById("productCategory").value =
        product.category;

    document.getElementById("productPrice").value =
        product.price;

    document.getElementById("productStock").value =
        product.stock;


    document.getElementById("modalTitle").textContent =
        "Edit Product";


    productModal.classList.add("show");
}


// ===============================
// DELETE PRODUCT
// ===============================

function deleteProduct(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this product?");


    if (!confirmDelete) return;


    products =
        products.filter(product =>
            product.id != id
        );


    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );


    showProducts();
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href =
        "../auth/login.html";
}


// ===============================
// INITIAL LOAD
// ===============================

showProducts();


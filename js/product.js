
// =====================================
// GET ELEMENTS
// =====================================

const formProduct = document.getElementById("formProduct");
const productTable = document.getElementById("productTable");
const searchProduct = document.getElementById("searchProduct");

const productId = document.getElementById("productId");
const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productPrice = document.getElementById("productPrice");
const productStock = document.getElementById("productStock");
const productImage = document.getElementById("productImage");
const productDescription = document.getElementById("productDescription");


// =====================================
// GET SAME DATA FROM MENU
// =====================================

let products =
    JSON.parse(localStorage.getItem("pro")) || [];


// =====================================
// SAVE DATA
// =====================================

function saveProducts() {

    localStorage.setItem(
        "pro",
        JSON.stringify(products)
    );
}


// =====================================
// DISPLAY PRODUCTS
// =====================================

function getProduct() {

    const search =
        searchProduct
        ? searchProduct.value.toLowerCase().trim()
        : "";

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search)
    );

    productTable.innerHTML = "";


    filteredProducts.forEach((product, index) => {

        let status;
        let statusClass;


        if (Number(product.stock) <= 0) {

            status = "Out of Stock";
            statusClass = "out";

        } else if (Number(product.stock) <= 10) {

            status = "Low Stock";
            statusClass = "pending";

        } else {

            status = "Available";
            statusClass = "complete";
        }


        productTable.innerHTML += `

            <tr>

                <td>
                    ${index + 1}
                </td>


                <td>

                    <div class="product-info">

                        ${
                            product.image
                            ? `
                                <img
                                    src="${product.image}"
                                    alt="${product.name}"
                                >
                              `
                            : "☕"
                        }

                        <span>
                            ${product.name}
                        </span>

                    </div>

                </td>


                <td>
                    $${Number(product.price).toFixed(2)}
                </td>


                <td>
                    ${product.stock}
                </td>


                <td>

                    <span class="status ${statusClass}">
                        ${status}
                    </span>

                </td>


                <td>

                    <button
                        class="edit-btn"
                        onclick="editProduct(${product.id})"
                    >
                        <i class="fa-solid fa-pen"></i>
                        Edit
                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${product.id})"
                    >
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });


    if (filteredProducts.length === 0) {

        productTable.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="
                        text-align:center;
                        padding:30px;
                    "
                >
                    No products found.
                </td>

            </tr>

        `;
    }
}


// =====================================
// ADD / EDIT PRODUCT
// =====================================

if (formProduct) {

    formProduct.addEventListener("submit", function(e) {

        e.preventDefault();


        const id = productId.value;


        const productData = {

            id: id
                ? Number(id)
                : Date.now(),

            name:
                productName.value.trim(),

            category:
                productCategory.value,

            price:
                Number(productPrice.value),

            stock:
                Number(productStock.value),

            image:
                productImage.value.trim(),

            description:
                productDescription.value.trim()
        };


        // EDIT
        if (id) {

            const index =
                products.findIndex(
                    product =>
                        product.id === Number(id)
                );

            if (index !== -1) {

                products[index] =
                    productData;
            }

        }

        // ADD
        else {

            products.push(productData);
        }


        // Save same "pro" data
        saveProducts();


        // Refresh table
        getProduct();


        // Reset
        resetProductForm();


        closeProductForm();
    });
}


// =====================================
// EDIT
// =====================================

function editProduct(id) {

    const product =
        products.find(
            product => product.id === id
        );


    if (!product) {

        alert("Product not found!");

        return;
    }


    productId.value =
        product.id;

    productName.value =
        product.name;

    productCategory.value =
        product.category || "";

    productPrice.value =
        product.price;

    productStock.value =
        product.stock;

    productImage.value =
        product.image || "";

    productDescription.value =
        product.description || "";


    document.getElementById(
        "formTitle"
    ).innerText = "Edit Product";


    openProductForm();
}


// =====================================
// DELETE
// =====================================

function deleteProduct(id) {

    const product =
        products.find(
            product => product.id === id
        );


    if (!product) return;


    if (
        !confirm(
            `Delete "${product.name}"?`
        )
    ) {

        return;
    }


    products =
        products.filter(
            product => product.id !== id
        );


    saveProducts();

    getProduct();
}


// =====================================
// OPEN FORM
// =====================================

function openProductForm() {

    document.getElementById(
        "productForm"
    ).style.display = "block";
}


// =====================================
// CLOSE FORM
// =====================================

function closeProductForm() {

    document.getElementById(
        "productForm"
    ).style.display = "none";

    resetProductForm();
}


// =====================================
// RESET FORM
// =====================================

function resetProductForm() {

    if (formProduct) {

        formProduct.reset();
    }


    if (productId) {

        productId.value = "";
    }


    const formTitle =
        document.getElementById("formTitle");

    if (formTitle) {

        formTitle.innerText =
            "Add Product";
    }
}


// =====================================
// LOAD DATA
// =====================================

getProduct();


// ==========================================
// ADMIN DASHBOARD
// ==========================================

function loadDashboard() {

    // Products
    const products =
        JSON.parse(localStorage.getItem("pro")) || [];

    // Orders
    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    // Users
    const users =
        JSON.parse(localStorage.getItem("user")) || [];

    // Customers
    const customers =
        users.filter(user => user.role === "user");


    // ==========================================
    // TOTAL PRODUCTS
    // ==========================================

    document.getElementById("totalProducts").innerText =
        products.length;


    // ==========================================
    // TOTAL CUSTOMERS
    // ==========================================

    document.getElementById("totalCustomers").innerText =
        customers.length;


    // ==========================================
    // TOTAL ORDERS
    // ==========================================

    document.getElementById("totalOrders").innerText =
        orders.length;


    // ==========================================
    // TOTAL REVENUE
    // ==========================================

    const revenue =
        orders
            .filter(order => order.status !== "Cancelled")
            .reduce(
                (sum, order) =>
                    sum + Number(order.total || 0),
                0
            );

    document.getElementById("totalRevenue").innerText =
        "$" + revenue.toFixed(2);


    // ==========================================
    // RECENT ORDERS
    // ==========================================

    displayRecentOrders(orders);
}


// ==========================================
// DISPLAY RECENT ORDERS
// ==========================================

function displayRecentOrders(orders) {

    const recentOrders =
        document.getElementById("recentOrders");

    if (!recentOrders) return;

    recentOrders.innerHTML = "";


    if (orders.length === 0) {

        recentOrders.innerHTML = `
            <tr>
                <td colspan="4"
                    class="p-6 text-center text-gray-500">
                    No orders found.
                </td>
            </tr>
        `;

        return;
    }


    // Get latest 5 orders
    const latestOrders =
        [...orders]
            .reverse()
            .slice(0, 5);


    latestOrders.forEach(order => {

        const productNames =
            (order.items || [])
                .map(item => item.name)
                .join(", ");


        let statusClass =
            "bg-yellow-100 text-yellow-700";


        if (order.status === "Completed") {

            statusClass =
                "bg-green-100 text-green-700";
        }


        if (order.status === "Cancelled") {

            statusClass =
                "bg-red-100 text-red-700";
        }


        recentOrders.innerHTML += `

            <tr class="border-b hover:bg-gray-50">

                <td class="p-4">
                    ${order.customerName || "Unknown"}
                </td>

                <td class="p-4">
                    ${productNames || "No product"}
                </td>

                <td class="p-4">
                    $${Number(order.total || 0).toFixed(2)}
                </td>

                <td class="p-4">

                    <span
                        class="${statusClass} px-3 py-1 rounded-full text-sm">

                        ${order.status || "Pending"}

                    </span>

                </td>

            </tr>

        `;
    });
}


// ==========================================
// START DASHBOARD
// ==========================================

loadDashboard();
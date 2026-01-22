let cart = [];
let couponValue = 0;
let couponType = ""; // FLAT or PERCENT

// Add product
function addProduct(name, price, category) {
    let item = cart.find(p => p.name === name);
    if (item) item.qty++;
    else cart.push({ name, price, qty: 1, category });
    updateCart();
}

// Remove product
function removeProduct(name) {
    cart = cart.filter(p => p.name !== name);
    updateCart();
}

// Update quantity
function updateQty(name, qty) {
    let item = cart.find(p => p.name === name);
    if (item) {
        item.qty = parseInt(qty);
        if (item.qty <= 0) removeProduct(name);
    }
    updateCart();
}

// Apply coupon
function applyCoupon() {
    let code = document.getElementById("couponCode").value.trim().toUpperCase();

    if (code === "SAVE800") {
        couponValue = 800;
        couponType = "FLAT";
        document.getElementById("couponMsg").innerText = "Coupon applied: ₹800 OFF";
    } else if (code === "SAVE10") {
        couponValue = 10;
        couponType = "PERCENT";
        document.getElementById("couponMsg").innerText = "Coupon applied: 10% OFF";
    } else {
        couponValue = 0;
        couponType = "";
        document.getElementById("couponMsg").innerText = "Invalid coupon";
    }
    updateCart();
}

// Update cart
function updateCart() {
    let body = document.getElementById("cartBody");
    body.innerHTML = "";

    let subtotal = 0;
    let electronicsDiscount = 0;
    let bulkDiscount = 0;
    let couponDiscount = 0;

    cart.forEach(item => {
        let total = item.price * item.qty;
        subtotal += total;

        if (item.category === "electronics") {
            electronicsDiscount += total * 0.10;
        }

        if (item.qty >= 5) {
            bulkDiscount += total * 0.05;
        }

        body.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>
                    <input type="number" value="${item.qty}"
                    onchange="updateQty('${item.name}',this.value)">
                </td>
                <td>₹${total}</td>
                <td>
                    <button onclick="removeProduct('${item.name}')">Remove</button>
                </td>
            </tr>
        `;
    });

    if (couponType === "FLAT") {
        couponDiscount = couponValue;
    } else if (couponType === "PERCENT") {
        couponDiscount = subtotal * (couponValue / 100);
    }

    let grandTotal =
        subtotal -
        electronicsDiscount -
        bulkDiscount -
        couponDiscount;

    if (grandTotal < 0) grandTotal = 0;

    document.getElementById("subtotal").innerText = `₹${subtotal.toFixed(2)}`;
    document.getElementById("elecDiscount").innerText = `- ₹${electronicsDiscount.toFixed(2)}`;
    document.getElementById("bulkDiscount").innerText = `- ₹${bulkDiscount.toFixed(2)}`;
    document.getElementById("couponDiscount").innerText = `- ₹${couponDiscount.toFixed(2)}`;
    document.getElementById("grandTotal").innerText = `₹${grandTotal.toFixed(2)}`;
}

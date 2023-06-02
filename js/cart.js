let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || []


// Produktdatat finns i variabeln shopData (se data.js)
const updateLocalStorage = () => {
    localStorage.setItem('data', JSON.stringify(basket));
}
const updateBasketQuantity = () => {
    const totalQuantity = basket.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartAmount').innerText = totalQuantity;
};

const getQuantity = (id) => {
    const item = basket.find(item => item.id === id);
    return item ? item.quantity : 0;
}

const generateCartItems = () => {
    const cartItems = basket.map(item => {
        let product = shopData.find(p => p.id === item.id);
        return `
            <div class="cart-item">
                <img width="100" src=${product.image} alt="" />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${product.title}</p>
                            <p class="cart-item-price">${product.price}</p>
                        </h4>
                        <i onclick="removeItem(${product.id})" class="bi bi-x-lg"></i>
                    </div>
                    <div class="cart-buttons">
                        <div class="buttons">
                            <i onclick="decrement(${product.id})" class="bi bi-dash-lg"></i>
                            <div id="quantity-${product.id}" class="quantity">${item.quantity}</div>
                            <i onclick="increment(${product.id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                    <h3 id="total-${product.id}">${item.quantity * product.price}</h3>
                </div>
            </div>
        `;
    }).join("");

    shoppingCart.innerHTML = cartItems;
}



const removeItem = (id) => {
    basket = basket.filter(item => item.id !== id);
    updateLocalStorage();
    updateBasketQuantity();
    calculateTotalSum();
    generateCartItems();

}

const increment = (id) => {

    let item = basket.find(item => item.id === id);
    if (!item) {
        item = { id: id, quantity: 0 };
        basket.push(item);
    }


    item.quantity++;
    document.getElementById(`quantity-${id}`).innerText = item.quantity;
    document.getElementById(`total-${id}`).innerText = item.quantity * shopData.find(item => item.id === id).price;

    
    updateLocalStorage();
    updateBasketQuantity();
    calculateTotalSum();
    
}

const decrement = (id) => {
    let item = basket.find(item => item.id === id);
    
    if (item && item.quantity > 0) {
        item.quantity--;
        document.getElementById(`quantity-${id}`).innerText = item.quantity;
        document.getElementById(`total-${id}`).innerText = item.quantity * shopData.find(item => item.id === id).price;

        if (item.quantity === 0) {
            
            basket = basket.filter(item => item.id !== id);
        }

        updateLocalStorage();
        updateBasketQuantity();
        calculateTotalSum();
        
    }
}
const calculateTotalSum = () => {
    let totalSum = 0;
    
    // Loop through each item in the basket
    for (let item of basket) {
        // Get the corresponding product data
        let product = shopData.find(p => p.id === item.id);
        
        if (product) {
            // Add the product's total cost to the total sum
            totalSum += item.quantity * product.price;
        }
    }

    // Insert the total sum into the HTML
    document.getElementById('totalSum').innerText = `Total Sum: ${totalSum}`;
}



window.onload = function() {
    generateCartItems();
    updateBasketQuantity();
    calculateTotalSum();
}
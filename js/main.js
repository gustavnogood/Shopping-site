const shop = document.getElementById('shop');
let basket = JSON.parse(localStorage.getItem("data")) || [];

const getQuantity = (id) => {
    const item = basket.find(item => item.id === id);
    return item ? item.quantity : 0;
}

const generateShop = (products) => {
    const shopItems = products.map(product => `
        <div id="product-id-${product.id}" class="item">
            <img width="220" src=${product.image} alt=""> 
            <div class="details">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <div class="price-quantity">
                    <h2>${product.price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${product.id})" class="bi bi-dash-lg"></i>
                        <div id=${product.id} class="quantity">
                        </div>
                        <div id="quantity-${product.id}" class="quantity">${getQuantity(product.id)}</div>
                        <i onclick="increment(${product.id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    `).join("");

    shop.innerHTML = shopItems;
}

generateShop(shopData)

const increment = (id) => {
    let product = basket.find(item => item.id === id);

    if (product) {
        product.quantity += 1;
    } else {
        basket.push({ id: id, quantity: 1 });
    }
    updateLocalStorage();
    generateShop(shopData);
    updateBasketQuantity();
}

const decrement = (id) => {
    let product = basket.find(item => item.id === id);

    if (product) {
        product.quantity -= 1;
        if (product.quantity <= 0) {
            basket = basket.filter(item => item.id !== id);
        }
    }
    updateLocalStorage();
    generateShop(shopData);
    updateBasketQuantity();
}

const updateLocalStorage = () => {
    localStorage.setItem("data", JSON.stringify(basket));
}

const updateBasketQuantity = () => {
    let basket = JSON.parse(localStorage.getItem("data")) || [];
    let totalQuantity = basket.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cartAmount").innerText = totalQuantity;
}

const generateCategoryButtons = () => {
    const categories = Array.from(new Set(shopData.map(product => product.category)));
    categories.push("All Products");
    const categoryList = document.getElementById('categories');

    categories.forEach(category => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.innerText = category;
        button.onclick = () => filterProducts(category);
        li.appendChild(button);
        categoryList.appendChild(li);
    });
}

const filterProducts = (category) => {
    let filteredData;

    if (category === "All Products") {
        filteredData = shopData;
    } else {
        filteredData = shopData.filter(product => product.category === category);
    }

    generateShop(filteredData);
}

const init = () => {
    updateBasketQuantity();
    generateCategoryButtons();
}

window.onload = init;
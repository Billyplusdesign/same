const reviews = document.querySelectorAll(".review-card");
const dots = document.querySelectorAll(".dot");

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {

        reviews.forEach(review => {
            review.classList.remove("active");
        });

        dots.forEach(dot => {
            dot.classList.remove("active");
        });

        reviews[index].classList.add("active");
        dot.classList.add("active");
    });
});
// this id for cart
const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".close-cart");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});
const cartCount = document.querySelector(".cart-count");
const addCartButtons = document.querySelectorAll(".add-cart");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");

let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];

displayCart();

addCartButtons.forEach(button => {
    button.addEventListener("click", () => {

        const productName = button.dataset.name;
        const productPrice = Number(button.dataset.price);

        const existingProduct = cartProducts.find(
            product => product.name === productName
        );

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cartProducts.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        saveCart();
        displayCart();
    });
});


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cartProducts));
}


function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cartProducts.forEach((product, index) => {

        total += product.price * product.quantity;

        const item = document.createElement("div");

        item.classList.add("cart-product");

        item.innerHTML = `
            <div>
                <h4>${product.name}</h4>
                <p>$${product.price}</p>

                <div class="quantity">
                    <button class="minus" data-index="${index}">−</button>

                    <span>${product.quantity}</span>

                    <button class="plus" data-index="${index}">+</button>
                </div>
            </div>

            <button class="remove-item" data-index="${index}">
                Remove
            </button>
        `;

        cartItems.appendChild(item);
    });


    cartTotal.textContent = total;


    const totalItems = cartProducts.reduce(
        (sum, product) => sum + product.quantity,
        0
    );

    cartCount.textContent = totalItems;


    // PLUS
    document.querySelectorAll(".plus").forEach(button => {

        button.addEventListener("click", () => {

            const index = button.dataset.index;

            cartProducts[index].quantity++;

            saveCart();
            displayCart();
        });

    });


    // MINUS
    document.querySelectorAll(".minus").forEach(button => {

        button.addEventListener("click", () => {

            const index = button.dataset.index;

            if (cartProducts[index].quantity > 1) {
                cartProducts[index].quantity--;
            } else {
                cartProducts.splice(index, 1);
            }

            saveCart();
            displayCart();
        });

    });


    // REMOVE
    document.querySelectorAll(".remove-item").forEach(button => {

        button.addEventListener("click", () => {

            const index = button.dataset.index;

            cartProducts.splice(index, 1);

            saveCart();
            displayCart();
        });

    });

}
const checkoutButton = document.querySelector(".checkout");
const checkoutPage = document.querySelector(".checkout-page");
const closeCheckout = document.querySelector(".close-checkout");

checkoutButton.addEventListener("click", () => {
    checkoutPage.classList.add("active");
});

closeCheckout.addEventListener("click", () => {
    checkoutPage.classList.remove("active");
});

const placeOrderButton = document.querySelector(".place-order");
const successPage = document.querySelector(".success-page");
const continueShopping = document.querySelector(".continue-shopping");

placeOrderButton.addEventListener("click", () => {

    cartProducts = [];

    saveCart();
    displayCart();

    checkoutPage.classList.remove("active");
    cart.classList.remove("active");

    successPage.classList.add("active");

});

continueShopping.addEventListener("click", () => {
    successPage.classList.remove("active");
});


// this is for search

const searchIcon = document.querySelector(".search-icon");
const searchBox = document.querySelector(".search-box");
const closeSearch = document.querySelector(".close-search");

searchIcon.addEventListener("click", () => {
    searchBox.classList.add("active");
});

closeSearch.addEventListener("click", () => {
    searchBox.classList.remove("active");
});

const searchInput = document.querySelector(".search-input-field");
const searchButton = document.querySelector(".search-button");

const products = document.querySelectorAll(
    ".product-card, .arrivals-card"
);

searchButton.addEventListener("click", () => {

    const searchText = searchInput.value.toLowerCase().trim();

    // If search is empty, show everything
    if (searchText === "") {

        products.forEach(product => {
            product.style.display = "";
        });

        return;
    }

    let foundProduct = null;

    products.forEach(product => {

        const productName = product
            .querySelector("h2")
            .textContent
            .toLowerCase();

        if (productName.includes(searchText)) {

            product.style.display = "";

            if (!foundProduct) {
                foundProduct = product;
            }

        } else {

            product.style.display = "none";

        }

    });


    if (foundProduct) {

        searchBox.classList.remove("active");

        foundProduct.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    } else {

        // If nothing is found, show everything again
        products.forEach(product => {
            product.style.display = "";
        });

        alert("Sorry, we couldn't find that product.");

    }

});

// for user

const userIcon = document.querySelector(".user-icon");
const accountBox = document.querySelector(".account-box");
const closeAccount = document.querySelector(".close-account");

userIcon.addEventListener("click", () => {
    accountBox.classList.add("active");
});

closeAccount.addEventListener("click", () => {
    accountBox.classList.remove("active");
});


// welcome page\

const welcomePage = document.querySelector(".welcome-page");

const welcomeSignupButton = document.querySelector(".welcome-signup-button");
const welcomeLoginButton = document.querySelector(".welcome-login-button");


// SIGN UP
welcomeSignupButton.addEventListener("click", () => {

    const name = document.querySelector(".welcome-name").value;
    const email = document.querySelector(".welcome-email").value;
    const password = document.querySelector(".welcome-password").value;

    if (name === "" || email === "" || password === "") {
        alert("Please fill in all the fields.");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("ciestaUser", JSON.stringify(user));

    alert("Account created successfully!");

    welcomePage.style.display = "none";

});


// LOGIN
const welcomeLoginForm = document.querySelector(".welcome-login");
const welcomeLoginSubmit = document.querySelector(".welcome-login-submit");

welcomeLoginButton.addEventListener("click", () => {

    welcomeLoginForm.classList.toggle("active");

});


welcomeLoginSubmit.addEventListener("click", () => {

    const email = document.querySelector(".welcome-login-email").value;
    const password = document.querySelector(".welcome-login-password").value;

    const user = JSON.parse(localStorage.getItem("ciestaUser"));

    if (!user) {
        alert("No account found. Please sign up first.");
        return;
    }

    if (email === user.email && password === user.password) {

        alert("Welcome back, " + user.name + "!");

        welcomePage.style.display = "none";

    } else {

        alert("Incorrect email or password.");

    }

});






const accountName = document.querySelector(".account-name");
const accountEmail = document.querySelector(".account-email");
const logoutButton = document.querySelector(".logout-button");

function showAccountDetails() {

    const user = JSON.parse(localStorage.getItem("ciestaUser"));

    if (user) {
        accountName.textContent = user.name;
        accountEmail.textContent = user.email;
    }

}

userIcon.addEventListener("click", () => {

    accountBox.classList.add("active");

    showAccountDetails();

});


logoutButton.addEventListener("click", () => {

    accountBox.classList.remove("active");

    welcomePage.style.display = "flex";

});


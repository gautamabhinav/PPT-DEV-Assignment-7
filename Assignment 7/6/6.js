const productContainer = document.getElementById('product-container');
const cartContainer = document.getElementById('cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const singleProductContainer = document.getElementById('single-product');

let cartItems = [];

function fetchProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => displayProducts(data))
    .catch(error => displayError());
}

function displayProducts(products) {
  productContainer.innerHTML = '';
  products.forEach(product => {
    const productCard = createProductCard(product);
    productContainer.appendChild(productCard);
  });
}

function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');

  const imageElement = document.createElement('img');
  imageElement.src = product.image;
  imageElement.alt = product.title;
  productCard.appendChild(imageElement);

  const titleElement = document.createElement('h3');
  titleElement.textContent = product.title;
  productCard.appendChild(titleElement);

  const priceElement = document.createElement('p');
  priceElement.textContent = `$${product.price}`;
  productCard.appendChild(priceElement);

  productCard.addEventListener('click', () => displaySingleProduct(product));
  
  return productCard;
}

function displaySingleProduct(product) {
  singleProductContainer.innerHTML = '';

  const imageElement = document.createElement('img');
  imageElement.classList.add('single-product-image');
  imageElement.src = product.image;
  imageElement.alt = product.title;
  singleProductContainer.appendChild(imageElement);

  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('single-product-details');

  const titleElement = document.createElement('h2');
  titleElement.textContent = product.title;
  detailsContainer.appendChild(titleElement);

  const priceElement = document.createElement('p');
  priceElement.textContent = `Price: $${product.price}`;
  detailsContainer.appendChild(priceElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = `Description: ${product.description}`;
  detailsContainer.appendChild(descriptionElement);

  singleProductContainer.appendChild(detailsContainer);

  singleProductContainer.style.display = 'block';
}

function addToCart(product) {
  const existingCartItem = cartItems.find(item => item.id === product.id);

  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  updateCartUI();
}

function updateCartUI() {
  cartItemsContainer.innerHTML = '';

  cartItems.forEach(item => {
    const cartItem = createCartItem(item);
    cartItemsContainer.appendChild(cartItem);
  });

  const total = calculateTotal();
  cartTotalElement.textContent = `Total: $${total}`;

  cartContainer.style.display = cartItems.length > 0 ? 'block' : 'none';
}

function createCartItem(item) {
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');

  const imageElement = document.createElement('img');
  imageElement.src = item.image;
  imageElement.alt = item.title;
  cartItem.appendChild(imageElement);

  const nameElement = document.createElement('div');
  nameElement.classList.add('cart-item-name');
  nameElement.textContent = item.title;
  cartItem.appendChild(nameElement);

  const quantityElement = document.createElement('div');
  quantityElement.classList.add('cart-item-quantity');
  quantityElement.textContent = `Quantity: ${item.quantity}`;
  cartItem.appendChild(quantityElement);

  return cartItem;
}

function calculateTotal() {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

function displayError() {
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = 'Failed to fetch products. Please try again later.';
  productContainer.appendChild(errorMessage);
}

fetchProducts();

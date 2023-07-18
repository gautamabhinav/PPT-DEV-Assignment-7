const productContainer = document.getElementById('product-container');

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

  return productCard;
}

function displayError() {
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = 'Failed to fetch products. Please try again later.';
  productContainer.appendChild(errorMessage);
}

fetchProducts();

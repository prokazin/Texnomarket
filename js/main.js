document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Определяем текущую страницу
    const currentPage = window.location.pathname;
    let category = '';
    
    if (currentPage.includes('apple.html')) category = 'Apple';
    else if (currentPage.includes('xiaomi.html')) category = 'Xiaomi';
    else if (currentPage.includes('google.html')) category = 'Google';

    // Загружаем товары для страницы
    if (category) {
        loadProducts(category);
    } else {
        // Главная страница - показываем популярные товары
        loadFeaturedProducts();
    }

    // Сортировка
    const sortSelect = document.getElementById('sort-products');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const productsContainer = document.querySelector('.products-grid');
            const products = Array.from(productsContainer.children);
            
            switch(this.value) {
                case 'price-asc':
                    products.sort((a, b) => {
                        const priceA = parseFloat(a.dataset.price);
                        const priceB = parseFloat(b.dataset.price);
                        return priceA - priceB;
                    });
                    break;
                case 'price-desc':
                    products.sort((a, b) => {
                        const priceA = parseFloat(a.dataset.price);
                        const priceB = parseFloat(b.dataset.price);
                        return priceB - priceA;
                    });
                    break;
                case 'name':
                    products.sort((a, b) => {
                        return a.dataset.name.localeCompare(b.dataset.name);
                    });
                    break;
                default:
                    return;
            }
            
            products.forEach(product => {
                productsContainer.appendChild(product);
            });
        });
    }
});

function loadProducts(category) {
    const container = document.getElementById(`${category.toLowerCase()}-products`);
    if (!container) return;

    const products = DB.getProductsByCategory(category);
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<p class="no-products">Товаров в этой категории пока нет</p>';
        return;
    }

    products.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const products = DB.getProducts();
    const featured = products.slice(0, 6); // Показываем первые 6 товаров

    container.innerHTML = '';

    featured.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.price = product.price;
    card.dataset.name = product.name;

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300/ccc/fff?text=No+Image'">
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="price">${product.price.toLocaleString()} ₽</div>
            <div class="specs">${product.specs}</div>
            <span class="category-tag">${product.category}</span>
        </div>
    `;

    return card;
}

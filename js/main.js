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

    // Закрытие модального окна по клику вне его
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
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
    const featured = products.slice(0, 6);

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
    card.dataset.productId = product.id;

    // Используем прокси для корректной загрузки изображений
    let imageUrl = product.image;
    if (!imageUrl || imageUrl === 'https://via.placeholder.com/300x300/ccc/fff?text=No+Image') {
        imageUrl = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect width="300" height="300" fill="%23f5f5f7"/%3E%3Ctext x="150" y="150" font-family="Arial" font-size="16" fill="%2386868b" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
    }

    card.innerHTML = `
        <img src="${imageUrl}" alt="${product.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect width=%22300%22 height=%22300%22 fill=%22%23f5f5f7%22/%3E%3Ctext x=%22150%22 y=%22150%22 font-family=%22Arial%22 font-size=%2216%22 fill=%22%2386868b%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E'">
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="price">${product.price.toLocaleString()} ₽</div>
            <div class="specs">${product.specs}</div>
            <span class="category-tag">${product.category}</span>
        </div>
    `;

    // Открытие модального окна при клике
    card.addEventListener('click', function() {
        openProductModal(product.id);
    });

    return card;
}

function openProductModal(productId) {
    const product = DB.getProductById(productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    if (!modal) return;

    // Заполняем модальное окно
    let imageUrl = product.image;
    if (!imageUrl || imageUrl === 'https://via.placeholder.com/300x300/ccc/fff?text=No+Image') {
        imageUrl = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23f5f5f7"/%3E%3Ctext x="200" y="200" font-family="Arial" font-size="20" fill="%2386868b" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
    }

    document.getElementById('modal-image').src = imageUrl;
    document.getElementById('modal-image').alt = product.name;
    document.getElementById('modal-category').textContent = product.category;
    document.getElementById('modal-name').textContent = product.name;
    document.getElementById('modal-price').textContent = `${product.price.toLocaleString()} ₽`;
    
    // Разбиваем характеристики
    const specsContainer = document.getElementById('modal-specs');
    specsContainer.innerHTML = '';
    const specsList = product.specs.split(',').map(s => s.trim());
    specsList.forEach(spec => {
        if (spec) {
            const item = document.createElement('div');
            item.className = 'modal-specs-item';
            item.textContent = spec;
            specsContainer.appendChild(item);
        }
    });

    // Показываем модальное окно
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

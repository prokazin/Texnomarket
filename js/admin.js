const ADMIN_PASSWORD = 'admin123';

function checkAdminPassword() {
    const password = document.getElementById('admin-password').value;
    const error = document.getElementById('login-error');
    
    if (password === ADMIN_PASSWORD) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        error.style.display = 'none';
        loadAdminData();
    } else {
        error.style.display = 'block';
    }
}

function logout() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('admin-password').value = '';
}

function showTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.admin-sidebar button').forEach(b => b.classList.remove('active'));
    
    document.getElementById(`${tab}-tab`).style.display = 'block';
    document.querySelector(`.admin-sidebar button[onclick="showTab('${tab}')"]`).classList.add('active');
    
    if (tab === 'categories') loadCategories();
    if (tab === 'products') loadProductsAdmin();
}

function loadAdminData() {
    loadCategories();
    loadProductsAdmin();
    loadCategorySelect();
}

function loadCategories() {
    const container = document.getElementById('categories-list');
    const categories = DB.getCategories();
    
    container.innerHTML = '';
    
    categories.forEach(cat => {
        const div = document.createElement('div');
        div.className = 'category-item';
        div.innerHTML = `
            <span>${cat.icon || '📦'} ${cat.name}</span>
            <div>
                <button class="edit-btn" onclick="editCategory(${cat.id})">✏️</button>
                <button class="delete-btn" onclick="deleteCategory(${cat.id})">🗑️</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function addCategory() {
    const nameInput = document.getElementById('new-category-name');
    const iconInput = document.getElementById('new-category-icon');
    
    const name = nameInput.value.trim();
    const icon = iconInput.value.trim() || '📦';
    
    if (!name) {
        alert('Введите название категории');
        return;
    }
    
    const categories = DB.getCategories();
    if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        alert('Категория с таким названием уже существует');
        return;
    }
    
    DB.addCategory(name, icon);
    nameInput.value = '';
    iconInput.value = '';
    loadCategories();
    loadCategorySelect();
}

function deleteCategory(id) {
    if (!confirm('Удалить категорию и все товары в ней?')) return;
    DB.deleteCategory(id);
    loadCategories();
    loadCategorySelect();
    loadProductsAdmin();
}

function editCategory(id) {
    const categories = DB.getCategories();
    const category = categories.find(c => c.id === id);
    if (!category) return;
    
    const newName = prompt('Введите новое название:', category.name);
    if (newName && newName.trim()) {
        const data = DB.getData();
        data.products.forEach(p => {
            if (p.category === category.name) {
                p.category = newName.trim();
            }
        });
        category.name = newName.trim();
        DB.saveData(data);
        loadCategories();
        loadCategorySelect();
        loadProductsAdmin();
    }
}

function loadCategorySelect() {
    const select = document.getElementById('product-category');
    if (!select) return;
    
    const categories = DB.getCategories();
    select.innerHTML = '<option value="">Выберите категорию</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.name;
        option.textContent = `${cat.icon || '📦'} ${cat.name}`;
        select.appendChild(option);
    });
}

function loadProductsAdmin() {
    const container = document.getElementById('products-list');
    const products = DB.getProducts();
    
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<p>Товаров пока нет</p>';
        return;
    }
    
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect width=%2260%22 height=%2260%22 fill=%22%23f5f5f7%22/%3E%3Ctext x=%2230%22 y=%2230%22 font-family=%22Arial%22 font-size=%2210%22 fill=%22%2386868b%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo%20Image%3C/text%3E%3C/svg%3E'">
            <div class="product-info">
                <strong>${product.name}</strong><br>
                <span style="color:#007aff;font-weight:bold;">${product.price.toLocaleString()} ₽</span><br>
                <span style="color:#666;font-size:0.9rem;">${product.specs}</span><br>
                <span style="color:#888;font-size:0.8rem;">${product.category}</span>
            </div>
            <div>
                <button class="edit-btn" onclick="editProduct(${product.id})">✏️</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">🗑️</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function addProduct() {
    const category = document.getElementById('product-category').value;
    const name = document.getElementById('product-name').value.trim();
    const price = document.getElementById('product-price').value;
    const specs = document.getElementById('product-specs').value.trim();
    const fileInput = document.getElementById('product-image');
    
    if (!category) {
        alert('Выберите категорию');
        return;
    }
    if (!name) {
        alert('Введите название товара');
        return;
    }
    if (!price || isNaN(price) || price <= 0) {
        alert('Введите корректную цену');
        return;
    }
    
    let image = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect width="300" height="300" fill="%23f5f5f7"/%3E%3Ctext x="150" y="150" font-family="Arial" font-size="16" fill="%2386868b" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
    
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            image = e.target.result;
            saveProduct(category, name, parseFloat(price), specs, image);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        saveProduct(category, name, parseFloat(price), specs, image);
    }
}

function saveProduct(category, name, price, specs, image) {
    DB.addProduct(name, price, specs, category, image);
    
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-specs').value = '';
    document.getElementById('product-image').value = '';
    document.getElementById('product-category').value = '';
    
    loadProductsAdmin();
}

function deleteProduct(id) {
    if (!confirm('Удалить товар?')) return;
    DB.deleteProduct(id);
    loadProductsAdmin();
}

function editProduct(id) {
    const product = DB.getProductById(id);
    if (!product) return;
    
    const newName = prompt('Название:', product.name);
    if (newName && newName.trim()) {
        const newPrice = prompt('Цена:', product.price);
        if (newPrice && !isNaN(newPrice) && parseFloat(newPrice) > 0) {
            const newSpecs = prompt('Характеристики:', product.specs);
            if (newSpecs !== null) {
                DB.updateProduct(id, {
                    name: newName.trim(),
                    price: parseFloat(newPrice),
                    specs: newSpecs.trim()
                });
                loadProductsAdmin();
            }
        } else {
            alert('Введите корректную цену');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('admin-password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkAdminPassword();
            }
        });
    }
});

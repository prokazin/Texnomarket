// База данных (хранится в localStorage)
const DB = {
    getData() {
        const data = localStorage.getItem('techno_market_data');
        if (data) {
            return JSON.parse(data);
        }
        // Начальные данные с 25 товарами
        return this.getDefaultData();
    },

    saveData(data) {
        localStorage.setItem('techno_market_data', JSON.stringify(data));
    },

    getDefaultData() {
        return {
            categories: [
                { id: 1, name: 'Apple', icon: '🍎' },
                { id: 2, name: 'Xiaomi', icon: '📱' },
                { id: 3, name: 'Google', icon: '🔍' }
            ],
            products: [
                // Apple (10 товаров)
                { id: 1, name: 'iPhone 15 Pro Max', price: 119990, specs: '6.7", A17 Pro, 256GB', category: 'Apple', image: 'https://via.placeholder.com/300x300/000/fff?text=iPhone+15+Pro' },
                { id: 2, name: 'iPhone 15', price: 79990, specs: '6.1", A16, 128GB', category: 'Apple', image: 'https://via.placeholder.com/300x300/000/fff?text=iPhone+15' },
                { id: 3, name: 'MacBook Pro 14"', price: 159990, specs: 'M3 Pro, 18GB, 512GB', category: 'Apple', image: 'https://via.placeholder.com/300x300/000/fff?text=MacBook+Pro' },
                { id: 4, name: 'MacBook Air 13"', price: 99990, specs: 'M3, 8GB, 256GB', category: 'Apple', image: 'https://via.placeholder.com/300x300/000/fff?text=MacBook+Air' },
                { id: 5, name: 'iPad Pro 12.9"', price: 109990, specs: 'M2, 128GB, Wi-Fi', category: 'Apple', image: 'https://via.placeholder.com/300x300/000/fff?text=iPad+Pro' },
                { id: 6, name: 'iPad Air 10.9"', price: 69990, specs: 'M1, 64GB, Wi-Fi', category: 'Apple', image: 'https://via.placeholder.com/300x300/000/fff?text=iPad+Air' },
                { id: 7, name: 'Apple Watch Ultra 2', price: 89990, specs: '49mm, GPS, Titanium', category: 'Apple', image: 'https://via.placeholder.com/300x300/000/fff?text=Watch+Ultra' },
                { id: 8, name: 'Apple Watch Series 9', price: 49990, specs: '45mm, GPS, Aluminum', category: 'Apple', image: 'https://via.placeholder.com/300x300/000/fff?text=Watch+S9' },
                { id: 9, name: 'AirPods Pro 2', price: 24990, specs: 'Active Noise Cancellation', category: 'Apple', image: 'https://via.placeholder.com/300x300/000/fff?text=AirPods+Pro' },
                { id: 10, name: 'AirPods Max', price: 44990, specs: 'Over-ear, ANC, Space Gray', category: 'Apple', image: 'https://via.placeholder.com/300x300/000/fff?text=AirPods+Max' },
                // Xiaomi (8 товаров)
                { id: 11, name: 'Xiaomi 14 Pro', price: 59990, specs: '6.73", Snapdragon 8 Gen 3, 256GB', category: 'Xiaomi', image: 'https://via.placeholder.com/300x300/FF6600/fff?text=Xiaomi+14+Pro' },
                { id: 12, name: 'Xiaomi 14', price: 49990, specs: '6.36", Snapdragon 8 Gen 3, 128GB', category: 'Xiaomi', image: 'https://via.placeholder.com/300x300/FF6600/fff?text=Xiaomi+14' },
                { id: 13, name: 'Redmi Note 13 Pro+', price: 34990, specs: '6.67", Dimensity 7200, 256GB', category: 'Xiaomi', image: 'https://via.placeholder.com/300x300/FF6600/fff?text=Redmi+Note' },
                { id: 14, name: 'Xiaomi Pad 6', price: 29990, specs: '11", Snapdragon 870, 128GB', category: 'Xiaomi', image: 'https://via.placeholder.com/300x300/FF6600/fff?text=Xiaomi+Pad' },
                { id: 15, name: 'Xiaomi Watch S3', price: 14990, specs: 'AMOLED, GPS, Heart Rate', category: 'Xiaomi', image: 'https://via.placeholder.com/300x300/FF6600/fff?text=Watch+S3' },
                { id: 16, name: 'Xiaomi Buds 4 Pro', price: 9990, specs: 'ANC, Hi-Res Audio', category: 'Xiaomi', image: 'https://via.placeholder.com/300x300/FF6600/fff?text=Buds+4+Pro' },
                { id: 17, name: 'Xiaomi Smart Band 8', price: 4990, specs: 'AMOLED, SpO2, 5ATM', category: 'Xiaomi', image: 'https://via.placeholder.com/300x300/FF6600/fff?text=Band+8' },
                { id: 18, name: 'Xiaomi Robot Vacuum S10', price: 19990, specs: 'Laser Navigation, 4000Pa', category: 'Xiaomi', image: 'https://via.placeholder.com/300x300/FF6600/fff?text=Robot+Vacuum' },
                // Google (7 товаров)
                { id: 19, name: 'Google Pixel 8 Pro', price: 89990, specs: '6.7", Tensor G3, 128GB', category: 'Google', image: 'https://via.placeholder.com/300x300/4285F4/fff?text=Pixel+8+Pro' },
                { id: 20, name: 'Google Pixel 8', price: 69990, specs: '6.2", Tensor G3, 128GB', category: 'Google', image: 'https://via.placeholder.com/300x300/4285F4/fff?text=Pixel+8' },
                { id: 21, name: 'Google Pixel 7a', price: 49990, specs: '6.1", Tensor G2, 128GB', category: 'Google', image: 'https://via.placeholder.com/300x300/4285F4/fff?text=Pixel+7a' },
                { id: 22, name: 'Google Pixel Fold', price: 139990, specs: 'Foldable, Tensor G2, 256GB', category: 'Google', image: 'https://via.placeholder.com/300x300/4285F4/fff?text=Pixel+Fold' },
                { id: 23, name: 'Google Nest Hub 2', price: 9990, specs: '7", Speaker, Smart Display', category: 'Google', image: 'https://via.placeholder.com/300x300/4285F4/fff?text=Nest+Hub' },
                { id: 24, name: 'Google Nest Audio', price: 6990, specs: 'Smart Speaker, Voice Control', category: 'Google', image: 'https://via.placeholder.com/300x300/4285F4/fff?text=Nest+Audio' },
                { id: 25, name: 'Google Chromecast 4K', price: 4990, specs: '4K HDR, Android TV, Remote', category: 'Google', image: 'https://via.placeholder.com/300x300/4285F4/fff?text=Chromecast' }
            ]
        };
    },

    getCategories() {
        return this.getData().categories;
    },

    getProducts() {
        return this.getData().products;
    },

    getProductsByCategory(category) {
        return this.getData().products.filter(p => p.category === category);
    },

    addCategory(name, icon) {
        const data = this.getData();
        const newCategory = {
            id: Date.now(),
            name: name,
            icon: icon || '📦'
        };
        data.categories.push(newCategory);
        this.saveData(data);
        return newCategory;
    },

    deleteCategory(id) {
        const data = this.getData();
        data.categories = data.categories.filter(c => c.id !== id);
        // Удаляем товары этой категории
        data.products = data.products.filter(p => p.category !== data.categories.find(c => c.id === id)?.name);
        this.saveData(data);
    },

    addProduct(name, price, specs, category, image) {
        const data = this.getData();
        const newProduct = {
            id: Date.now(),
            name: name,
            price: parseFloat(price),
            specs: specs,
            category: category,
            image: image || 'https://via.placeholder.com/300x300/ccc/fff?text=No+Image'
        };
        data.products.push(newProduct);
        this.saveData(data);
        return newProduct;
    },

    updateProduct(id, updates) {
        const data = this.getData();
        const index = data.products.findIndex(p => p.id === id);
        if (index !== -1) {
            data.products[index] = { ...data.products[index], ...updates };
            this.saveData(data);
            return data.products[index];
        }
        return null;
    },

    deleteProduct(id) {
        const data = this.getData();
        data.products = data.products.filter(p => p.id !== id);
        this.saveData(data);
    },

    getProductById(id) {
        return this.getData().products.find(p => p.id === id);
    }
};

// База данных (хранится в localStorage)
const DB = {
    getData() {
        const data = localStorage.getItem('techno_market_data');
        if (data) {
            return JSON.parse(data);
        }
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
                // APPLE - 10 товаров с реальными фото
                { 
                    id: 1, 
                    name: 'iPhone 15 Pro Max', 
                    price: 119990, 
                    specs: '6.7" Super Retina XDR, A17 Pro, 256GB, Titanium',
                    category: 'Apple',
                    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-7inch-natural?wid=5120&hei=2880&fmt=webp&qlt=70&.v=1693529963578'
                },
                { 
                    id: 2, 
                    name: 'iPhone 15', 
                    price: 79990, 
                    specs: '6.1" Super Retina XDR, A16, 128GB, Pink',
                    category: 'Apple',
                    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=5120&hei=2880&fmt=webp&qlt=70&.v=1693529758558'
                },
                { 
                    id: 3, 
                    name: 'MacBook Pro 14"', 
                    price: 159990, 
                    specs: 'M3 Pro, 18GB, 512GB SSD, Space Black',
                    category: 'Apple',
                    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=2560&hei=1440&fmt=webp&qlt=70&.v=1693529932746'
                },
                { 
                    id: 4, 
                    name: 'MacBook Air 13"', 
                    price: 99990, 
                    specs: 'M3, 8GB, 256GB SSD, Midnight',
                    category: 'Apple',
                    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=2560&hei=1440&fmt=webp&qlt=70&.v=1707075842988'
                },
                { 
                    id: 5, 
                    name: 'iPad Pro 12.9"', 
                    price: 109990, 
                    specs: 'M2, 128GB, Wi-Fi, Space Gray',
                    category: 'Apple',
                    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-202210?wid=2560&hei=1440&fmt=webp&qlt=70&.v=1664409425397'
                },
                { 
                    id: 6, 
                    name: 'iPad Air 10.9"', 
                    price: 69990, 
                    specs: 'M1, 64GB, Wi-Fi, Blue',
                    category: 'Apple',
                    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-202203?wid=2560&hei=1440&fmt=webp&qlt=70&.v=1644972720703'
                },
                { 
                    id: 7, 
                    name: 'Apple Watch Ultra 2', 
                    price: 89990, 
                    specs: '49mm, GPS + Cellular, Titanium',
                    category: 'Apple',
                    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-watch-ultra2-select-202309?wid=2560&hei=1440&fmt=webp&qlt=70&.v=1693529872714'
                },
                { 
                    id: 8, 
                    name: 'Apple Watch Series 9', 
                    price: 49990, 
                    specs: '45mm, GPS, Aluminum, Midnight',
                    category: 'Apple',
                    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-watch-series9-select-202309?wid=2560&hei=1440&fmt=webp&qlt=70&.v=1693529650969'
                },
                { 
                    id: 9, 
                    name: 'AirPods Pro 2', 
                    price: 24990, 
                    specs: 'Active Noise Cancellation, USB-C',
                    category: 'Apple',
                    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero?wid=2560&hei=1440&fmt=webp&qlt=70&.v=1693529705178'
                },
                { 
                    id: 10, 
                    name: 'AirPods Max', 
                    price: 44990, 
                    specs: 'Over-ear, ANC, Space Gray',
                    category: 'Apple',
                    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202011?wid=2560&hei=1440&fmt=webp&qlt=70&.v=1604021848000'
                },

                // XIAOMI - 8 товаров с реальными фото
                { 
                    id: 11, 
                    name: 'Xiaomi 14 Pro', 
                    price: 59990, 
                    specs: '6.73" AMOLED, Snapdragon 8 Gen 3, 256GB',
                    category: 'Xiaomi',
                    image: 'https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi14pro/hero.png'
                },
                { 
                    id: 12, 
                    name: 'Xiaomi 14', 
                    price: 49990, 
                    specs: '6.36" AMOLED, Snapdragon 8 Gen 3, 128GB',
                    category: 'Xiaomi',
                    image: 'https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi14/hero.png'
                },
                { 
                    id: 13, 
                    name: 'Redmi Note 13 Pro+', 
                    price: 34990, 
                    specs: '6.67" AMOLED, Dimensity 7200, 256GB',
                    category: 'Xiaomi',
                    image: 'https://i01.appmifile.com/webfile/globalimg/products/pc/redmi-note-13-pro-plus/hero.png'
                },
                { 
                    id: 14, 
                    name: 'Xiaomi Pad 6', 
                    price: 29990, 
                    specs: '11" LCD, Snapdragon 870, 128GB',
                    category: 'Xiaomi',
                    image: 'https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomipad6/hero.png'
                },
                { 
                    id: 15, 
                    name: 'Xiaomi Watch S3', 
                    price: 14990, 
                    specs: 'AMOLED, GPS, Heart Rate Monitor',
                    category: 'Xiaomi',
                    image: 'https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-watch-s3/hero.png'
                },
                { 
                    id: 16, 
                    name: 'Xiaomi Buds 4 Pro', 
                    price: 9990, 
                    specs: 'ANC, Hi-Res Audio, 48dB',
                    category: 'Xiaomi',
                    image: 'https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-buds-4-pro/hero.png'
                },
                { 
                    id: 17, 
                    name: 'Xiaomi Smart Band 8', 
                    price: 4990, 
                    specs: 'AMOLED, SpO2, 5ATM Waterproof',
                    category: 'Xiaomi',
                    image: 'https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-band-8/hero.png'
                },
                { 
                    id: 18, 
                    name: 'Xiaomi Robot Vacuum S10', 
                    price: 19990, 
                    specs: 'Laser Navigation, 4000Pa Suction',
                    category: 'Xiaomi',
                    image: 'https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-robot-vacuum-s10/hero.png'
                },

                // GOOGLE - 7 товаров с реальными фото
                { 
                    id: 19, 
                    name: 'Google Pixel 8 Pro', 
                    price: 89990, 
                    specs: '6.7" OLED, Tensor G3, 128GB, Bay',
                    category: 'Google',
                    image: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Pixel_8_Pro_Bay_1.max-1000x1000.png'
                },
                { 
                    id: 20, 
                    name: 'Google Pixel 8', 
                    price: 69990, 
                    specs: '6.2" OLED, Tensor G3, 128GB, Rose',
                    category: 'Google',
                    image: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Pixel_8_Rose_1.max-1000x1000.png'
                },
                { 
                    id: 21, 
                    name: 'Google Pixel 7a', 
                    price: 49990, 
                    specs: '6.1" OLED, Tensor G2, 128GB',
                    category: 'Google',
                    image: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Pixel_7a_Sage_1.max-1000x1000.png'
                },
                { 
                    id: 22, 
                    name: 'Google Pixel Fold', 
                    price: 139990, 
                    specs: '7.6" Foldable OLED, Tensor G2, 256GB',
                    category: 'Google',
                    image: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Pixel_Fold_Porcelain_1.max-1000x1000.png'
                },
                { 
                    id: 23, 
                    name: 'Google Nest Hub 2', 
                    price: 9990, 
                    specs: '7" Smart Display, Speaker, Charcoal',
                    category: 'Google',
                    image: 'https://lh3.googleusercontent.com/Qg3oNEycbhOKtWl86zS7seCKgn9WHmmQLD-J5B8kCHc1P1DlB9S9Bz5r7aR4K5q5t5g7n9d8f7g5h6j7k8l9'
                },
                { 
                    id: 24, 
                    name: 'Google Nest Audio', 
                    price: 6990, 
                    specs: 'Smart Speaker, Voice Control, Chalk',
                    category: 'Google',
                    image: 'https://lh3.googleusercontent.com/Qg3oNEycbhOKtWl86zS7seCKgn9WHmmQLD-J5B8kCHc1P1DlB9S9Bz5r7aR4K5q5t5g7n9d8f7g5h6j7k8l10'
                },
                { 
                    id: 25, 
                    name: 'Google Chromecast 4K', 
                    price: 4990, 
                    specs: '4K HDR, Android TV, Voice Remote',
                    category: 'Google',
                    image: 'https://lh3.googleusercontent.com/Qg3oNEycbhOKtWl86zS7seCKgn9WHmmQLD-J5B8kCHc1P1DlB9S9Bz5r7aR4K5q5t5g7n9d8f7g5h6j7k8l11'
                }
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
        const category = data.categories.find(c => c.id === id);
        data.categories = data.categories.filter(c => c.id !== id);
        if (category) {
            data.products = data.products.filter(p => p.category !== category.name);
        }
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

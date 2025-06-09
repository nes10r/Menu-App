// Restaurant Application Class
class RestaurantApp {
    constructor() {
        this.menuItems = [];
        this.currentCategory = 'all';
        this.currentPage = 'menu';
        this.scriptLoading = false;
        this.cart = [];
        
        // Force clear inconsistent data but don't reload
        this.forceDataReset();
        
        // Check if we should skip auto-loading
        if (sessionStorage.getItem('skipAutoLoad') === 'true') {
            sessionStorage.removeItem('skipAutoLoad');
            console.log('Avtomatik yükləmə atlandı - manuel əlavə edin');
        } else {
            this.loadMenuItems();
        }
        
        this.init();
    }

    // Force reset data if there are any issues
    forceDataReset() {
        // Check if we're in a reload loop
        const reloadCount = sessionStorage.getItem('reloadCount') || '0';
        const currentCount = parseInt(reloadCount) + 1;
        
        if (currentCount > 3) {
            console.log('Sonsuz reload dövrəsi dayandırıldı!');
            sessionStorage.removeItem('reloadCount');
            localStorage.clear();
            return;
        }
        
        sessionStorage.setItem('reloadCount', currentCount.toString());
        
        const items = localStorage.getItem('menuItems');
        if (items) {
            try {
                const menuItems = JSON.parse(items);
                // Check if any items have wrong category format OR duplicates
                const hasWrongCategories = menuItems.some(item => 
                    item.category && (
                        item.category.includes('Pagrindiniai') || 
                        item.category.includes('Užkandžiai') ||
                        item.category.includes('Sriubos')
                    )
                );
                
                // Check for duplicates by counting items with same name
                const nameCount = {};
                menuItems.forEach(item => {
                    nameCount[item.name] = (nameCount[item.name] || 0) + 1;
                });
                const hasDuplicates = Object.values(nameCount).some(count => count > 1);
                
                if (hasWrongCategories || hasDuplicates || menuItems.length > 25) {
                    console.log('Təkrarlanan və ya səhv məlumatlar tapıldı, sadəcə təmizlənir...');
                    localStorage.clear(); // Sadəcə təmizləyir, reload etmir
                }
            } catch (error) {
                console.log('localStorage məlumatlarında xəta, təmizlənir...');
                localStorage.clear();
            }
        }
        
        // Clear reload counter after successful check
        setTimeout(() => {
            sessionStorage.removeItem('reloadCount');
        }, 2000);
    }

    // Initialize the application
    init() {
        // Check if we need to reset data due to category issues
        this.checkAndResetData();
        
        this.bindEvents();
        this.renderMenu();
        this.updateEmptyState();
        this.setMinDate();
    }

    // Check and reset data if categories are inconsistent
    checkAndResetData() {
        const items = localStorage.getItem('menuItems');
        if (items) {
            const menuItems = JSON.parse(items);
            const hasWrongCategories = menuItems.some(item => 
                item.category && item.category[0] === item.category[0].toUpperCase()
            );
            
            if (hasWrongCategories) {
                console.log('Kateqoriya adları düzəldildi, məlumatlar yenidən yüklənir...');
                localStorage.removeItem('menuItems');
                localStorage.removeItem('menuItemsLoaded');
                window.location.reload();
                return;
            }
        }
    }

    // Bind event listeners
    bindEvents() {
        // Main navigation
        document.querySelectorAll('.nav-link').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchPage(e.target.closest('.nav-link').dataset.page);
                // Close mobile menu after navigation
                this.closeMobileMenu();
            });
        });

        // Category navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const button = e.target.closest('.nav-btn');
                if (button && button.dataset.category) {
                    this.filterByCategory(button.dataset.category);
                }
            });
        });



        // Contact form
        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitContactForm();
        });

        // Reservation form
        document.getElementById('reservation-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitReservation();
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }



        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const navMenu = document.querySelector('.nav-menu');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            
            if (navMenu && navMenu.classList.contains('mobile-open') && 
                !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    // Filter menu items by category
    filterByCategory(category) {
        this.currentCategory = category;
        
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-category="${category}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Render filtered menu
        this.renderMenu();
        
        // Dispatch custom event for scroll position management
        window.dispatchEvent(new CustomEvent('menuFiltered'));
        
        // Optional: Show filter notification (uncomment if wanted)
        // const categoryName = this.getCategoryDisplayName(category);
        // if (category === 'all') {
        //     this.showNotification('Bütün məhsullar göstərilir', 'info');
        // } else {
        //     this.showNotification(`${categoryName} kateqoriyası seçildi`, 'info');
        // }
    }

    // Get filtered menu items
    getFilteredItems() {
        if (this.currentCategory === 'all') {
            return this.menuItems;
        }
        return this.menuItems.filter(item => item.category === this.currentCategory);
    }

    // Render menu items
    renderMenu() {
        const menuContainer = document.getElementById('menu-items');
        const filteredItems = this.getFilteredItems();

        menuContainer.innerHTML = '';

        filteredItems.forEach((item, index) => {
            const menuItemElement = this.createMenuItemElement(item, index);
            menuContainer.appendChild(menuItemElement);
        });

        this.updateEmptyState();
    }

    // Create menu item element
    createMenuItemElement(item, index) {
        const globalIndex = this.menuItems.indexOf(item);
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <div class="menu-item-image">
                ${item.image ? 
                    `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                     <i class="fas fa-utensils" style="display:none; font-size: 3rem; color: #ddd; text-align: center; padding: 2rem;"></i>` : 
                    '<i class="fas fa-utensils" style="font-size: 3rem; color: #ddd; text-align: center; padding: 2rem;"></i>'
                }
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <span class="menu-item-price">€${item.price.toFixed(2)}</span>
                </div>
                ${item.description ? `<p class="menu-item-description">${item.description}</p>` : ''}
                <span class="menu-item-category">${this.getCategoryDisplayName(item.category)}</span>
                <div class="quantity-selector">
                    <button class="qty-btn minus" onclick="restaurantApp.updateQuantity(${globalIndex}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display" id="qty-${globalIndex}">0</span>
                    <button class="qty-btn plus" onclick="restaurantApp.updateQuantity(${globalIndex}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <button class="delete-btn" onclick="restaurantApp.deleteMenuItem(${index})" title="Ištrinti patiekalą">
                <i class="fas fa-trash"></i>
            </button>
        `;
        return menuItem;
    }

    // Get category display name in Lithuanian
    getCategoryDisplayName(category) {
        const categoryNames = {
            'uzkandziai': 'Užkandžiai',
            'sriubos': 'Sriubos',
            'pagrindinis': 'Pagrindiniai',
            'desertai': 'Desertai',
            'gerimi': 'Gėrimai'
        };
        return categoryNames[category] || category;
    }

    // Toggle admin panel
    toggleAdminPanel() {
        const adminForm = document.getElementById('admin-form');
        adminForm.classList.toggle('hidden');
        
        // Admin modunu body-də göstər/gizlət
        const isAdminVisible = !adminForm.classList.contains('hidden');
        if (isAdminVisible) {
            document.body.classList.add('admin-mode');
        } else {
            document.body.classList.remove('admin-mode');
        }
    }

    // Hide admin panel
    hideAdminPanel() {
        document.getElementById('admin-form').classList.add('hidden');
        document.body.classList.remove('admin-mode');
    }

    // Toggle mobile menu
    toggleMobileMenu() {
        const mainNav = document.querySelector('.nav-menu');
        if (mainNav) {
            mainNav.classList.toggle('mobile-open');
            
            // Toggle hamburger icon
            const toggleBtn = document.querySelector('.mobile-menu-toggle i');
            if (toggleBtn) {
                if (mainNav.classList.contains('mobile-open')) {
                    toggleBtn.className = 'fas fa-times';
                } else {
                    toggleBtn.className = 'fas fa-bars';
                }
            }
        }
    }

    // Close mobile menu
    closeMobileMenu() {
        const mainNav = document.querySelector('.nav-menu');
        const toggleBtn = document.querySelector('.mobile-menu-toggle i');
        
        if (mainNav) {
            mainNav.classList.remove('mobile-open');
        }
        
        if (toggleBtn) {
            toggleBtn.className = 'fas fa-bars';
        }
    }

    // Toggle mobile order card
    toggleMobileOrder() {
        const orderCard = document.getElementById('mobile-order-card');
        if (orderCard) {
            orderCard.classList.toggle('mobile-open');
        }
    }

    // Close mobile order card
    closeMobileOrder() {
        const orderCard = document.getElementById('mobile-order-card');
        if (orderCard) {
            orderCard.classList.remove('mobile-open');
        }
    }

    // Add new menu item
    addMenuItem() {
        const name = document.getElementById('item-name').value.trim();
        const description = document.getElementById('item-description').value.trim();
        const price = parseFloat(document.getElementById('item-price').value);
        const category = document.getElementById('item-category').value;
        const image = document.getElementById('item-image').value.trim();

        if (!name || !price || price <= 0) {
            alert('Prašome užpildyti visus privalomas laukus!');
            return;
        }

        const newItem = {
            id: Date.now(),
            name,
            description,
            price,
            category,
            image: image || null
        };

        this.menuItems.push(newItem);
        this.saveMenuItems();
        this.renderMenu();
        this.clearForm();
        this.hideAdminPanel();

        // Show success message
        this.showNotification('Patiekalas sėkmingai pridėtas!', 'success');
    }

    // Delete menu item
    deleteMenuItem(index) {
        if (confirm('Ar tikrai norite ištrinti šį patiekalą?')) {
            const globalIndex = this.menuItems.findIndex(item => 
                this.getFilteredItems()[index] === item
            );
            
            if (globalIndex !== -1) {
                this.menuItems.splice(globalIndex, 1);
                this.saveMenuItems();
                this.renderMenu();
                this.showNotification('Patiekalas sėkmingai ištrintas!', 'success');
            }
        }
    }

    // Switch between pages
    switchPage(page) {
        this.currentPage = page;
        
        // Update active nav button
        document.querySelectorAll('.nav-link').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Show selected page
        document.getElementById(`${page}-page`).classList.add('active');

        // Hide admin panel when switching pages
        this.hideAdminPanel();
    }

    // Submit contact form
    submitContactForm() {
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const phone = document.getElementById('contact-phone').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        if (!name || !email || !message) {
            alert('Prašome užpildyti visus privalomas laukus!');
            return;
        }

        // Create WhatsApp message
        let whatsappMessage = `📩 YENI MESAJ\n\n`;
        whatsappMessage += `👤 Ad: ${name}\n`;
        whatsappMessage += `📧 E-mail: ${email}\n`;
        if (phone) {
            whatsappMessage += `📞 Telefon: ${phone}\n`;
        }
        whatsappMessage += `💬 Mesaj:\n${message}`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Send to WhatsApp
        window.open(`https://wa.me/37066280705?text=${encodedMessage}`, '_blank');

        this.showNotification('Mesaj göndərildi! WhatsApp açıldı.', 'success');
        document.getElementById('contact-form').reset();
    }

    // Submit reservation
    submitReservation() {
        const name = document.getElementById('res-name').value.trim();
        const phone = document.getElementById('res-phone').value.trim();
        const date = document.getElementById('res-date').value;
        const time = document.getElementById('res-time').value;
        const guests = document.getElementById('res-guests').value;

        if (!name || !phone || !date || !time || !guests) {
            alert('Prašome užpildyti visus privalomas laukus!');
            return;
        }

        // Check if date is not in the past
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            alert('Negalite rezervuoti stalo praeities datai!');
            return;
        }

        // Get additional data
        const notes = document.getElementById('res-notes').value.trim();

        // Create reservation data
        const reservationData = {
            id: Date.now(),
            name,
            phone,
            date,
            time,
            guests,
            notes,
            status: 'pending'
        };

        // Create WhatsApp message
        let whatsappMessage = `🍽️ YENİ REZERVASIYA\n\n`;
        whatsappMessage += `👤 Ad: ${name}\n`;
        whatsappMessage += `📞 Telefon: ${phone}\n`;
        whatsappMessage += `📅 Tarix: ${date}\n`;
        whatsappMessage += `⏰ Vaxt: ${time}\n`;
        whatsappMessage += `👥 Qonaq sayı: ${guests}\n`;
        
        if (notes) {
            whatsappMessage += `📝 Qeydlər: ${notes}\n`;
        }
        
        whatsappMessage += `\n✅ Rezervasiyanı təsdiqləyin`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Send to WhatsApp
        window.open(`https://wa.me/37066280705?text=${encodedMessage}`, '_blank');

        // Save reservation locally
        this.saveReservation(reservationData);
        
        this.showNotification(`Rezervacija göndərildi! WhatsApp açıldı.`, 'success');
        document.getElementById('reservation-form').reset();
        this.setMinDate(); // Reset minimum date
    }

    // Set minimum date for reservation
    setMinDate() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const dateInput = document.getElementById('res-date');
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    // Save reservation to localStorage
    saveReservation(reservation) {
        const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));
    }

    // Clear form fields
    clearForm() {
        document.getElementById('add-item-form').reset();
    }

    // Update empty state visibility
    updateEmptyState() {
        const emptyState = document.getElementById('empty-state');
        const filteredItems = this.getFilteredItems();
        
        if (filteredItems.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Load menu items from localStorage
    loadMenuItems() {
        // Clear any inconsistent category data
        this.fixCategoryNames();
        
        if (localStorage.getItem('menuItemsLoaded') === 'true') {
            const items = localStorage.getItem('menuItems');
            if (items) {
                try {
                    this.menuItems = JSON.parse(items);
                    // Remove duplicates after loading
                    this.removeDuplicates();
                    console.log('Menu items loaded from localStorage:', this.menuItems.length);
                    // Render menu after loading
                    setTimeout(() => {
                        this.renderMenu();
                    }, 100);
                } catch (error) {
                    console.error('Error parsing menu items:', error);
                    this.resetMenuData();
                }
            } else {
                console.log('No menu items in localStorage, loading from script...');
                this.loadFromScript();
            }
        } else {
            console.log('Menu items not loaded yet, loading from script...');
            this.loadFromScript();
        }
    }

    // Remove duplicate menu items
    removeDuplicates() {
        const seen = new Map();
        const uniqueItems = [];
        let duplicateCount = 0;
        
        this.menuItems.forEach(item => {
            const key = item.name.toLowerCase().trim();
            if (!seen.has(key)) {
                seen.set(key, true);
                uniqueItems.push(item);
            } else {
                console.log(`Təkrarlanan yemək silindi: ${item.name}`);
                duplicateCount++;
            }
        });
        
        if (duplicateCount > 0) {
            this.menuItems = uniqueItems;
            this.saveMenuItems();
            console.log(`${duplicateCount} təkrarlanan yemək silindi. Qalan: ${uniqueItems.length}`);
            
            // Notification removed - duplicates cleaned silently
        }
    }

    // Load menu items from add-menu-items.js script
    loadFromScript() {
        // Prevent multiple script loading
        if (this.scriptLoading) {
            console.log('Script artıq yüklənir...');
            return;
        }
        this.scriptLoading = true;

        const script = document.createElement('script');
        script.src = 'add-menu-items.js';
        script.onload = () => {
            console.log('Menu items script loaded');
            localStorage.setItem('menuItemsLoaded', 'true');
            this.scriptLoading = false;
            // Don't reload, just render what we have
                                setTimeout(() => {
                        this.renderMenu();
                        // Removed notification - no need to show
                    }, 500);
        };
        script.onerror = () => {
            console.error('Failed to load menu items script');
            this.scriptLoading = false;
            this.addSampleItems();
        };
        document.head.appendChild(script);
    }

    // Reset menu data
    resetMenuData() {
        localStorage.removeItem('menuItems');
        localStorage.removeItem('menuItemsLoaded');
        this.loadFromScript();
    }

    // Add sample items if script fails
    addSampleItems() {
        this.menuItems = [
            {
                id: 1,
                name: 'Cezario salotos',
                description: 'Šviežios salotos su vištiena ir parmezano sūriu',
                price: 8.50,
                category: 'uzkandziai',
                image: null
            }
        ];
        this.saveMenuItems();
        this.renderMenu();
    }

    // Fix category names to match filter system
    fixCategoryNames() {
        const items = localStorage.getItem('menuItems');
        if (items) {
            const menuItems = JSON.parse(items);
            let hasChanges = false;
            
            menuItems.forEach(item => {
                // Fix category names to lowercase format
                if (item.category === 'Pagrindiniai') {
                    item.category = 'pagrindinis';
                    hasChanges = true;
                }
                if (item.category === 'Užkandžiai') {
                    item.category = 'uzkandziai';
                    hasChanges = true;
                }
                if (item.category === 'Sriubos') {
                    item.category = 'sriubos';
                    hasChanges = true;
                }
                if (item.category === 'Desertai') {
                    item.category = 'desertai';
                    hasChanges = true;
                }
                if (item.category === 'Gėrimai') {
                    item.category = 'gerimi';
                    hasChanges = true;
                }
            });
            
            if (hasChanges) {
                localStorage.setItem('menuItems', JSON.stringify(menuItems));
                console.log('Fixed category names in localStorage');
            }
        }
    }

    // Save menu items to localStorage
    saveMenuItems() {
        localStorage.setItem('menuItems', JSON.stringify(this.menuItems));
    }

    // Update quantity in cart
    updateQuantity(itemIndex, change) {
        const item = this.menuItems[itemIndex];
        if (!item) return;

        // Find item in cart
        const cartIndex = this.cart.findIndex(cartItem => cartItem.id === item.id || cartItem.name === item.name);
        
        if (cartIndex !== -1) {
            // Item exists in cart
            this.cart[cartIndex].quantity += change;
            
            if (this.cart[cartIndex].quantity <= 0) {
                this.cart.splice(cartIndex, 1);
            }
        } else if (change > 0) {
            // Add new item to cart
            this.cart.push({
                id: item.id || Date.now(),
                name: item.name,
                price: item.price,
                quantity: change
            });
        }

        // Update display
        this.updateQuantityDisplay(itemIndex);
        this.updateCartDisplay();
    }

    // Update quantity display on menu item
    updateQuantityDisplay(itemIndex) {
        const item = this.menuItems[itemIndex];
        const quantityDisplay = document.getElementById(`qty-${itemIndex}`);
        
        if (quantityDisplay && item) {
            const cartItem = this.cart.find(cartItem => cartItem.id === item.id || cartItem.name === item.name);
            const quantity = cartItem ? cartItem.quantity : 0;
            quantityDisplay.textContent = quantity;
            
            // Update minus button state
            const minusBtn = quantityDisplay.previousElementSibling;
            if (minusBtn) {
                minusBtn.disabled = quantity <= 0;
            }
        }
    }

    // Update cart display
    updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartClearBtn = document.getElementById('cart-clear-btn');
        const cartCounter = document.getElementById('cart-counter');
        const cartSection = document.getElementById('cart-section');
        
        // Update cart counter
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCounter) {
            if (totalItems > 0) {
                cartCounter.textContent = totalItems;
                cartCounter.style.display = 'flex';
            } else {
                cartCounter.style.display = 'none';
            }
        }

        // Show/hide cart section based on items
        if (cartSection) {
            if (totalItems > 0) {
                cartSection.style.display = 'block';
            } else {
                cartSection.style.display = 'none';
            }
        }
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Pasirinkti patiekalai atsiras čia</p>
                </div>
            `;
            cartTotal.style.display = 'none';
            cartClearBtn.style.display = 'none';
        } else {
            let cartHTML = '';
            let total = 0;
            
            this.cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                cartHTML += `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-details">${item.quantity} x €${item.price.toFixed(2)}</div>
                        </div>
                        <div class="cart-item-price">€${itemTotal.toFixed(2)}</div>
                    </div>
                `;
            });
            
            cartItems.innerHTML = cartHTML;
            cartTotal.style.display = 'block';
            cartClearBtn.style.display = 'block';
            
            // Update total amount
            const totalAmount = cartTotal.querySelector('.total-amount');
            if (totalAmount) {
                totalAmount.textContent = `€${total.toFixed(2)}`;
            }
        }
    }

    // Clear entire cart
    clearCart() {
        this.cart = [];
        this.updateCartDisplay();
        
        // Reset all quantity displays
        this.menuItems.forEach((item, index) => {
            this.updateQuantityDisplay(index);
        });
        
        // Close mobile cart if open
        this.closeMobileCart();
        
        this.showNotification('Krepšelis išvalytas', 'info');
    }

    // Order cart via WhatsApp
    orderCart() {
        if (this.cart.length === 0) {
            alert('Jūsų krepšelis tuščias!');
            return;
        }

        let message = `🍽️ NAUJAS UŽSAKYMAS\n\n`;
        let total = 0;
        
        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `• ${item.name} x${item.quantity} = €${itemTotal.toFixed(2)}\n`;
        });
        
        message += `\n💰 Iš viso: €${total.toFixed(2)}\n`;
        message += `🚚 Pristatymas: €2.50\n`;
        message += `💳 Bendra suma: €${(total + 2.50).toFixed(2)}\n\n`;
        message += `📞 Laukiu skambučio patvirtinimui!`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/37066280705?text=${encodedMessage}`, '_blank');
        
        this.showNotification('Užsakymas išsiųstas į WhatsApp!', 'success');
    }

    // Toggle mobile cart
    toggleMobileCart() {
        const cartSection = document.getElementById('cart-section');
        const closeBtn = document.getElementById('cart-close-mobile');
        
        if (cartSection) {
            cartSection.classList.toggle('mobile-expanded');
            
            // Show/hide close button based on expanded state
            if (closeBtn) {
                if (cartSection.classList.contains('mobile-expanded')) {
                    closeBtn.style.display = 'block';
                } else {
                    closeBtn.style.display = 'none';
                }
            }
        }
    }

    // Close mobile cart
    closeMobileCart() {
        const cartSection = document.getElementById('cart-section');
        const closeBtn = document.getElementById('cart-close-mobile');
        
        if (cartSection) {
            cartSection.classList.remove('mobile-expanded');
        }
        
        if (closeBtn) {
            closeBtn.style.display = 'none';
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.restaurantApp = new RestaurantApp();
});

// Improved UX for category filtering - no forced scrolling
document.addEventListener('DOMContentLoaded', () => {
    // Keep current scroll position when filtering
    let lastScrollPosition = 0;
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Save current scroll position
            lastScrollPosition = window.pageYOffset;
        });
    });
    
    // Restore scroll position after filtering (if reasonable)
    window.addEventListener('menuFiltered', () => {
        setTimeout(() => {
            // Only restore if user hasn't scrolled much from the category nav
            const categoryNav = document.querySelector('.category-nav');
            if (categoryNav && lastScrollPosition > categoryNav.offsetTop - 50) {
                window.scrollTo({
                    top: lastScrollPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Open admin panel with Ctrl+A
    if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        if (window.restaurantApp) {
            window.restaurantApp.toggleAdminPanel();
        }
    }
    
    // Close admin panel with Escape
    if (e.key === 'Escape') {
        const adminForm = document.getElementById('admin-form');
        if (!adminForm.classList.contains('hidden')) {
            window.restaurantApp.hideAdminPanel();
        }
    }
});

// Debug function to clear all data (can be called from browser console)
window.clearMenuData = function() {
    localStorage.clear(); // Bütün localStorage-ı təmizləyirik
    console.log('Bütün localStorage təmizləndi, səhifə yenidən yüklənir...');
    window.location.reload();
};

// Function to remove duplicates (can be called from browser console)
window.removeDuplicateMenuItems = function() {
    if (window.restaurantApp) {
        const oldCount = window.restaurantApp.menuItems.length;
        window.restaurantApp.removeDuplicates();
        window.restaurantApp.renderMenu();
        const newCount = window.restaurantApp.menuItems.length;
        console.log(`Əvvəl: ${oldCount}, İndi: ${newCount} yemək`);
    } else {
        console.log('RestaurantApp hələ yüklənməyib');
    }
};

// Force complete reset - use this if duplicates persist
window.forceMenuReset = function() {
    console.log('MƏCBURI RESET: Bütün məlumatlar silinir...');
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
};

// Manually load menu items without auto-reload
window.loadMenuManually = function() {
    if (window.restaurantApp) {
        console.log('Manuel yükləmə başladı...');
        window.restaurantApp.scriptLoading = false;
        window.restaurantApp.loadFromScript();
    }
}; 
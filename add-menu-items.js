// Script to add menu items from the handwritten list
// Run this script in the browser console after the page loads

function addMenuItems() {
    // Wait for the app to be ready
    if (!window.restaurantApp) {
        setTimeout(addMenuItems, 500);
        return;
    }

    const menuItems = [
        // Pagrindiniai patiekalai (Ana yemeklər)
        {
            name: "Jautienos šašlykas",
            description: "Marinuota jautiena su šviežiais prieskoniais",
            price: 12.50,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Kiaulienos šašlykas",
            description: "Sultinga kiaulienos nugarinė su česnakais",
            price: 11.80,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1598515213692-d872bd5ce022?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Avienos šašlykas",
            description: "Šviežia avienos šlaunelė su rozmarinais",
            price: 14.20,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Vištienos šašlykas",
            description: "Marinuota vištienos krūtinėlė su žolelėmis",
            price: 10.90,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1598515213692-d872bd5ce022?w=800&h=600&fit=crop&crop=center"
        },
        {
            name: "Mišrūs šašlykai",
            description: "Jautienos, kiaulienos ir vištienos mišinys",
            price: 13.50,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1618219908458-e7b2c9143ddb?w=800&h=600&fit=crop&crop=center"
        },
        {
            name: "Lyvekos šašlykas",
            description: "Tradicinis lietuviškas lyvekos kepsnys",
            price: 13.80,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&h=600&fit=crop&crop=center"
        },
        {
            name: "Cepelinai",
            description: "Bulvių virtiniai su mėsa ir spirgučiais",
            price: 9.50,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1545907623-8d67a7baff35?w=800&h=600&fit=crop&crop=center"
        },
        {
            name: "Kugelis",
            description: "Tradicinis lietuviškas bulvių patiekalas",
            price: 8.90,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800&h=600&fit=crop&crop=center"
        },
        {
            name: "Kotletai su bulvėmis",
            description: "Namie darytų kotletų su viruėmis bulvėmis",
            price: 10.20,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1562007908-17c67e878c88?w=800&h=600&fit=crop&crop=center"
        },
        {
            name: "Žuvis ant griliaus",
            description: "Šviežia žuvis su citrinos ir česnako padažu",
            price: 15.50,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1555962580-e380875cadd7?w=800&h=600&fit=crop&crop=center"
        },
        {
            name: "Dešrelės ant griliaus",
            description: "Aukščiausios kokybės dešrelės su padažais",
            price: 7.80,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?w=800&h=600&fit=crop&crop=center"
        },
        {
            name: "Jautienos brizgetas",
            description: "Sultingas jautienos brizgetas su svogūnais",
            price: 16.90,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&crop=center"
        },
        {
            name: "Kepti baklažanai",
            description: "Aniksėta ir grilyje kepsėjas baklažanai",
            price: 8.50,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1588043108151-c10c49bf78fe?w=800&h=600&fit=crop&crop=center"
        },
        {
            name: "Sparneliai",
            description: "Aštriavaviški sparneliai su BBQ padažu",
            price: 9.80,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&h=600&fit=crop&crop=center"
        },
        {
            name: "Kiaulienos šonkauliai",
            description: "Lėtai kepti šonkauliai su medaus glajumi",
            price: 17.50,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop&crop=center"
        },
        {
            name: "Daržovių mišinys",
            description: "Grilyje keptos sezoninės daržovės",
            price: 7.20,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&h=600&fit=crop&crop=center"
        },

        // Užkandžiai (Qəlyanaltılar)
        {
            name: "Kepta duona su česnaku",
            description: "Šviežia duona su aromatingais česnakais",
            price: 4.50,
            category: "uzkandziai",
            image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&h=600&fit=crop&crop=center"
        },

        // Sriubos (Şorbalar)
        {
            name: "Borščas",
            description: "Tradicinė burokėlių sriuba su grietine",
            price: 6.80,
            category: "sriubos",
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop&crop=center"
        },
        {
            name: "Šaltibarščiai",
            description: "Rožinė burokėlių sriuba su šviežiais agurkais",
            price: 5.90,
            category: "sriubos",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=600&fit=crop&crop=center"
        },
        {
            name: "Bulvių sriuba",
            description: "Tiršta bulvių sriuba su šonine ir svogūnais",
            price: 5.50,
            category: "sriubos",
            image: "https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?w=800&h=600&fit=crop&crop=center"
        }
    ];

    // Add each menu item
    menuItems.forEach((item, index) => {
        setTimeout(() => {
            // Create a new item object
            const newItem = {
                id: Date.now() + index,
                name: item.name,
                description: item.description,
                price: item.price,
                category: item.category,
                image: item.image
            };

            // Add to menu items array
            window.restaurantApp.menuItems.push(newItem);
            
            console.log(`Added: ${item.name} - €${item.price}`);
        }, index * 100); // Small delay between additions
    });

    // Save and render after all items are added
    setTimeout(() => {
        // Remove duplicates before saving
        window.restaurantApp.removeDuplicates();
        window.restaurantApp.saveMenuItems();
        window.restaurantApp.renderMenu();
        console.log('All menu items added successfully!');
        
        // Success notification removed - no need to show
    }, menuItems.length * 100 + 500);
}

// Auto-run when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addMenuItems);
} else {
    addMenuItems();
}

console.log('add-menu-items.js loaded successfully'); 
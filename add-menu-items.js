// Script to add menu items from the handwritten list
// Run this script in the browser console after the page loads

function addMenuItems() {
    // Wait for the app to be ready
    if (!window.restaurantApp) {
        setTimeout(addMenuItems, 500);
        return;
    }

    const menuItems = [
        {
            name: "Vistiena ant grilio",
            description: "Marinuota vištiena su šviežiais prieskoniais, kepta ant grilio.",
            price: 14.00,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Lule kebabas",
            description: "Malta mėsa su prieskoniais, kepta ant iešmo.",
            price: 13.50,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Vistienos sparneliai kebabas",
            description: "Vištienos sparneliai, kepti ant grilio su prieskoniais.",
            price: 10.60,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Vistienos krūtinėlės kebabas",
            description: "Vištienos krūtinėlė, marinuota ir kepta ant grilio.",
            price: 11.20,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Jautienos kepenėly kebabas",
            description: "Jautienos kepenėlės, marinuotos ir keptos ant grilio.",
            price: 8.70,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Avienos iešmo kebabas",
            description: "Avienos gabaliukai, kepti ant iešmo su prieskoniais.",
            price: 16.40,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Vėsios jautienos kebabas",
            description: "Troškinta jautiena su prieskoniais, patiekiama šilta.",
            price: 14.40,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Vistienos kile kebabas",
            description: "Vištienos filė, marinuota ir kepta ant grilio.",
            price: 11.80,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Chano kebabas",
            description: "Tradicinis kebabas su įvairia mėsa ir prieskoniais.",
            price: 14.80,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Bulvių košė su kotletu",
            description: "Bulvių košė su keptu mėsos kotletu.",
            price: 5.40,
            category: "kiti",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Grikiai su kotletu",
            description: "Grikiai patiekiami su keptu mėsos kotletu.",
            price: 4.80,
            category: "kiti",
            image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Kotlet yumurta",
            description: "Keptas kotletas su kiaušiniu.",
            price: 4.70,
            category: "kiti",
            image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Pomidorai su vaissiniais",
            description: "Kepti pomidorai su kiaušiniais.",
            price: 4.20,
            category: "kiti",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Plovas su ašqara",
            description: "Tradicinis plovas su kepta mėsa.",
            price: 4.80,
            category: "kiti",
            image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Lęšių sriuba",
            description: "Lęšių sriuba su daržovėmis ir prieskoniais.",
            price: 3.20,
            category: "sriuba",
            image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Dusbarų sriuba",
            description: "Tradicinė sriuba su mažais mėsos koldūnais.",
            price: 3.80,
            category: "sriuba",
            image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Trošinti jautiena",
            description: "Troškinta jautiena su prieskoniais.",
            price: 12.50,
            category: "kiti",
            image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Granatų troškinys",
            description: "Troškinta mėsa su granatų sultimis ir prieskoniais.",
            price: 13.50,
            category: "kiti",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Dovga sriuba",
            description: "Gaivi jogurto sriuba su žolelėmis ir ryžiais.",
            price: 3.50,
            category: "sriuba",
            image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Žuvies grilis",
            description: "Ant grilio kepta žuvis su prieskoniais.",
            price: 12.80,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Žuvies mailius",
            description: "Keptas mažas žuvis su prieskoniais.",
            price: 10.5,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Veršiena su grietinėle",
            description: "Troškinta veršiena su grietinėlės padažu.",
            price: 14.80,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Vištiena Roll",
            description: "Vištienos suktinukas su daržovėmis.",
            price: 11.80,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Jautiena roll",
            description: "Jautienos suktinukas su prieskoniais.",
            price: 14.5,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Avienos troškinys",
            description: "Troškinta aviena su daržovėmis ir prieskoniais.",
            price: 13.5,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Avienos kepsnys",
            description: "Kepta avienos išpjova su prieskoniais.",
            price: 14.5,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Piemens kepsnys",
            description: "Tradicinis piemens kepsnys su mėsa ir bulvėmis.",
            price: 13.5,
            category: "pagrindinis",
            image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Piemenų salotos",
            description: "Šviežios daržovių salotos su žalumynais.",
            price: 4.5,
            category: "salotos",
            image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Cezario salotos",
            description: "Klasikinės Cezario salotos su vištiena ir sūriu.",
            price: 6.5,
            category: "salotos",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Baklažanų ruletės salotos",
            description: "Baklažanų suktinukai su daržovėmis ir žalumynais.",
            price: 6.8,
            category: "salotos",
            image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Marinuotų pomidorų salotos",
            description: "Marinuotų pomidorų salotos su žalumynais.",
            price: 5.2,
            category: "salotos",
            image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
        },
        {
            name: "Pomidorų ir agurkų salotos su graikiniais riešutais",
            description: "Šviežių pomidorų ir agurkų salotos su graikiniais riešutais.",
            price: 6.8,
            category: "salotos",
            image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?ixlib=rb-4.0.3&w=400&h=300&fit=crop"
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

    // Render after all items are added
    setTimeout(() => {
        window.restaurantApp.renderMenu();
        console.log('All menu items added successfully!');
    }, menuItems.length * 100 + 500);
}

// Manually trigger by calling addMenuItems()
// Auto-run removed to prevent duplicate loading

console.log('add-menu-items.js loaded successfully'); 
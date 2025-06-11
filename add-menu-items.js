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
            image: "https://imageproxy.wolt.com/assets/675ae3a233d8b646b5034a12"
        },
        {
            name: "Lule kebabas",
            description: "Malta mėsa su prieskoniais, kepta ant iešmo.",
            price: 13.50,
            category: "pagrindinis",
            image: "https://imageproxy.wolt.com/assets/669a2bcbc07c810afd6f421d"
        },
        {
            name: "Vistienos sparneliai kebabas",
            description: "Vištienos sparneliai, kepti ant grilio su prieskoniais.",
            price: 10.60,
            category: "pagrindinis",
            image: "https://imageproxy.wolt.com/menu/menu-images/605f72a70e57bf374ff5cc5d/b3223a2e-8fea-11eb-b56b-8e47e618bdc1_toyuq_qanadlari.jpeg"
        },
        {
            name: "Vistienos krūtinėlės kebabas",
            description: "Vištienos krūtinėlė, marinuota ir kepta ant grilio.",
            price: 11.20,
            category: "pagrindinis",
            image: "https://imageproxy.wolt.com/assets/673208f79c9a8161a751e47d"
        },
        {
            name: "Jautienos kepenėly kebabas",
            description: "Jautienos kepenėlės, marinuotos ir keptos ant grilio.",
            price: 8.80,
            category: "pagrindinis",
            image: "https://imageproxy.wolt.com/menu/menu-images/shared/e548e670-e045-11ee-95a6-2ab725359fef_ciyer_kabab.jpg"
        },
        {
            name: "Avienos iešmo kebabas",
            description: "Avienos gabaliukai, kepti ant iešmo su prieskoniais.",
            price: 16.70,
            category: "pagrindinis",
            image: "https://imageproxy.wolt.com/menu/menu-images/61f3f450b226af4b51d443cd/93b44846-80e2-11ec-a5ce-72b300c14780_quzu_tike.jpeg"
        },
        {
            name: "Vėsios jautienos kebabas",
            description: "Troškinta jautiena su prieskoniais, patiekiama šilta.",
            price: 17.40,
            category: "pagrindinis",
            image: "https://imageproxy.wolt.com/menu/menu-images/6392e6f7a3e66b1094c85d1e/241918ee-7796-11ed-94ed-6e8b3e9bfb77_10.jpeg"
        },
        {
            name: "Vistienos lule kebabas",
            description: "Vištienos filė, marinuota ir kepta ant grilio.",
            price: 11.80,
            category: "pagrindinis",
            image: "https://imageproxy.wolt.com/menu/menu-images/61e6b08b56d0a3eed1e7efc1/a8eaf534-7a93-11ec-9ea4-22c6e9530eea_toyuq_lu_l_.jpeg"
        },
        {
            name: "Chano kebabas",
            description: "Tradicinis kebabas su įvairia mėsa ir prieskoniais.",
            price: 17.80,
            category: "pagrindinis",
            image: "https://evdar.az/wp-content/uploads/Kabablarin-Krali-Xan-Kababi2.jpg"
        },
        {
            name: "Bulvių košė su kotletu",
            description: "Bulvių košė su keptu mėsos kotletu.",
            price: 5.40,
            category: "kiti",
            image: "https://imageproxy.wolt.com/menu/menu-images/63983bd1bca2011235375d0a/376f900e-c744-11ee-a3b3-86e91d16a772_5a23c1fa_9083_11ec_ab81_8678645e9474_image64_photoroom__7_.png"
        },
        {
            name: "Grikiai su kotletu",
            description: "Grikiai patiekiami su keptu mėsos kotletu.",
            price: 4.80,
            category: "kiti",
            image: "https://imageproxy.wolt.com/assets/682adf589eaf4abe19a54a90"
        },
        {
            name: "Kiaušinis kotletas",
            description: "Keptas kotletas su kiaušiniu.",
            price: 4.70,
            category: "kiti",
            image: "https://evdar.az/wp-content/uploads/%C6%8Fn-Dadli-Kotlet-Reseptl%C9%99ri1.jpg"
        },
        {
            name: "Pomidorai su vaissiniais",
            description: "Kepti pomidorai su kiaušiniais.",
            price: 4.20,
            category: "kiti",
            image: "https://imageproxy.wolt.com/menu/menu-images/6165900ad526d720717a6ea5/460c2a38-2bf0-11ec-9a46-5a9e43d44f6d_pomidor_yumurta.jpeg"
        },
        {
            name: "Plovas su ašqara",
            description: "Tradicinis plovas su kepta mėsa.",
            price: 7.80,
            category: "kiti",
            image: "https://imageproxy.wolt.com/menu/menu-images/6213f642e289f69532dead20/a06ae51a-935a-11ec-81b9-36463625b8bd_milli_plov_ashqara.jpeg"
        },
        {
            name: "Lęšių sriuba",
            description: "Lęšių sriuba su daržovėmis ir prieskoniais.",
            price: 3.20,
            category: "sriuba",
            image: "https://imageproxy.wolt.com/menu/menu-images/b662ba5c-0205-11ea-8bfa-0a586465be40_Merci_supu.jpeg"
        },
        {
            name: "Dusbarų sriuba",
            description: "Tradicinė sriuba su mažais mėsos koldūnais.",
            price: 4.50,
            category: "sriuba",
            image: "https://imageproxy.wolt.com/menu/menu-images/5fddfe25208eded1e469d2e4/ca670950-4eef-11ee-acec-26f12bab3eec_dushbere.jpg"
        },
        {
            name: "Trošinti jautiena",
            description: "Troškinta jautiena su prieskoniais.",
            price: 12.50,
            category: "kiti",
            image: "https://imageproxy.wolt.com/menu/menu-images/625d3f50a06013c16350c8ef/fcb2a784-dd9e-11ec-9bd8-eaf33822e86f_malsousu.jpeg"
        },
        {
            name: "Granatų troškinys",
            description: "Troškinta mėsa su granatų sultimis ir prieskoniais.",
            price: 13.50,
            category: "kiti",
            image: "https://mado.az/uploads/product/1073/Quzu_tli_nar_qovurma_1724407365.jpghttps://mado.az/uploads/product/1073/Quzu_tli_nar_qovurma_1724407365.jpg"
        },
        {
            name: "Dovga sriuba",
            description: "Gaivi jogurto sriuba su žolelėmis ir ryžiais.",
            price: 3.50,
            category: "sriuba",
            image: "https://imageproxy.wolt.com/menu/menu-images/60cc27ae9f99e608a987676d/e25bd770-7c81-11ed-9c9b-666149dd1ae8_screenshot_2022_12_15_at_18.07.51.jpeg"
        },
        {
            name: "Žuvies grilis",
            description: "Ant grilio kepta žuvis su prieskoniais.",
            price: 12.80,
            category: "pagrindinis",
            image: "https://imageproxy.wolt.com/assets/673208913023fb35876a6a55"
        },
        {
            name: "Žuvies mailius",
            description: "Keptas mažas žuvis su prieskoniais.",
            price: 10.5,
            category: "pagrindinis",
            image: "https://imageproxy.wolt.com/menu/menu-images/shared/45900a54-78a9-11ee-b2ba-124e8bb87db0_dsc04485.jpg"
        },
        {
            name: "Veršiena su grietinėle",
            description: "Troškinta veršiena su grietinėlės padažu.",
            price: 14.80,
            category: "pagrindinis",
            image: "https://mado.az/uploads/product/1064/Qaymaql_gblkli_can_ti_1724400821.jpg"
        },
        {
            name: "Vištiena Roll",
            description: "Vištienos suktinukas su daržovėmis.",
            price: 11.80,
            category: "pagrindinis",
            image: "https://www.minahalal.com/wp-content/uploads/2015/02/kati-chicken-roll_11015.jpg"
        },
        {
            name: "Jautiena roll",
            description: "Jautienos suktinukas su prieskoniais.",
            price: 14.5,
            category: "pagrindinis",
            image: "https://imageproxy.wolt.com/menu/menu-images/63c003365adc4b191703961d/a4863312-927c-11ed-8fe5-c61e5c4bbce2_shaurma_et.jpeg"
        },
        {
            name: "Avienos troškinys",
            description: "Troškinta aviena su daržovėmis ir prieskoniais.",
            price: 13.5,
            category: "pagrindinis",
            image: "https://imageproxy.wolt.com/menu/menu-images/6165900ad526d720717a6ea5/f2bd7614-2bf1-11ec-b2b8-76048cbf3ada_cholpa_chiqirtmasi.jpeg"
        },
        {
            name: "Avienos kepsnys",
            description: "Kepta avienos išpjova su prieskoniais.",
            price: 14.5,
            category: "pagrindinis",
            image: "https://imageproxy.wolt.com/assets/67221189cf8a351c427f3417"
        },
        {
            name: "Piemens kepsnys",
            description: "Tradicinis piemens kepsnys su mėsa ir bulvėmis.",
            price: 13.5,
            category: "pagrindinis",
            image: "https://imageproxy.wolt.com/menu/menu-images/6437cf871ba3d6792042100c/b2940d7e-d9e1-11ed-a56e-be3c83ca0ce0_c_oban_qovurma.jpeg"
        },
        {
            name: "Piemenų salotos",
            description: "Šviežios daržovių salotos su žalumynais.",
            price: 4.5,
            category: "salotos",
            image: "https://imageproxy.wolt.com/menu/menu-images/61533ade5cea6dbac485a483/1dcdb4ea-2288-11ec-ab74-967bfe62247b_2._coban_salati.jpeg"
        },
        {
            name: "Cezario salotos",
            description: "Klasikinės Cezario salotos su vištiena ir sūriu.",
            price: 6.5,
            category: "salotos",
            image: "https://imageproxy.wolt.com/assets/67979aa168839465740a6adf"
        },
        {
            name: "Baklažanų ruletės salotos",
            description: "Baklažanų suktinukai su daržovėmis ir žalumynais.",
            price: 6.8,
            category: "salotos",
            image: "https://oba.az/site/assets/files/2199/badimcan_ruleti.jpg"
        },
        {
            name: "Marinuotų pomidorų salotos",
            description: "Marinuotų pomidorų salotos su žalumynais.",
            price: 5.2,
            category: "salotos",
            image: "https://imageproxy.wolt.com/menu/menu-images/shared/06aedb4e-2a07-11ee-b588-c658c58b1a46_gu_rcu__salat__qoz_sousu_il_.jpg"
        },
        {
            name: "Pomidorų ir agurkų salotos su graikiniais riešutais",
            description: "Šviežių pomidorų ir agurkų salotos su graikiniais riešutais.",
            price: 6.8,
            category: "salotos",
            image: ""
        },
        {
            name: "Coca Cola",
            description: "Klasikinis gaivusis gėrimas su kofeinu.",
            price: 2.50,
            category: "gerimai",
            image: "https://cdn3.evostore.io/productimages/vow_api/l/arn10943_01.jpg"
        },
        {
            name: "Fanta",
            description: "Apelsinų skonio gaivusis gėrimas.",
            price: 2.50,
            category: "gerimai",
            image: "image.png"
        },
        {
            name: "Ayranas",
            description: "Tradicinis azerbaidžaniškas jogurto gėrimas.",
            price: 2.00,
            category: "gerimai",
            image: "image.png"
        },
        {
            name: "Chai",
            description: "Tradicinė azerbaidžaniška arbata, kvapi ir šilta.",
            price: 1.50,
            category: "gerimai",
            image: "https://kirikoklava.com/wp-content/uploads/2018/03/kcay.jpg"
        },
        {
            name: "Cofee",
            description: "Šviežiai paruošta kava, stipri ir aromatinga.",
            price: 3.00,
            category: "gerimai",
            image: "https://www.bakenroll.az/en/image/americano.jpg"
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

// Auto-run when page loads (since loaded directly in HTML)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addMenuItems);
} else {
    addMenuItems();
}

console.log('add-menu-items.js loaded successfully'); 
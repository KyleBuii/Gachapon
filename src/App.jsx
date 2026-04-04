import { memo, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Disclaimer from "./component/Disclaimer";
import Footer from "./component/Footer";
import Hotbar from "./component/Hotbar";
import Money from "./component/Money";
import ViewItem from "./component/ViewItem";

/** Gacha Rates
 * Classic
 * $1 - 75%
 * $5 - 20%
 * $10 - 5%
 * 
 * Genshin Impact | Honkai Star Rail
 * 3-star - 94.3%
 * 4-star - 5.1%
 * 5-star - 0.6%
 * 
 * Touhou
 * (1-star) Common     - 60%
 * (2-star) Uncommon   - 30%
 * (3-star) Rare       - 8%
 * (4-star) Super Rare - 2%
 */
const shopItems = {
    'genshin impact': {
        'wanderlust invocation': {
            items: {
                5: {
                    character: ['Zibai', 'Yumemizuki Mizuki', 'Varka', 'Varesa', 'Skirk', 'Nefer', 'Lauma', 'Ineffa', 'Flins', 'Escoffier', 'Durin', 'Columbina', 'Albedo', 'Alhaitham', 'Arataki Itto', 'Arlecchino', 'Baizhu', 'Chasca', 'Chiori', 'Citlali', 'Clorinde', 'Cyno', 'Dehya', 'Diluc', 'Emilie', 'Eula', 'Furina', 'Ganyu', 'Hu Tao', 'Jean', 'Kaedehara Kazuha', 'Kamisato Ayaka', 'Kamisato Ayato', 'Keqing', 'Kinich', 'Klee', 'Lyney', 'Mavuika', 'Mona', 'Mualani', 'Nahida', 'Navia', 'Neuvillette', 'Nilou', 'Qiqi', 'Raiden Shogun', 'Sangonomiya Kokomi', 'Shenhe', 'Sigewinne', 'Tartaglia', 'Tighnari', 'Venti', 'Wanderer', 'Wriothesley', 'Xianyun', 'Xiao', 'Xilonen', 'Yae Miko', 'Yelan', 'Yoimiya', 'Zhongli'],
                    weapon: ['Athame Artis', 'Azurelight', 'Lightbearing Moonshard', 'Symphonist Of Scents', 'Fractured Halo', 'Bloodsoaked Ruins', 'Gest Of The Mighty Wolf', 'Vivid Notions', 'Sunny Morning Sleep In', 'Reliquary Of Truth', 'Nocturnes Curtain Call', 'Nightweavers Looking Glass', 'The Daybreak Chronicles', 'A Thousand Blazing Suns', 'A Thousand Floating Dreams', 'Absolution', 'Amos Bow', 'Aqua Simulacra', 'Aquila Favonia', 'Astral Vultures Crimson Plumage', 'Beacon Of The Reed Sea', 'Calamity Queller', 'Cashflow Supervision', 'Cranes Echoing Call', 'Crimson\'moon\'s Semblance', 'Elegy For The End', 'Engulfing Lightning', 'Everlasting Moonglow', 'Fang Of The Mountain King', 'Freedom Sworn', 'Haran Geppaku Futsu', 'Hunter\'s Path', 'Jadefall Splendor', 'Kagura\'s Verity', 'Key Of Khaj Nisut', 'Light Of Foliar Incision', 'Lost Prayer To The Sacred Winds', 'Lumidouce Elegy', 'Memory Of Dust', 'Mistsplitter Reforged', 'Peak Patrol Song', 'Polar Star', 'Primordial Jade Cutter', 'Primordial Jade Winged Spear', 'Redhorn Stonethresher', 'Silvershower Heartstrings', 'Skyward Atlas', 'Skyward Blade', 'Skyward Harp', 'Skyward Pride', 'Skyward Spine', 'Song Of Broken Pines', 'Splendor Of Tranquil Waters', 'Staff Of Homa', 'Staff Of The Scarlet Sands', 'Starcallers Watch', 'Summit Shaper', 'Surfs Up', 'The First Great Magic', 'The Unforged', 'Thundering Pulse', 'Tome Of The Eternal Flow', 'Tulaytullah\'s Remembrance', 'Uraku Misugiri', 'Verdict', 'Vortex Vanquisher', 'Wolf\'s Gravestone']
                },
                4: {
                    character: ['Jahoda', 'Illuga', 'Ifa', 'Iansan', 'Dahlia', 'Aino', 'Amber', 'Barbara', 'Beidou', 'Bennett', 'Candace', 'Charlotte', 'Chevreuse', 'Chongyun', 'Collei', 'Diona', 'Dori', 'Faruzan', 'Fischl', 'Freminet', 'Gaming', 'Gorou', 'Kachina', 'Kaeya', 'Kaveh', 'Kirara', 'Kujou Sara', 'Kuki Shinobu', 'Lan Yan', 'Layla', 'Lisa', 'Lynette', 'Mika', 'Ningguang', 'Noelle', 'Ororon', 'Razor', 'Rosaria', 'Sayu', 'Sethos', 'Shikanoin Heizou', 'Sucrose', 'Thoma', 'Xiangling', 'Xingqiu', 'Xinyan', 'Yanfei', 'Yaoyao', 'Yun Jin'],
                    weapon: ['Moonweavers Dawn', 'Sacrificers Staff', 'Dawning Frost', 'Akuoumaru', 'Alley Hunter', 'Dragon\'s Bane', 'Eye Of Perception', 'Favonius Codex', 'Favonius Greatsword', 'Favonius Lance', 'Favonius Sword', 'Favonius Warbow', 'Flower Wreathed Feathers', 'Fruitful Hook', 'Lion\'s Roar', 'Lithic Blade', 'Lithic Spear', 'Makhaira Aquamarine', 'Mitternachts Waltz', 'Mountain Bracing Bolt', 'Mouun\'s Moon', 'Portable Power Saw', 'Prospector Drill', 'Rainslasher', 'Range Gauge', 'Rust', 'Sacrificial Bow', 'Sacrificial Fragments', 'Sacrificial Greatsword', 'Sacrificial Sword', 'Sturdy Bone', 'The Alley Flash', 'The Bell', 'The Dockhands Assistant', 'The Flute', 'The Stringless', 'The Widsith', 'Wandering Evenstar', 'Wavebreaker\'s Fin', 'Waveriding Whirl', 'Wine And Song', 'Xiphos Moonlight']
                },
                3: {
                    weapon: ['Black Tassel', 'Bloodtained Greatsword', 'Cool Steel', 'Debate Club', 'Emerald Orb', 'Ferrous Shadow', 'Harbinger Of Dawn', 'Magic Guide', 'Raven Bow', 'Sharpshooter\'s Oath', 'Skyrider Sword', 'Slingshot', 'Thrilling Tales Of Dragon Slayers']
                }
            },
            cost: 1
        }
    },
    'honkai star rail': {
        'stellar warp': {
            items: {
                5: {
                    character: ['Acheron', 'Aglaea', 'Anaxa', 'Archer', 'Argenti', 'Ashveil', 'Aventurine', 'Bailu', 'Black Swan', 'Blade', 'Boothill', 'Bronya', 'Castorice', 'Cerydra', 'Cipher', 'Clara', 'Cyrene', 'Dan Heng Permansor Terrae', 'Dr Ratio', 'Evernight', 'Feixiao', 'Firefly', 'Fu Xuan', 'Fugue', 'Gepard', 'Himeko', 'Huohuo', 'Hyacine', 'Hysilens', 'Imbibitor Lunae', 'Jade', 'Jiaoqiu', 'Jing Yuan', 'Jingliu', 'Kafka', 'Lingsha', 'Luocha', 'Mydei', 'Phainon', 'Rappa', 'Robin', 'Ruan Mei', 'Saber', 'Seele', 'Silver Wolf', 'Sparkle', 'Sparxie', 'Sunday', 'The Dahlia', 'The Herta', 'Topaz', 'Tribbie', 'Welt', 'Yanqing', 'Yao Guang', 'Yunli'],
                    cone: ['A Grounded Ascent', 'A Thankless Coronation', 'Along The Passing Shore', 'An Instance Before A Gaze', 'Baptism Of Pure Thought', 'Before Dawn', 'Brighter Than The Sun', 'But The Battle Isnt Over', 'Dance At Sunset', 'Dazzled By A Flowery World', 'Earthly Escapade', 'Echoes Of The Coffin', 'Epoch Etched In Golden Blood', 'Flame Of Blood Blaze My Path', 'Flowing Nightglow', 'I Shall Be My Own Sword', 'I Venture Forth To Hunt', 'If Time Were A Flower', 'In The Name Of The World', 'In The Night', 'Incessant Rain', 'Inherently Unjust Destiny', 'Into The Unreachable Veil', 'Lies Dance On The Breeze', 'Life Should Be Cast To Flames', 'Long May Rainbows Adorn The Sky', 'Long Road Leads Home', 'Make Farewells More Beautiful', 'Moment Of Victory', 'Never Forget Her Flame', 'Night Of Fright', 'Night On The Milky Way', 'Ninjutsu Inscription', 'Past Self In Mirror', 'Patience Is All You Need', 'Reforged Remembrance', 'Sailing Towards A Second Life', 'Scent Alone Stays True', 'She Already Shut Her Eyes', 'Sleep Like The Dead', 'Something Irreplaceable', 'The Finale Of A Lie', 'The Hell Where Ideals Burn', 'The Unreachable Side', 'This Love Forever', 'Those Many Springs', 'Though Worlds Apart', 'Thus Burns The Dawn', 'Time Waits For No One', 'Time Woven Into Gold', 'To Evernights Stars', 'When She Decided To See', 'Whereabouts Should Dreams Rest', 'Why Does The Ocean Sing', 'Worrisome Blissful', 'Yet Hope Is Priceless']
                },
                4: {
                    character: ['Hanya', 'Moze', 'Herta', 'Natasha', 'Tingyun', 'Arlan', 'Hook', 'Pela', 'Xueyi', 'Asta', 'Luka', 'Qingque', 'Yukong', 'Dan Heng', 'Lynx', 'Sampo', 'Gallagher', 'March 7th', 'Serval', 'Guinaifen', 'Misha', 'Sushang'],
                    cone: ['A Secret Vow', 'After The Charmony Fall', 'Boundless Choreo', 'Concert For Two', 'Dance Dance Dance', 'Day One Of My New Life', 'Dreams Montage', 'Eyes Of The Prey', 'Geniuses Greetings', 'Geniuses Repose', 'Good Night And Sleep Well', 'Indelible Promise', 'Landaus Choice', 'Make The World Clamor', 'Memories Of The Past', 'Only Silence Remains', 'Perfect Timing', 'Planetary Rendezvous', 'Poised To Bloom', 'Post Op Conversation', 'Resolution Shines As Pearls Of Sweat', 'Shadowed By Night', 'Shared Feeling', 'Subscribe For More', 'Swordplay', 'The Birth Of The Self', 'The Moles Welcome You', 'The Storys Next Page', 'Trend Of The Universal Market', 'Under The Blue Sky']
                },
                3: {
                    cone: ['Adversarial', 'Amber', 'Arrows', 'Chorus', 'Collapsing Sky', 'Cornucopia', 'Darting Arrow', 'Data Bank', 'Defense', 'Fine Fruit', 'Hidden Shadow', 'Lingering Tear', 'Loop', 'Mediation', 'Meshing Cogs', 'Multiplication', 'Mutual Demise', 'Passkey', 'Pioneering', 'Reminiscence', 'Sagacity', 'Shadowburn', 'Shattered Home', 'Sneering', 'Void']
                }
            },
            cost: 1
        }

    },
    'touhou': {
        'fumo': {
            items: {
                1: {
                    label: 'common',
                    character: ['Izayoi Kourindou', 'Saigyouji Version 1.5', 'Cirno Version 1'],
                },
                2: {
                    label: 'uncommon',
                    character: ['Hakurei Version 1', 'Kirisame Version 1'],
                },
                3: {
                    label: 'rare',
                    character: ['Hakurei Nendoroid Plus', 'Kirisame Version 2'],
                },
                4: {
                    label: 'super rare',
                    character: ['Komeiji Deka Version 1'],
                },
            },
            cost: 1
        }
    },
    'classic': {
        'red': {
            cost: 1
        },
        'pink': {
            cost: 1
        },
        'purple': {
            cost: 1
        },
        'dark blue': {
            cost: 1
        },
        'blue': {
            cost: 1
        },
        'light green': {
            cost: 1
        },
        'green': {
            cost: 1
        },
        'yellow': {
            cost: 1
        },
        'orange': {
            cost: 1
        },
        'grey': {
            cost: 1
        },
    },
};
const shopBanners = {
    'genshin impact': [
        'adrift-in-the-harbor', 'ballad-in-goblets-2', 'ballad-in-goblets',
        'beginners-wish', 'born-of-ocean-swell', 'dance-of-lanterns',
        'drifting-luminescence', 'epitome-invocation', 'farewell-of-snezhnaya-2',
        'farewell-of-snezhnaya', 'gentry-of-hermitage-2', 'gentry-of-hermitage',
        'invitation-to-mundane-life', 'leaves-in-the-wind', 'moment-of-bloom-2',
        'moment-of-bloom', 'reign-of-serenity', 'secretum-secretorum', 'sparkling-steps-2',
        'sparkling-steps', 'tapestry-of-golden-flames', 'the-herons-court', 'wanderlust-invocation'
    ],
    'honkai star rail': [
        '2-5_1', 'a-hunt-through-night-1', 'a-lost-soul-1', 'a-lost-soul-2', 'a-rainbow-onto-twilight-1',
        'a-rainbow-onto-twilight-3', 'back-to-fons-et-origo-1', 'bloom-in-gloom-1', 'bloom-in-gloom-2', 'bloom-in-gloom-3',
        'butterfly-on-swordtip-1', 'butterfly-on-swordtip-2', 'cauldron-contrivance-1', 'contract-zero-1', 'contract-zero-2',
        'dance-in-flame-1', 'dusty-trails-lone-star-1', 'dusty-trails-lone-star-3', 'earth-hurled-ether-curled-1', 'earth-hurled-ether-curled-2',
        'epochal-spectrum-1', 'epochal-spectrum-2', 'epochal-spectrum-3', 'eyes-of-a-ninja-1', 'eyes-to-the-stars-1',
        'files.txt', 'firefull-flyshine-1', 'firefull-flyshine-2', 'floral-triptych-1', 'floral-triptych-2',
        'foreseen-foreknown-foretold-1', 'foreseen-foreknown-foretold-2', 'fugue-1', 'gentle-eclipse-of-the-moon-1', 'gentle-eclipse-of-the-moon-2',
        'gilded-imprisonment-1', 'gilded-imprisonment-2', 'hati-singa-yang-membara-1', 'hysilens-1', 'just-intonation-1',
        'laic-pursuit-1', 'laic-pursuit-2', 'let-scent-sink-in-1', 'lien-on-life-lease-on-fate-1', 'message-from-beyond-2',
        'nessun-dorma-1', 'nessun-dorma-2', 'panta-rhei-1', 'panta-rhei-2', 'ripples-in-reflection-1',
        'slick-and-speedy-steals-the-sky-1', 'sparkling-splendor-1', 'sparkling-splendor-2', 'sunset-clause-1', 'sunset-clause-2',
        'sunset-clause-3', 'swirl-of-heavenly-spear-1', 'swirl-of-heavenly-spear-2', 'swirl-of-heavenly-spear-3', 'tailored-fate-2',
        'the-long-voyage-home-1', 'the-universe-in-a-seed-1', 'thorns-of-scented-crown-1', 'thorns-of-scented-crown-2', 'words-of-yore-1',
        'words-of-yore-2',
    ]
};
const references = {
    'Font Generator': {
        author: 'TextStudio',
        url: 'https://www.textstudio.com/',
    },
    '"Never Give Up" / Digging for Diamonds Image': {
        author: 'Dum',
        url: 'https://dumilustrador.blogspot.com/',
    },
    'gamblecore Video': {
        author: 'raxdflipnote',
        url: 'https://www.youtube.com/watch?v=IPFiKEm-oNI',
    },
    'Capsule Image': {
        author: 'Airos',
        url: 'https://opengameart.org/content/32px-toy-capsules',
    },
    'No Money Image': {
        author: 'soraway',
        url: 'https://tenor.com/view/wallet-gif-25866507',
    },
    'Genshin Impact Wish Simulator': {
        author: 'Mantan21',
        url: 'https://github.com/Mantan21/Genshin-Impact-Wish-Simulator',
    },
    'Genshin Impact Assets': {
        author: 'Hoyoverse',
        url: 'https://genshin.hoyoverse.com/en/',
    },
    'Honkai Star Rail Warp Simulator': {
        author: 'Hantan21',
        url: 'https://github.com/Mantan21/HSR-Warp-Simulator',
    },
    'Honkai Star Rail Assets': {
        author: 'Hoyoverse',
        url: 'https://hsr.hoyoverse.com/en-us/',
    },
    'Walkthrough Image': {
        author: 'HachiStudio',
        url: 'https://opengameart.org/content/anime-girl%EF%BC%9Ahachi',
    }
};
const audioOpen = new Audio(null);
const audioReveal = new Audio(null);
const maxInventoryRecent = 30;
let timeoutNoMoney;
let inventoryRecent = [];
let scrollY = -1;

const App = () => {
    const [money, setMoney] = useState(10);
    const [inventory, setInventory] = useState({});
    const [openAnimation, setOpenAnimation] = useState('');
    const [currentPopupReward, setCurrentPopupReward] = useState('');
    const [viewedItem, setViewedItem] = useState('');
    const [isViewedItemVisible, setIsViewedItemVisible] = useState(false);

    const refTimeoutsOpen = useRef([]);
    const refTimeoutMaxCount = useRef(0);
    const refTimeoutCount = useRef(0);
    const refMoney = useRef(money);
    const refInventory = useRef(inventory);
    const refPlayer = useRef(null);
    
    const refOpen = useRef(null);
    const refRewardMultiple = useRef(null);
    const refRewardGenshinImpact = useRef(null);
    const refRewardHonkaiStarRail = useRef(null);
    const refRewardTouhou = useRef(null);

    const refLookup = {
        'multiple': refRewardMultiple,
        'genshin impact': refRewardGenshinImpact,
        'honkai star rail': refRewardHonkaiStarRail,
        'touhou': refRewardTouhou,
    };

    useEffect(() => {
        window.addEventListener('beforeunload', storeData);
        audioOpen.addEventListener('ended', handleAudioEnded);

        const popupDisclaimer = document.querySelector('.disclaimer');
        popupDisclaimer.style.visibility = 'visible';

        if (localStorage.getItem('money') !== null) {
            setMoney(localStorage.getItem('money'));
        };
        if (localStorage.getItem('inventory') !== null) {
            setInventory(JSON.parse(localStorage.getItem('inventory')));
        };

        return () => {
            window.removeEventListener('beforeunload', storeData);
            storeData();
            clearTimeout(timeoutNoMoney);

            audioOpen.src = '';
            audioReveal.src = '';
        };
    }, []);
    useEffect(() => {
        refMoney.current = money;
    }, [money]);
    useEffect(() => {
        refInventory.current = inventory;
    }, [inventory]);

    const renderShopItems = (element, items = shopItems) => {
        const elementShopItems = document.getElementById(element);
        for (let set of Object.keys(items)) {
            for (let capsule of Object.keys(items[set])) {
                const elementCapsule = document.createElement('span');
                let reformatSet = set.replace(/\s/g, '-');

                elementCapsule.id = `capsule-${reformatSet}-${capsule}`;
                elementCapsule.className = `group-item ${reformatSet} ${(set !== 'classic') && 'large'}`;
                elementCapsule.key = `${set} ${capsule}`;
                elementCapsule.innerHTML = `
                    <img src='/${reformatSet}/${capsule.replace(/\s/g, '-')}.webp'
                        alt='${set} ${capsule}'
                        loading='lazy'
                        decoding='async'/>
                `;

                const elementCapsuleName = document.createElement('span');
                elementCapsuleName.className = 'item-name';
                elementCapsuleName.innerText = capsule.replace(/^./, (char) => char.toUpperCase())
                    .replace(/\s(.)/g, (char) => char.toUpperCase());
                elementCapsule.appendChild(elementCapsuleName);
                elementCapsule.innerHTML += `<span>$${items[set][capsule].cost}</span>`;

                const buttonBuy = document.createElement('button');
                let buttonBuyText;
                buttonBuy.className = 'buy';

                switch (reformatSet) {
                    case 'genshin-impact':
                        buttonBuyText = 'Wish';
                        break;
                    case 'honkai-star-rail':
                        buttonBuyText = 'Warp';
                        break;
                    case 'touhou':
                        buttonBuyText = 'Pray';
                        break;
                    default:
                        buttonBuyText = 'Buy';
                        break;
                };

                buttonBuy.innerText = buttonBuyText;
                buttonBuy.onclick = () => handleBuy({
                    set: set,
                    type: capsule,
                    cost: items[set][capsule].cost
                });

                const buttonBuyClone = buttonBuy.cloneNode();
                buttonBuyClone.innerText = `${buttonBuyText} x10`;
                buttonBuyClone.onclick = () => handleBuy({
                    set: set,
                    type: capsule,
                    cost: items[set][capsule].cost,
                    amount: 10
                });

                const elementSet = document.createElement('span');
                elementSet.innerText = set
                    .replace(/\s(.)/g, (char) => char.toUpperCase())
                    .replace(/^./, (char) => char.toUpperCase());

                elementCapsule.appendChild(buttonBuy);
                elementCapsule.appendChild(buttonBuyClone);
                elementCapsule.appendChild(elementSet);
                elementShopItems.appendChild(elementCapsule);
            };
        };
    };

    const getValidImage = (image, imageFallback) => {
        return new Promise((resolve) => {
            const newImage = new Image();
            newImage.src = image;
            newImage.onload = () => resolve(image);
            newImage.onerror = () => resolve(imageFallback);
        });
    };

    const handleItemClicked = async (image, imageFallback) => {
        const validImage = await getValidImage(image, imageFallback);
        changeViewedItem(validImage);
    };

    const handleBuy = async ({ set, type, cost, amount = 1 }) => {
        if ((set !== 'classic') && (refMoney.current - (cost * amount) < 0)) {
            const elementGif = document.createElement('img');
            elementGif.className = 'no-money';
            elementGif.src = '/no-money.gif';
            elementGif.alt = 'no money gif';
            elementGif.loading = 'lazy';
            elementGif.decoding = 'async';
            let randomX = Math.random() * (Math.abs(window.innerWidth - 256)) + window.scrollX;
            let randomY = Math.random() * (Math.abs(window.innerHeight - 256)) + window.scrollY;
            elementGif.style.transform = `translate(${randomX}px, ${randomY}px)`;
            document.body.appendChild(elementGif);
            timeoutNoMoney = setTimeout(() => {
                document.body.removeChild(elementGif);
            }, 2000);
        } else {
            const popupOpen = refOpen.current;
            const reformatSet = set.replace(/\s/g, '-');

            let spanReward, parentPopup, popupReward, randomNumber, calculateRate, calculateReward, randomItemType, reformatName;
            let calculateOpenAnimation = '';
            let rewardMoney = 0;
            let highestReward = 0;
            let forcedPulls = [];
            let inventoryAdd = {};
            let inventoryRecentAdd = [];

            /// Get type of popup (single or multi) and set forced pulls
            if ((amount > 1) || (set === 'classic')) {
                parentPopup = refRewardMultiple.current;

                popupReward = document.getElementById('reward-multiple');
                popupReward.innerHTML = '';
                popupReward.className = `reward ${reformatSet}`;

                setCurrentPopupReward('multiple');

                switch (set) {
                    case 'genshin impact':
                    case 'honkai star rail': {
                        let types = Object.keys(shopItems[set][type].items[4]);
                        let randomType = types[Math.floor(Math.random() * types.length)];
                        let randomItem = shopItems[set][type].items[4][randomType][Math.floor(Math.random() * shopItems[set][type].items[4][randomType].length)];
                        forcedPulls.push({
                            [randomType]: randomItem
                        });
                        calculateRate = 4;
                        break;
                    };
                    default: { break; };
                };    
            } else {
                parentPopup = refLookup[set].current;
                popupReward = document.getElementById(`reward-${reformatSet}`);

                setCurrentPopupReward(reformatSet);
            };

            /// Create reward items
            for (let i = 0; i < amount; i++) {
                if (forcedPulls.length === 0) {
                    randomNumber = Math.random();
                };

                switch (set) {
                    case 'classic': {
                        spanReward = document.createElement('span');
                        calculateRate = (randomNumber <= 0.75)
                            ? 1
                            : (randomNumber <= 0.95)
                                ? 5
                                : 10;
                        rewardMoney += calculateRate;
                        spanReward.innerText = `$${calculateRate}`;
                        if (calculateRate === 10) {
                            createPon(spanReward);
                        };
                        popupReward.appendChild(spanReward);
                        break;
                    };
                    case 'genshin impact': {
                        if (forcedPulls.length !== 0) {
                            let forcedPull = forcedPulls.pop();
                            if (forcedPull.character === undefined) {
                                calculateReward = forcedPull.weapon;
                                randomItemType = 'weapon';
                            } else {
                                calculateReward = forcedPull.character;   
                                randomItemType = 'character';
                            };
                        } else {
                            calculateRate = (randomNumber <= .943)
                                ? 3
                                : (randomNumber <= .994)
                                    ? 4
                                    : 5;
                            let itemsStar = shopItems[set][type].items[calculateRate];
                            let keysItemsStar = Object.keys(itemsStar);
                            randomItemType = keysItemsStar[Math.floor(Math.random() * keysItemsStar.length)];
                            let randomItem = Math.floor(Math.random() * itemsStar[randomItemType].length);
                            calculateReward = itemsStar[randomItemType][randomItem];
                        };

                        reformatName = calculateReward.toLowerCase()
                            .replace(/\s/g, '-')
                            .replace(/'/g, '');

                        const imageArt = `/genshin-impact/${randomItemType}/${reformatName}-view.webp`;
                        const imageFace = `/genshin-impact/${randomItemType}/${reformatName}.webp`;
                        const validImage = await getValidImage(imageArt, imageFace);

                        if (amount > 1) {
                            spanReward = document.createElement('span');
                            spanReward.style.backgroundImage = `url(${validImage})`;

                            const elementName = document.createElement('span');
                            elementName.innerText = calculateReward;
                            spanReward.appendChild(elementName);

                            const elementStars = document.createElement('span');
                            const imageStar = document.createElement('img');
                            imageStar.src = '/genshin-impact/star.webp';
                            imageStar.alt = 'star';
                            imageStar.loading = 'lazy';
                            imageStar.decoding = 'async';

                            for (let i = 0; i < calculateRate; i++) {
                                elementStars.appendChild(imageStar.cloneNode());
                            };

                            spanReward.appendChild(elementStars);

                            if (calculateRate === 5){
                                createPon(spanReward);
                            };

                            popupReward.appendChild(spanReward);
                        } else {
                            const checkPon = popupReward.querySelectorAll('.pon');
                            if (checkPon.length !== 0) {
                                popupReward.removeChild(checkPon[0]);
                            };

                            const elementName = document.getElementById('reward-genshin-impact-name');
                            elementName.innerText = calculateReward;

                            const elementStars = document.getElementById('reward-genshin-impact-stars');
                            let starAmount = elementStars.childElementCount;
                            if (starAmount > calculateRate) {
                                let counter = starAmount - calculateRate;
                                do {
                                    elementStars.removeChild(elementStars.firstChild);
                                    counter--;
                                } while (counter > 0);
                            } else if (starAmount < calculateRate) {
                                const imageStar = document.createElement('img');
                                imageStar.src = '/genshin-impact/star.webp';
                                imageStar.alt = 'star';
                                imageStar.loading = 'lazy';
                                imageStar.decoding = 'async';
                                for (let i = 0; i < calculateRate - starAmount; i++) {
                                    elementStars.appendChild(imageStar.cloneNode());
                                };
                            };

                            const elementImage = document.getElementById('reward-genshin-impact-image');
                            elementImage.src = validImage;

                            if (calculateRate === 5){
                                createPon(popupReward);
                            };
                        };
                        break;
                    };
                    case 'honkai star rail': {
                        if (forcedPulls.length !== 0) {
                            let forcedPull = forcedPulls.pop();
                            if (forcedPull.character === undefined) {
                                calculateReward = forcedPull.cone;
                                randomItemType = 'cone';
                            } else {
                                calculateReward = forcedPull.character;   
                                randomItemType = 'character';
                            };
                        } else {
                            calculateRate = (randomNumber <= .943)
                                ? 3
                                : (randomNumber <= .994)
                                    ? 4
                                    : 5;
                            let itemsStar = shopItems[set][type].items[calculateRate];
                            let keysItemsStar = Object.keys(itemsStar);
                            randomItemType = keysItemsStar[Math.floor(Math.random() * keysItemsStar.length)];
                            let randomItem = Math.floor(Math.random() * itemsStar[randomItemType].length);
                            calculateReward = itemsStar[randomItemType][randomItem];
                        };

                        reformatName = calculateReward.toLowerCase()
                            .replace(/\s/g, '-')
                            .replace(/'/g, '');

                        const imageArt = `/honkai-star-rail/${randomItemType}/${reformatName}-view.webp`;
                        const imageFace = `/honkai-star-rail/${randomItemType}/${reformatName}.webp`;
                        const validImage = await getValidImage(imageArt, imageFace);

                        if (amount > 1) {
                            spanReward = document.createElement('span');
                            const elementInformation = document.createElement('span');
                            const elementStars = document.createElement('span');
                            const imageStar = document.createElement('img');
                            imageStar.src = '/honkai-star-rail/star.webp';
                            imageStar.alt = 'star';
                            imageStar.loading = 'lazy';
                            imageStar.decoding = 'async';
                            for (let i = 0; i < calculateRate; i++) {
                                elementStars.appendChild(imageStar.cloneNode());
                            };
                            elementInformation.appendChild(elementStars);
                            const elementName = document.createElement('span');
                            elementName.innerText = calculateReward;
                            elementInformation.appendChild(elementName);
                            spanReward.appendChild(elementInformation);
                            if (randomItemType === 'character') {
                                spanReward.style.backgroundImage = `url(${validImage})`;
                            } else {
                                const elementImage = document.createElement('img');
                                elementImage.src = validImage;
                                elementImage.alt = `${calculateReward} ${i}`;
                                elementImage.loading = 'lazy';
                                elementImage.decoding = 'async';
                                spanReward.appendChild(elementImage);
                            };
                            if (calculateRate === 5){
                                createPon(spanReward);
                            };
                            popupReward.appendChild(spanReward);
                        } else {
                            const checkPon = popupReward.querySelectorAll('.pon');
                            if (checkPon.length !== 0) {
                                popupReward.removeChild(checkPon[0]);
                            };
                            const elementName = document.getElementById('reward-honkai-star-rail-name');
                            elementName.innerText = calculateReward;
                            const elementStars = document.getElementById('reward-honkai-star-rail-stars');
                            let starAmount = elementStars.childElementCount;
                            if (starAmount > calculateRate) {
                                let counter = starAmount - calculateRate;
                                do {
                                    elementStars.removeChild(elementStars.firstChild);
                                    counter--;
                                } while (counter > 0);
                            } else if (starAmount < calculateRate) {
                                const imageStar = document.createElement('img');
                                imageStar.src = '/honkai-star-rail/star.webp';
                                imageStar.alt = 'star';
                                imageStar.loading = 'lazy';
                                imageStar.decoding = 'async';
                                for (let i = 0; i < calculateRate - starAmount; i++) {
                                    elementStars.appendChild(imageStar.cloneNode());
                                };
                            };
                            const elementImage = document.getElementById('reward-honkai-star-rail-image');
                            elementImage.src = validImage;
                            if (calculateRate === 5) {
                                createPon(popupReward);
                            };
                        };
                        break;
                    };
                    case 'touhou': {
                        if ((amount === 1) && (popupReward.hasChildNodes())) {
                            popupReward.innerHTML = '';
                        };

                        calculateRate =
                              (randomNumber <= .6)  ? 1
                            : (randomNumber <= .9)  ? 2
                            : (randomNumber <= .98) ? 3
                            : 4;
                            randomItemType = 'character';

                        let dataItems = shopItems[set][type].items[calculateRate];
                        let dataCharacters = dataItems.character;
                        let randomItem = Math.floor(Math.random() * dataCharacters.length);

                        calculateReward = dataCharacters[randomItem];
                        reformatName = calculateReward.toLowerCase()
                            .replace(/\s|\./g, '-')
                            .replace(/'/g, '');

                        const urlArt = `/touhou/character/${reformatName}.webp`;
                        const urlRarity = `/touhou/${dataItems.label.replace(/\s/g, '-')}.webp`;

                        spanReward = document.createElement('span');
                        spanReward.classList.add('reward-item-touhou');
                        
                        const imageReward = document.createElement('span');
                        imageReward.classList.add('reward-item-touhou-image', 'hidden');
                        imageReward.style.backgroundImage = `url(${urlArt})`;
                        spanReward.appendChild(imageReward);

                        const elementName = document.createElement('span');
                        elementName.classList.add('invisible');
                        elementName.innerText = calculateReward;
                        spanReward.appendChild(elementName);

                        const imageRarity = document.createElement('img');
                        imageRarity.classList.add('invisible');
                        imageRarity.src = urlRarity;
                        imageRarity.alt = 'rarity';
                        imageRarity.loading = 'lazy';
                        imageRarity.decoding = 'async';
                        spanReward.appendChild(imageRarity);

                        const timeoutImage = setTimeout(() => {
                            imageReward.classList.remove('hidden');
                            incrementTimeouts();
                        }, 1000);
                        const timeoutData = setTimeout(() => {
                            elementName.classList.remove('invisible');
                            imageRarity.classList.remove('invisible');
                            incrementTimeouts();
                        }, 3000);
                        refTimeoutsOpen.current.push(timeoutImage, timeoutData);
                        refTimeoutMaxCount.current = refTimeoutsOpen.current.length;

                        if (calculateRate === 4) createPon(spanReward);

                        popupReward.appendChild(spanReward);
                        break;
                    };
                    default: { break; };
                };

                if (inventoryAdd[set]?.[calculateReward]) {
                    inventoryAdd[set][calculateReward].count++;
                } else {
                    inventoryAdd[set] = {
                        [calculateReward]: {
                            type: randomItemType,
                            rate: calculateRate,
                            count: 1
                        },
                        ...inventoryAdd[set]
                    };
                };

                inventoryRecentAdd.push({
                    set: set,
                    name: calculateReward,
                    type: randomItemType,
                    rate: calculateRate
                });
                highestReward = (highestReward < calculateRate) ? calculateRate : highestReward;
            };

            /// Handle open animation
            switch (set) {
                case 'genshin impact':
                    calculateOpenAnimation = `${highestReward}star${(amount === 1)
                        ? '-single'
                        : ''}.mp4`;
                    break;
                case 'honkai star rail':
                    calculateOpenAnimation = `${highestReward}star.mp4`;
                    audioOpen.src = `/honkai-star-rail/open/${highestReward}star.ogg`;
                    audioReveal.src = `/honkai-star-rail/open/reveal-${highestReward}star.ogg`;
                    break;
                default: break;
            };

            if (calculateOpenAnimation.length === 0) {
                parentPopup.style.visibility = 'visible';
            } else {
                popupOpen.style.visibility = 'visible';
            };

            if (set !== 'classic') {
                setOpenAnimation(`/${set.replace(/\s/g, '-')}/open/${calculateOpenAnimation}`);
                setMoney((prev) => prev - (cost * amount));
                setInventory((prevInventory) => {
                    let combinedInventory = {
                        ...prevInventory
                    };

                    for (let set in inventoryAdd) {
                        for (let item in inventoryAdd[set]) {
                            if (combinedInventory[set]?.[item]) {
                                combinedInventory[set][item].count += inventoryAdd[set][item].count;
                            } else {
                                combinedInventory[set] = {
                                    ...combinedInventory[set],
                                    [item]: {
                                        type: inventoryAdd[set][item].type,
                                        rate: inventoryAdd[set][item].rate,
                                        count: inventoryAdd[set][item].count
                                    },
                                };
                            };
                        };
                    };

                    return combinedInventory;
                });

                inventoryRecent = [...inventoryRecentAdd, ...inventoryRecent].slice(0, maxInventoryRecent);
                refPlayer.current.seekTo(0);
            } else {
                setMoney((prev) => (prev - (cost * amount)) + rewardMoney);
            };
        };
    };

    const handleAudioEnded = () => {
        audioOpen.src = null;
        audioReveal.play()
            .catch(() => { console.log('No reveal audio to play'); });
    };

    const handlePopup = (what) => {
        if (refTimeoutsOpen.current.length > 0) {
            clearTimeouts();
            return;
        };

        what.current.style.visibility = 'hidden';

        if (what === refOpen) {
            setOpenAnimation('');

            audioOpen.src = null;
            audioReveal.play()
                .catch(() => { console.log('No reveal audio to play'); });

            refLookup[currentPopupReward.replace(/-/g, ' ')].current.style.visibility = 'visible';
            scrollY = window.scrollY;
            document.body.style.overflowY = 'scroll';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.position = 'fixed';
        } else {
            audioReveal.src = null;
            document.body.style.position = '';
            document.body.style.top = '';

            if (scrollY !== -1) {
                window.scrollTo({
                    top: scrollY
                });
            };

            scrollY = -1;
        };
    };

    const incrementTimeouts = () => {
        let newCount = refTimeoutCount.current + 1;

        if (newCount === refTimeoutMaxCount.current) {
            newCount = 0;
            refTimeoutMaxCount.current = 0;
            refTimeoutsOpen.current.length = 0;
        };

        refTimeoutCount.current = newCount;
    };

    const clearTimeouts = () => {
        refTimeoutsOpen.current.forEach(clearTimeout);
        refTimeoutMaxCount.current = 0;
        refTimeoutCount.current = 0;
        refTimeoutsOpen.current.length = 0;

        const allHidden = document.querySelectorAll('.hidden, .invisible');
        const allInvisible = document.querySelectorAll('.invisible');

        allHidden.forEach((hiddenElement) => {
            hiddenElement.classList.remove('hidden');
            hiddenElement.classList.add('no-transition');
            requestAnimationFrame(() => {
                hiddenElement.classList.remove('no-transition');
            });
        });
        allInvisible.forEach((invisibleElement) => {
            invisibleElement.classList.remove('invisible');
        });
    };

    const handleAnimationStart = () => {
        audioOpen.play()
            .catch(() => { console.log('No open audio to play'); });
        document.body.style.overflowY = 'hidden';
        if (!audioReveal.paused) {
            audioReveal.pause()
                .catch(() => { console.log('No reveal audio to pause'); });
        };
    };

    const handleEnded = () => {
        refOpen.current.style.visibility = 'hidden';
        refLookup[currentPopupReward.replace(/-/g, ' ')].current.style.visibility = 'visible';
    };

    const createPon = (element) => {
        const elementPon = document.createElement('img');
        elementPon.className = 'pon';
        elementPon.src = '/pon.webp';
        elementPon.alt = 'pon';
        elementPon.loading = 'lazy';
        elementPon.decoding = 'async';
        element.appendChild(elementPon);
    };

    const changeViewedItem = (item) => {
        setIsViewedItemVisible(true);
        setViewedItem(item);
    };

    const hideViewedItem = () => {
        setIsViewedItemVisible(false);
    };

    const storeData = () => {
        localStorage.setItem('money', refMoney.current);
        localStorage.setItem('inventory', JSON.stringify(refInventory.current));
    };

    return (
        <section className='app'>
            <section className='content'>
                <section ref={refOpen}
                    className='open'
                    onClick={() => handlePopup(refOpen)}>
                    <ReactPlayer ref={refPlayer}
                        url={openAnimation}
                        width={'100%'}
                        height={'100%'}
                        playing={true}
                        onStart={handleAnimationStart}
                        onEnded={() => handleEnded()}
                        onReady={() => {}}/>
                </section>
                <div ref={refRewardMultiple}
                    className='popup'
                    onClick={() => handlePopup(refRewardMultiple)}>
                    <div id='reward-multiple'
                        className='reward'></div>
                </div>
                <div ref={refRewardGenshinImpact}
                    className='popup'
                    onClick={() => handlePopup(refRewardGenshinImpact)}>
                    <section id='reward-genshin-impact'
                        className='reward'>
                        <div>
                            <span id='reward-genshin-impact-name'></span>
                            <span id='reward-genshin-impact-stars'></span>
                        </div>
                        <img id='reward-genshin-impact-image'
                            alt='reward'
                            loading='lazy'
                            decoding='async'/>
                    </section>
                </div>
                <div ref={refRewardHonkaiStarRail}
                    className='popup'
                    onClick={() => handlePopup(refRewardHonkaiStarRail)}>
                    <section id='reward-honkai-star-rail'
                        className='reward'>
                        <div>
                            <span id='reward-honkai-star-rail-name'></span>
                            <span id='reward-honkai-star-rail-stars'></span>
                        </div>
                        <img id='reward-honkai-star-rail-image'
                            alt='reward'
                            loading='lazy'
                            decoding='async'/>
                    </section>
                </div>
                <div ref={refRewardTouhou}
                    className='popup'
                    onClick={() => handlePopup(refRewardTouhou)}>
                    <section id='reward-touhou'
                        className='reward'></section>
                </div>
                <Money money={money}/>
                <Disclaimer/>
                <Hotbar references={references}
                    renderShopItems={renderShopItems}
                    shopItems={shopItems}
                    shopBanners={shopBanners}
                    inventory={inventory}
                    inventoryRecent={inventoryRecent}
                    handleItemClicked={handleItemClicked}/>
                <ViewItem viewedItem={viewedItem}
                    isViewedItemVisible={isViewedItemVisible}
                    hideViewedItem={hideViewedItem}/>
            </section>
            <Footer/>
        </section>
    );
};

export default memo(App);
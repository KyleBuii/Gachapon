import { memo, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Disclaimer from "./component/Disclaimer";
import Hotbar from "./component/Hotbar";
import Money from "./component/Money";

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
 */
const shopItems = {
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
    'genshin impact': {
        'wanderlust invocation': {
            items: {
                5: {
                    character: ['Albedo', 'Alhaitham', 'Arataki Itto', 'Arlecchino', 'Baizhu', 'Chasca', 'Chiori', 'Citlali', 'Clorinde', 'Cyno', 'Dehya', 'Diluc', 'Emilie', 'Eula', 'Furina', 'Ganyu', 'Hu Tao', 'Jean', 'Kaedehara Kazuha', 'Kamisato Ayaka', 'Kamisato Ayato', 'Keqing', 'Kinich', 'Klee', 'Lyney', 'Mavuika', 'Mona', 'Mualani', 'Nahida', 'Navia', 'Neuvillette', 'Nilou', 'Qiqi', 'Raiden Shogun', 'Sangonomiya Kokomi', 'Shenhe', 'Sigewinne', 'Tartaglia', 'Tighnari', 'Venti', 'Wanderer', 'Wriothesley', 'Xianyun', 'Xiao', 'Xilonen', 'Yae Miko', 'Yelan', 'Yoimiya', 'Zhongli'],
                    weapon: ['A Thousand Blazing Suns', 'A Thousand Floating Dreams', 'Absolution', 'Amos Bow', 'Aqua Simulacra', 'Aquila Favonia', 'Astral Vultures Crimson Plumage', 'Beacon Of The Reed Sea', 'Calamity Queller', 'Cashflow Supervision', 'Cranes Echoing Call', 'Crimson\'moon\'s Semblance', 'Elegy For The End', 'Engulfing Lightning', 'Everlasting Moonglow', 'Fang Of The Mountain King', 'Freedom Sworn', 'Haran Geppaku Futsu', 'Hunter\'s Path', 'Jadefall Splendor', 'Kagura\'s Verity', 'Key Of Khaj Nisut', 'Light Of Foliar Incision', 'Lost Prayer To The Sacred Winds', 'Lumidouce Elegy', 'Memory Of Dust', 'Mistsplitter Reforged', 'Peak Patrol Song', 'Polar Star', 'Primordial Jade Cutter', 'Primordial Jade Winged Spear', 'Redhorn Stonethresher', 'Silvershower Heartstrings', 'Skyward Atlas', 'Skyward Blade', 'Skyward Harp', 'Skyward Pride', 'Skyward Spine', 'Song Of Broken Pines', 'Splendor Of Tranquil Waters', 'Staff Of Homa', 'Staff Of The Scarlet Sands', 'Starcallers Watch', 'Summit Shaper', 'Surfs Up', 'The First Great Magic', 'The Unforged', 'Thundering Pulse', 'Tome Of The Eternal Flow', 'Tulaytullah\'s Remembrance', 'Uraku Misugiri', 'Verdict', 'Vortex Vanquisher', 'Wolf\'s Gravestone']
                },
                4: {
                    character: ['Amber', 'Barbara', 'Beidou', 'Bennett', 'Candace', 'Charlotte', 'Chevreuse', 'Chongyun', 'Collei', 'Diona', 'Dori', 'Faruzan', 'Fischl', 'Freminet', 'Gaming', 'Gorou', 'Kachina', 'Kaeya', 'Kaveh', 'Kirara', 'Kujou Sara', 'Kuki Shinobu', 'Lan Yan', 'Layla', 'Lisa', 'Lynette', 'Mika', 'Ningguang', 'Noelle', 'Ororon', 'Razor', 'Rosaria', 'Sayu', 'Sethos', 'Shikanoin Heizou', 'Sucrose', 'Thoma', 'Xiangling', 'Xingqiu', 'Xinyan', 'Yanfei', 'Yaoyao', 'Yun Jin'],
                    weapon: ['Akuoumaru', 'Alley Hunter', 'Dragon\'s Bane', 'Eye Of Perception', 'Favonius Codex', 'Favonius Greatsword', 'Favonius Lance', 'Favonius Sword', 'Favonius Warbow', 'Flower Wreathed Feathers', 'Fruitful Hook', 'Lion\'s Roar', 'Lithic Blade', 'Lithic Spear', 'Makhaira Aquamarine', 'Mitternachts Waltz', 'Mountain Bracing Bolt', 'Mouun\'s Moon', 'Portable Power Saw', 'Prospector Drill', 'Rainslasher', 'Range Gauge', 'Rust', 'Sacrificial Bow', 'Sacrificial Fragments', 'Sacrificial Greatsword', 'Sacrificial Sword', 'Sturdy Bone', 'The Alley Flash', 'The Bell', 'The Dockhands Assistant', 'The Flute', 'The Stringless', 'The Widsith', 'Wandering Evenstar', 'Wavebreaker\'s Fin', 'Waveriding Whirl', 'Wine And Song', 'Xiphos Moonlight']
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
                    character: ['Firefly', 'Rappa', 'Fu Xuan', 'Robin', 'Acheron', 'Fugue', 'Ruan Mei', 'Aglaea', 'Gepard', 'Seele', 'Argenti', 'Himeko', 'Silver Wolf', 'Aventurine', 'Huohuo', 'Sparkle', 'Bailu', 'Imbibitor Lunae', 'Sunday', 'Black Swan', 'Jade', 'Blade', 'Jiaoqiu', 'The Herta', 'Boothill', 'Jing Yuan', 'Topaz', 'Bronya', 'Jingliu', 'Welt', 'Clara', 'Kafka', 'Yanqing', 'Dr Ratio', 'Lingsha', 'Yunli', 'Feixiao', 'Luocha'],
                    cone: ['Moment Of Victory', 'Night Of Fright', 'A Grounded Ascent', 'Night On The Milky Way', 'Along The Passing Shore', 'Ninjutsu Inscription', 'An Instance Before A Gaze', 'Past Self In Mirror', 'Baptism Of Pure Thought', 'Patience Is All You Need', 'Before Dawn', 'Reforged Remembrance', 'Brighter Than The Sun', 'Sailing Towards A Second Life', 'But The Battle Isnt Over', 'Scent Alone Stays True', 'Dance At Sunset', 'She Already Shut Her Eyes', 'Earthly Escapade', 'Sleep Like The Dead', 'Echoes Of The Coffin', 'Something Irreplaceable', 'Flowing Nightglow', 'I Shall Be My Own Sword', 'The Unreachable Side', 'I Venture Forth To Hunt', 'Those Many Springs', 'In The Name Of The World', 'Time Waits For No One', 'In The Night', 'Time Woven Into Gold', 'Incessant Rain', 'Whereabouts Should Dreams Rest', 'Inherently Unjust Destiny', 'Worrisome Blissful', 'Into The Unreachable Veil', 'Yet Hope Is Priceless', 'Long Road Leads Home']
                },
                4: {
                    character: ['Hanya', 'Moze', 'Herta', 'Natasha', 'Tingyun', 'Arlan', 'Hook', 'Pela', 'Xueyi', 'Asta', 'Luka', 'Qingque', 'Yukong', 'Dan Heng', 'Lynx', 'Sampo', 'Gallagher', 'March 7th', 'Serval', 'Guinaifen', 'Misha', 'Sushang'],
                    cone: ['A Secret Vow', 'After The Charmony Fall', 'Boundless Choreo', 'Concert For Two', 'Dance Dance Dance', 'Day One Of My New Life', 'Dreams Montage', 'Eyes Of The Prey', 'Geniuses Greetings', 'Geniuses Repose', 'Good Night And Sleep Well', 'Indelible Promise', 'Landaus Choice', 'Make The World Clamor', 'Memories Of The Past', 'Only Silence Remains', 'Perfect Timing', 'Planetary Rendezvous', 'Poised To Bloom', 'Post Op Conversation', 'Resolution Shines As Pearls Of Sweat', 'Shadowed By Night', 'Shared Feeling', 'Subscribe For More', 'Swordplay', 'The Birth Of The Self', 'The Moles Welcome You', 'Trend Of The Universal Market', 'Under The Blue Sky']
                },
                3: {
                    cone: ['Data Bank', 'Passkey', 'Defense', 'Pioneering', 'Adversarial', 'Fine Fruit', 'Reminiscence', 'Amber', 'Hidden Shadow', 'Sagacity', 'Arrows', 'Loop', 'Shadowburn', 'Chorus', 'Mediation', 'Shattered Home', 'Collapsing Sky', 'Meshing Cogs', 'Cornucopia', 'Multiplication', 'Void', 'Darting Arrow', 'Mutual Demise']
                }
            },
            cost: 1
        }

    }
};
const audioOpen = new Audio(null);
const audioReveal = new Audio(null);
let timeoutNoMoney;
let currentPopupReward = '';
let inventoryRecent = [];

const App = () => {
    const [money, setMoney] = useState(10);
    const [inventory, setInventory] = useState({});
    // const [inventoryRecent, setInventoryRecent] = useState([]);
    const [openAnimation, setOpenAnimation] = useState('');
    const refMoney = useRef(money);
    const refInventory = useRef(inventory);
    useEffect(() => {
        window.addEventListener('beforeunload', storeData);
        audioOpen.addEventListener('ended', handleAudioEnded);
        const popupDisclaimer = document.getElementById('disclaimer');
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
    const renderShopItems = (element) => {
        const elementShopItems = document.getElementById(element);
        for (let set of Object.keys(shopItems)) {
            for (let capsule of Object.keys(shopItems[set])) {
                const elementCapsule = document.createElement('span');
                let reformatSet = set.replace(/\s/g, '-');
                elementCapsule.id = `capsule-${reformatSet}-${capsule}`;
                elementCapsule.className = `group-item ${reformatSet}`;
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
                elementCapsule.innerHTML += `<span>$${shopItems[set][capsule].cost}</span>`;
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
                    default:
                        buttonBuyText = 'Buy';
                        break;
                };
                buttonBuy.innerText = buttonBuyText;
                buttonBuy.onclick = () => handleBuy({
                    set: set,
                    type: capsule,
                    cost: shopItems[set][capsule].cost
                });
                const buttonBuyClone = buttonBuy.cloneNode();
                buttonBuyClone.innerText = `${buttonBuyText} x10`;
                buttonBuyClone.onclick = () => handleBuy({
                    set: set,
                    type: capsule,
                    cost: shopItems[set][capsule].cost,
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
    const handleBuy = ({ set, type, cost, amount = 1 }) => {
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
            const popupOpen = document.getElementById('open');
            const reformatSet = set.replace(/\s/g, '-');
            let spanReward, popupReward, randomNumber, calculateRate, calculateReward, randomItemType, reformatName;
            let calculateOpenAnimation = '';
            let rewardMoney = 0;
            let highestReward = 0;
            let forcedPulls = [];
            let inventoryAdd = {};
            let inventoryRecentAdd = [];
            /// Get type of popup (single or multi) and set forced pulls
            if ((amount > 1) || (set === 'classic')) {
                popupReward = document.getElementById('reward-multiple');
                popupReward.innerHTML = '';
                popupReward.className = `reward popup ${reformatSet}`;
                currentPopupReward = 'multiple';
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
                popupReward = document.getElementById(`reward-${reformatSet}`);
                currentPopupReward = reformatSet;
            };
            /// Create reward items
            for (let i = 0; i < amount; i++) {
                if (forcedPulls.length === 0) {
                    randomNumber = Math.random();
                };
                switch (set) {
                    case 'classic':
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
                    case 'genshin impact':
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
                        if (amount > 1) {
                            spanReward = document.createElement('span');
                            spanReward.style.backgroundImage = `url(/genshin-impact/reward/${randomItemType}/${reformatName}.webp)`;
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
                            elementImage.src = `/genshin-impact/reward/${randomItemType}/${reformatName}.webp`;
                            if (calculateRate === 5){
                                createPon(popupReward);
                            };
                        };
                        // inventoryAdd.push([set, randomItemType, calculateReward, calculateRate]);
                        break;
                    case 'honkai star rail':
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
                                spanReward.style.backgroundImage = `url(/honkai-star-rail/reward/${randomItemType}/${reformatName}.webp)`;
                            } else {
                                const elementImage = document.createElement('img');
                                elementImage.src = `/honkai-star-rail/reward/${randomItemType}/${reformatName}.webp`;
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
                            elementImage.src = `/honkai-star-rail/reward/${randomItemType}/${reformatName}.webp`;
                            if (calculateRate === 5) {
                                createPon(popupReward);
                            };
                        };
                        // inventoryAdd.push([set, randomItemType, calculateReward, calculateRate]);
                        break;
                    default: break;
                };
                if (inventoryAdd[set]?.calculateReward) {
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
                popupReward.style.visibility = 'visible';
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
                                const newItem = {
                                    [item]: {
                                        type: inventoryAdd[set][item].type,
                                        rate: inventoryAdd[set][item].rate,
                                        count: combinedInventory[set][item].count + 1
                                    },
                                };
                                delete combinedInventory[set][item];
                                combinedInventory[set] = {
                                    ...newItem,
                                    ...combinedInventory[set]
                                };
                            } else {
                                combinedInventory[set] = {
                                    [item]: {
                                        type: inventoryAdd[set][item].type,
                                        rate: inventoryAdd[set][item].rate,
                                        count: 1
                                    },
                                    ...combinedInventory[set]
                                };
                            };
                        };
                    };
                    inventoryAdd.length = 0;
                    return combinedInventory;
                });
                inventoryRecent = [...inventoryRecentAdd, ...inventoryRecent].slice(0, 15);
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
        const popup = document.getElementById(what);
        popup.style.visibility = 'hidden';
        if (what === 'open') {
            setOpenAnimation('');
            audioOpen.src = null;
            audioReveal.play()
                .catch(() => { console.log('No reveal audio to play'); });
            const popupReward = document.getElementById(`reward-${currentPopupReward}`);
            popupReward.style.visibility = 'visible';    
        } else {
            audioReveal.src = null;
        };
    };
    const handleAnimationStart = () => {
        audioOpen.play()
            .catch(() => { console.log('No open audio to play'); });
        if (!audioReveal.paused) {
            audioReveal.pause()
                .catch(() => { console.log('No reveal audio to pause'); });
        };
    };
    const handleEnded = () => {
        const popupOpen = document.getElementById('open');
        popupOpen.style.visibility = 'hidden';
        const popupReward = document.getElementById(`reward-${currentPopupReward}`);
        popupReward.style.visibility = 'visible';
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
    const storeData = () => {
        localStorage.setItem('money', refMoney.current);
        localStorage.setItem('inventory', JSON.stringify(refInventory.current));
    };
    return (
        <section>
            <section id='open'
                onClick={() => handlePopup('open')}>
                <ReactPlayer url={openAnimation}
                    width={'100%'}
                    height={'100%'}
                    playing={true}
                    onStart={handleAnimationStart}
                    onEnded={() => handleEnded()}
                    onReady={() => {}}/>
            </section>
            <section id='reward-multiple'
                className='reward popup'
                onClick={() => handlePopup('reward-multiple')}></section>
            <section id='reward-genshin-impact'
                className='reward popup'
                onClick={() => handlePopup('reward-genshin-impact')}>
                <div>
                    <span id='reward-genshin-impact-name'></span>
                    <span id='reward-genshin-impact-stars'></span>
                </div>
                <img id='reward-genshin-impact-image'
                    alt='reward'
                    loading='lazy'
                    decoding='async'/>
            </section>
            <section id='reward-honkai-star-rail'
                className='reward popup'
                onClick={() => handlePopup('reward-honkai-star-rail')}>
                <div>
                    <span id='reward-honkai-star-rail-name'></span>
                    <span id='reward-honkai-star-rail-stars'></span>
                </div>
                <img id='reward-honkai-star-rail-image'
                    alt='reward'
                    loading='lazy'
                    decoding='async'/>
            </section>
            <Money money={money}/>
            <Disclaimer/>
            <Hotbar
                renderShopItems={renderShopItems}
                inventory={inventory}
                inventoryRecent={inventoryRecent}/>
        </section>
    );
};

export default memo(App);
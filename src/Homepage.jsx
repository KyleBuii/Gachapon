import { memo, useEffect, useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa6';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

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
const shop = {
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
const walkthroughDialog = {
    0: {
        image: 'idle.webp',
        dialog: 'Hi! My name is Hachi.'
    },
    1: {
        image: 'eyes-close.webp',
        dialog: 'It\'s a pleasure to meet you.'
    },
    2: {
        image: 'idle.webp',
        dialog: 'I will guide you through this website so pay attention!'    
    },
    3: {
        image: 'idle.webp',
        dialog: 'First, lets move to the shop.'
    },
    4: {
        image: 'eyes-close.webp',
        dialog: 'Mhhhhhhhhhhhh.'
    },
    5: {
        image: 'smile.webp',
        dialog: 'There we go.'
    },
    6: {
        image: 'idle.webp',
        dialog: 'This is what we call a "capsule."'
    },
    7: {
        image: 'idle.webp',
        dialog: 'A capsule has an image, name, price, buy buttons, and a set.'
    },
    8: {
        image: 'eyes-close.webp',
        dialog: 'In order to buy a capsule you need to pay the price!'
    },
    9: {
        image: 'idle.webp',
        dialog: 'This is your wallet.'
    },
    10: {
        image: 'smile.webp',
        dialog: 'You are dirt poor!'
    },
    11: {
        image: 'idle.webp',
        dialog: 'Try buying 10 of the Red capsules.'
    },
    12: {
        image: 'smile.webp',
        dialog: 'Congratulations! You are slightly less poor now!'
    },
    13: {
        image: 'idle.webp',
        dialog: 'Click this to dismiss the rewards.'
    },
    14: {
        image: 'eyes-close.webp',
        dialog: 'That concludes the walkthrough!'
    },
    15: {
        image: 'idle.webp',
        dialog: 'Good luck and keep on gambling.'
    },
    16: {
        image: 'idle.webp',
        dialog: 'POOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN!'
    },
};
let currentPopupReward = '';
let currentWalkthroughStep = -1;
let timeoutNoMoney;
let lockWalkthrough = false;

const Homepage = () => {
    const [state, setState] = useState({
        money: 10,
        spent: {
            classic: 0
        },
        openAnimation: '',
        inventory: {}
    });
    const refState = useRef({
        money: state.money,
        inventory: state.inventory
    });
    const location = useLocation();
    useEffect(() => {
        window.addEventListener('beforeunload', storeData);
        audioOpen.addEventListener('ended', handleAudioEnded);
        const popupDisclaimer = document.getElementById('disclaimer');
        popupDisclaimer.style.visibility = 'visible';
        const elementShopItems = document.getElementById('shop-items');
        for (let set of Object.keys(shop)) {
            for (let capsule of Object.keys(shop[set])) {
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
                    <span>${capsule.replace(/^./, (char) => char.toUpperCase())
                        .replace(/\s(.)/g, (char) => char.toUpperCase())}</span>
                    <span>$${shop[set][capsule].cost}</span>
                `;
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
                    cost: shop[set][capsule].cost
                });
                const buttonBuyClone = buttonBuy.cloneNode();
                buttonBuyClone.innerText = `${buttonBuyText} x10`;
                buttonBuyClone.onclick = () => handleBuy({
                    set: set,
                    type: capsule,
                    cost: shop[set][capsule].cost,
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
        if (localStorage.getItem('money') !== null) {
            setState((prevState) => ({
                ...prevState,
                money: localStorage.getItem('money')
            }));
        };
        if (localStorage.getItem('inventory') !== null) {
            setState((prevState) => ({
                ...prevState,
                inventory: JSON.parse(localStorage.getItem('inventory'))
            }));
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
        return () => {
            storeData();
        };
    }, [location]);
    useEffect(() => {
        refState.current = {
            money: state.money,
            inventory: state.inventory    
        };
    }, [state.money, state.inventory]);
    const formatNumber = (number, digits) => {
        const lookup = [
            { value: 1,    symbol: ''  },
            { value: 1e3,  symbol: 'K' },
            { value: 1e6,  symbol: 'M' },
            { value: 1e9,  symbol: 'G' },
            { value: 1e12, symbol: 'T' },
            { value: 1e15, symbol: 'P' },
            { value: 1e18, symbol: 'E' }
        ];
        const regexDecimals = new RegExp(`^-?\\d+(?:\\.\\d{0,${digits}})?`);
        const regex = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
        const item = lookup.findLast(item => number >= item.value);
        return (item)
            ? (number / item.value)
                .toString()
                .match(regexDecimals)[0]
                .replace(regex, '')
                .concat(item.symbol)
            : '0';
    };
    const handlePopup = (what) => {
        const popup = document.getElementById(what);
        popup.style.visibility = 'hidden';
        if (what === 'open') {
            setState((prevState) => ({
                ...prevState,
                openAnimation: ''
            }));
            audioOpen.src = null;
            audioReveal.play()
                .catch(() => { console.log('No reveal audio to play'); });
            const popupReward = document.getElementById(`reward-${currentPopupReward}`);
            popupReward.style.visibility = 'visible';    
        } else {
            audioReveal.src = null;       
        };
    };
    const handleBuy = ({ set, type, cost, amount = 1 }) => {
        if ((set !== 'classic') && (state.money - (cost * amount) < 0)) {
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
            let openAnimation = '';
            let rewardMoney = 0;
            let highestReward = 0;
            let forcedPulls = [];
            let inventoryAdd = {};
            /// Get type of popup (single or multi) and set forced pulls
            if ((amount > 1) || (set === 'classic')) {
                popupReward = document.getElementById('reward-multiple');
                popupReward.innerHTML = '';
                popupReward.className = `reward popup ${reformatSet}`;
                currentPopupReward = 'multiple';
                switch (set) {
                    case 'genshin impact':
                    case 'honkai star rail': {
                        let types = Object.keys(shop[set][type].items[4]);
                        let randomType = types[Math.floor(Math.random() * types.length)];
                        let randomItem = shop[set][type].items[4][randomType][Math.floor(Math.random() * shop[set][type].items[4][randomType].length)];
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
                            let itemsStar = shop[set][type].items[calculateRate];
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
                            let itemsStar = shop[set][type].items[calculateRate];
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
                        ...inventoryAdd[set],
                        [calculateReward]: {
                            type: randomItemType,
                            rate: calculateRate,
                            count: 1
                        }
                    };
                };
                highestReward = (highestReward < calculateRate) ? calculateRate : highestReward;
            };
            /// Handle open animation
            switch (set) {
                case 'genshin impact':
                    openAnimation = `${highestReward}star${(amount === 1)
                        ? '-single'
                        : ''}.mp4`;
                    break;
                case 'honkai star rail':
                    openAnimation = `${highestReward}star.mp4`;
                    audioOpen.src = `/honkai-star-rail/open/${highestReward}star.ogg`;
                    audioReveal.src = `/honkai-star-rail/open/reveal-${highestReward}star.ogg`;
                    break;
                default: break;
            };
            if (openAnimation.length === 0) {
                popupReward.style.visibility = 'visible';
            } else {
                popupOpen.style.visibility = 'visible';
            };
            setState((prevState) => {
                let combinedInventory = {
                    ...prevState.inventory
                };
                for (let set in inventoryAdd) {
                    for (let item in inventoryAdd[set]) {
                        if (combinedInventory[set]?.item) {
                            combinedInventory[set][item].count++;
                        } else {
                            combinedInventory[set] = {
                                ...combinedInventory[set],
                                [item]: {
                                    type: inventoryAdd[set][item].type,
                                    rate: inventoryAdd[set][item].rate,
                                    count: 1
                                }
                            };
                        };
                    };
                };
                const newState = {
                    ...prevState,
                    money: (prevState.money - (cost * amount)) + rewardMoney,
                    openAnimation: `/${set.replace(/\s/g, '-')}/open/${openAnimation}`,
                    inventory: {
                        ...combinedInventory
                    }
                };
                inventoryAdd.length = 0;
                return newState;
            });
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
    const handleAudioEnded = () => {
        audioOpen.src = null;
        audioReveal.play()
            .catch(() => { console.log('No reveal audio to play'); });
    };
    const handleWalkthrough = () => {
        const elementPopup = document.getElementById('walkthrough-popup');
        const elementMoney = document.getElementById('money');
        const elementCapsuleClassic = document.getElementById('capsule-classic-red');
        const elementRewardMultiple = document.getElementById('reward-multiple');
        const elementWalkthroughText = document.getElementById('walkthrough-text');
        const elementWalkthroughImage = document.getElementById('walkthrough-image');
        const elementShopItems = document.getElementById('shop-items');
        if (!lockWalkthrough) {
            if (currentWalkthroughStep < Object.keys(walkthroughDialog).length - 1) {
                elementPopup.style.visibility = 'visible';
                elementPopup.style.opacity = '1';    
                currentWalkthroughStep++;
                elementWalkthroughText.innerText = walkthroughDialog[currentWalkthroughStep].dialog;
                elementWalkthroughImage.src = `/character/${walkthroughDialog[currentWalkthroughStep].image}`;
                switch (currentWalkthroughStep) {
                    case 4:
                        window.scrollTo({
                            top: 800,
                            left: 0,
                            behavior: 'smooth'
                        });
                        const cloneCapsuleClassic = elementCapsuleClassic.cloneNode(true);
                        cloneCapsuleClassic.id = 'clone-capsule';            
                        const cloneCapsuleButtons = cloneCapsuleClassic.querySelectorAll('button');
                        cloneCapsuleButtons[0].onclick = () => {};
                        cloneCapsuleButtons[1].onclick = () => {
                            lockWalkthrough = false;
                            handleWalkthrough();
                            elementCapsuleClassic.querySelectorAll('button')[1].click();
                        };
                        elementShopItems.prepend(cloneCapsuleClassic);
                        elementCapsuleClassic.style.display = 'none';
                        break;
                    case 6:
                        elementShopItems.firstChild.classList.add('highlight');
                        break;
                    case 9:
                        elementMoney.classList.add('highlight');
                        elementShopItems.firstChild.classList.remove('highlight');
                        break;
                    case 11:
                        lockWalkthrough = true;
                        elementShopItems.firstChild.classList.add('highlight');
                        elementShopItems.firstChild.style.pointerEvents = 'unset';
                        elementMoney.classList.remove('highlight');
                        break;
                    case 12:
                        elementCapsuleClassic.style.display = 'flex';
                        elementShopItems.removeChild(elementShopItems.firstChild);
                        break;
                    case 13:
                        elementRewardMultiple.classList.add('highlight');
                        elementRewardMultiple.style.pointerEvents = 'unset';
                        break;
                    case 14:
                        elementRewardMultiple.classList.remove('highlight');
                        break;
                    default: break;
                };
            } else {
                elementPopup.style.visibility = 'hidden';
                elementPopup.style.opacity = '0';    
                currentWalkthroughStep = 0;
            };
        };
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
        localStorage.setItem('money', refState.current.money);
        localStorage.setItem('inventory', JSON.stringify(refState.current.inventory));
    };
    return (
        <section>
            <section id='money'>${formatNumber(state.money, 2)}</section>
            <section className='influence'>
                <img src='/gamblers-quit.webp'
                    alt='gamblers quit'
                    decoding='async'></img>
                <img src='/successful-people.webp'
                    alt='successful people vs unsuccessul people'
                    decoding='async'></img>
                <div className='quote'>
                    <span className='flair'>~&#x2729;~</span>
                    <span>90% of gamblers <span className='aggressive'>QUIT</span> just before they hit it big</span>
                    <span className='flair'>~&#x2729;~</span>
                </div>
                <ReactPlayer className='player'
                    url={'https://www.youtube.com/watch?v=IPFiKEm-oNI'}
                    height={'25rem'}
                    width={'36.5rem'}
                    onReady={() => {}}
                    loop={true}
                    playing={true}
                    muted={true}
                    config={{
                        youtube: {
                            playerVars: {
                                fs: 0,
                                rel: 0,
                                iv_load_policy: 3,
                                controls: 0
                            },
                        }
                    }}/>
            </section>
            <section id='walkthrough-button'
                onClick={() => handleWalkthrough()}>Click for a walkthrough!</section>
            <section id='walkthrough-popup'
                onClick={() => handleWalkthrough()}>
                <div id='walkthrough-character'>
                    <span id='walkthrough-text'></span>
                    <img id='walkthrough-image'
                        src='/character/front.webp'
                        alt='walkthrough character'/>
                </div>
            </section>
            <fieldset className='group'>
                <legend>Shop</legend>
                <div id='shop-items'
                    className='group-items'></div>
            </fieldset>
            <section id='open'
                onClick={() => handlePopup('open')}>
                <ReactPlayer url={state.openAnimation}
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
            <fieldset className='group'>
                <legend>Inventory</legend>
                <SimpleBar style={{ maxHeight: 655 }}>
                    <div className='group-items inventory'>
                        {Object.entries(state.inventory).flatMap((set) => 
                            Object.entries(set[1]).map((item, index) => (
                                <span key={`item ${item[0]} ${index}`}
                                    className={`group-item inventory-item ${set[0].replace(/\s/g, '-')}-${item[1].rate}`}
                                    style={{ backgroundImage: `url(/${set[0].replace(/\s/g, '-')}/${item[1].rate}-bg.webp)` }}>
                                    <img src={`/${set[0].replace(/\s/g, '-')}/inventory/${item[1].type}/${item[0].toLowerCase().replace(/\s/g, '-').replace(/'/g, '')}.webp`}
                                        alt={`inventory item ${index}`}
                                        loading='lazy'
                                        decoding='async'/>
                                    <span>{item[0]}</span>
                                </span>
                            ))
                        )}
                    </div>
                </SimpleBar>
            </fieldset>
            <footer>
                <span>All product names, logos, characters, brands, trademarks and registered trademarks are property of their respective owners and unrelated to Gachapon</span>
                <div>
                    <span>Created by <a href='https://github.com/KyleBuii' referrerPolicy='no-referrer'>Kyle Bui</a></span>
                    &#8226;
                    <span className='icon-link'
                        onClick={() => { window.location.href = 'https://github.com/KyleBuii/Gachapon'; }}>
                        <FaGithub/>
                    </span>
                    &#8226;
                    <span>Attribution</span>
                </div>
            </footer>
        </section>
    );
};


export default memo(Homepage);
import { memo, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Disclaimer from "./component/Disclaimer";
import Footer from "./component/Footer";
import Hotbar from "./component/Hotbar";
import Money from "./component/Money";
import ViewItem from "./component/ViewItem";

/** Gacha Rates
 * Classic
 * $1  - 75%
 * $5  - 20%
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
 * 
 * Blue Archive
 * 1-star - 78.5%
 * 2-star - 18.5%
 * 3-star - 3%
 */
const shopBanners = {
    'genshin impact': 23,
    'honkai star rail': 65,
    'blue archive': 192,
};
const references = {
    'Genshin Impact': {
        author: '&#169; HoYoverse',
        url: 'https://genshin.hoyoverse.com/',
    },
    'Honkai: Star Rail': {
        author: '&#169; HoYoverse',
        url: 'https://hsr.hoyoverse.com/',
    },
    'Blue Archive': {
        author: '&#169; NEXON Games & Yostar',
        url: 'https://www.nexon.com/',
    },
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
        author: '&#169; Hoyoverse',
        url: 'https://genshin.hoyoverse.com/en/',
    },
    'Honkai Star Rail Warp Simulator': {
        author: 'Hantan21',
        url: 'https://github.com/Mantan21/HSR-Warp-Simulator',
    },
    'Honkai Star Rail Assets': {
        author: '&#169; Hoyoverse',
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
    const [shopItems, setShopItems] = useState({});
    const [money, setMoney] = useState(10);
    const [inventory, setInventory] = useState({});
    const [openAnimation, setOpenAnimation] = useState('');
    const [currentPopupReward, setCurrentPopupReward] = useState('');
    const [viewedItem, setViewedItem] = useState('');
    const [viewedCredit, setViewedCredit] = useState('');
    const [isViewedItemVisible, setIsViewedItemVisible] = useState(false);

    const refTimeoutsOpen = useRef([]);
    const refTimeoutMaxCount = useRef(0);
    const refTimeoutCount = useRef(0);
    const refMoney = useRef(money);
    const refInventory = useRef(inventory);
    const refPlayer = useRef(null);

    const refOpen = useRef(null);
    const refCurrentPopup = useRef(null);
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
        fetch('/shop-items.json')
            .then((response) => response.json())
            .then((json) => setShopItems(json))
            .catch((error) => console.error(error));

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

    const renderShopItems = (element, items) => {
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
                    case 'blue-archive':
                        buttonBuyText = '&#x2709; Recruit';
                        break;
                    default:
                        buttonBuyText = 'Buy';
                        break;
                };

                buttonBuy.innerHTML = buttonBuyText;
                buttonBuy.onclick = () => handleBuy({
                    set: set,
                    type: capsule,
                    cost: items[set][capsule].cost
                });

                const buttonBuyClone = buttonBuy.cloneNode();
                buttonBuyClone.innerHTML = `${buttonBuyText} x10`;
                buttonBuyClone.onclick = () => handleBuy({
                    set: set,
                    type: capsule,
                    cost: items[set][capsule].cost,
                    amount: 10
                });

                const elementCredit = document.createElement('span');
                const creditName = items[set][capsule]?.credit || set;
                const isCC = (set !== 'classic');
                elementCredit.innerHTML = `${isCC ? '&#169; ' : ''}${creditName.replace(/\b\w/g, c => c.toUpperCase())}`;

                elementCapsule.appendChild(buttonBuy);
                elementCapsule.appendChild(buttonBuyClone);
                elementCapsule.appendChild(elementCredit);
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

    const handleItemClicked = async (image, imageFallback, set) => {
        const validImage = await getValidImage(image, imageFallback);
        changeViewedItem(validImage);

        const creditName = shopItems[set][Object.keys(shopItems[set])[0]]?.credit || set;
        const isCC = (set !== 'classic');
        setViewedCredit(`${isCC ? '&#169; ' : ''}${creditName}`);
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
                refCurrentPopup.current = refRewardMultiple.current;
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
                refCurrentPopup.current = refLookup[set].current;
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
                            incrementTimeouts();
                            imageReward.classList.remove('hidden');
                        }, 1000 * ((i + 1) / 6));
                        const timeoutData = setTimeout(() => {
                            incrementTimeouts();
                            elementName.classList.remove('invisible');
                            imageRarity.classList.remove('invisible');
                        }, 2500 + (amount * 100));
                        refTimeoutsOpen.current.push(timeoutImage, timeoutData);

                        if (calculateRate === 4) createPon(spanReward);

                        popupReward.appendChild(spanReward);
                        break;
                    };
                    case 'blue archive': {
                        if ((amount === 1) && (popupReward.hasChildNodes())) {
                            popupReward.innerHTML = '';
                        };

                        calculateRate =
                              (randomNumber <= .785)  ? 1
                            : (randomNumber <= .97)  ? 2
                            : 3;
                        randomItemType = 'character';

                        let dataItems = shopItems[set][type].items[calculateRate];
                        let dataCharacters = dataItems.character;
                        let randomItem = Math.floor(Math.random() * dataCharacters.length);

                        calculateReward = dataCharacters[randomItem];
                        reformatName = calculateReward.toLowerCase()
                            .replace(/\s|\./g, '-')
                            .replace(/'/g, '');

                        const urlArt = `/blue-archive/character/${reformatName}/${reformatName}.webp`;
                        const urlArtBackup = `/blue-archive/character/${reformatName}/${reformatName}-view-000.webp`;
                        const validImage = await getValidImage(urlArt, urlArtBackup);
                        const urlRarity = `/blue-archive/star-${calculateRate}.webp`;
                        const bg = (validImage === urlArtBackup)
                            ? `url(${validImage}), url(/blue-archive/bg-star-${calculateRate}.webp)`
                            : `url(${validImage})`;

                        spanReward = document.createElement('span');
                        spanReward.style.backgroundImage = bg;
                        if (validImage === urlArtBackup) spanReward.classList.add('zoom');

                        const elementName = document.createElement('span');
                        elementName.innerText = calculateReward;
                        spanReward.appendChild(elementName);

                        const elementStars = document.createElement('span');
                        const imageStar = document.createElement('img');
                        imageStar.src = '/blue-archive/star.webp';
                        imageStar.alt = 'star';
                        imageStar.loading = 'lazy';
                        imageStar.decoding = 'async';

                        for (let i = 0; i < calculateRate; i++) {
                            elementStars.appendChild(imageStar.cloneNode());
                        };
                        spanReward.appendChild(elementStars);

                        if (calculateRate === 3) createPon(spanReward);

                        popupReward.appendChild(spanReward);
                        break;
                    }
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
            refTimeoutMaxCount.current = refTimeoutsOpen.current.length;

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
                case 'blue archive':
                    calculateOpenAnimation = 'open.mov';
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

        const allChildren = refCurrentPopup.current.children[0].children;

        for (const child of allChildren) {
            for (const subchild of child.children) {
                subchild.classList.remove('hidden', 'invisible');
                subchild.classList.add('no-transition');
                requestAnimationFrame(() => {
                    subchild.classList.remove('no-transition');
                });
            };
        };
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
                    viewedCredit={viewedCredit}
                    isViewedItemVisible={isViewedItemVisible}
                    hideViewedItem={hideViewedItem}/>
            </section>
            <Footer/>
        </section>
    );
};

export default memo(App);
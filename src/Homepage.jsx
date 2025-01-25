import { Component, memo } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import ReactPlayer from "react-player";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';


/// Gacha Rates
/*
Classic
$1 - 75%
$5 - 20%
$10 - 5%

Genshin Impact | Honkai Star Rail
3-star - 94.3%
4-star - 5.1%
5-star - 0.6%
*/


const shop = {
    "classic": {
        "red": {
            cost: 1
        },
        "pink": {
            cost: 1
        },
        "purple": {
            cost: 1
        },
        "dark blue": {
            cost: 1
        },
        "blue": {
            cost: 1
        },
        "light green": {
            cost: 1
        },
        "green": {
            cost: 1
        },
        "yellow": {
            cost: 1
        },
        "orange": {
            cost: 1
        },
        "grey": {
            cost: 1
        },
    },
    "genshin impact": {
        "wanderlust invocation": {
            items: {
                5: {
                    character: ["Albedo", "Alhaitham", "Arataki Itto", "Arlecchino", "Baizhu", "Chasca", "Chiori", "Citlali", "Clorinde", "Cyno", "Dehya", "Diluc", "Emilie", "Eula", "Furina", "Ganyu", "Hu Tao", "Jean", "Kaedehara Kazuha", "Kamisato Ayaka", "Kamisato Ayato", "Keqing", "Kinich", "Klee", "Lyney", "Mavuika", "Mona", "Mualani", "Nahida", "Navia", "Neuvillette", "Nilou", "Qiqi", "Raiden Shogun", "Sangonomiya Kokomi", "Shenhe", "Sigewinne", "Tartaglia", "Tighnari", "Venti", "Wanderer", "Wriothesley", "Xianyun", "Xiao", "Xilonen", "Yae Miko", "Yelan", "Yoimiya", "Zhongli"],
                    weapon: ["A Thousand Blazing Suns", "A Thousand Floating Dreams", "Absolution", "Amos Bow", "Aqua Simulacra", "Aquila Favonia", "Astral Vultures Crimson Plumage", "Beacon Of The Reed Sea", "Calamity Queller", "Cashflow Supervision", "Cranes Echoing Call", "Crimson'moon's Semblance", "Elegy For The End", "Engulfing Lightning", "Everlasting Moonglow", "Fang Of The Mountain King", "Freedom Sworn", "Haran Geppaku Futsu", "Hunter's Path", "Jadefall Splendor", "Kagura's Verity", "Key Of Khaj Nisut", "Light Of Foliar Incision", "Lost Prayer To The Sacred Winds", "Lumidouce Elegy", "Memory Of Dust", "Mistsplitter Reforged", "Peak Patrol Song", "Polar Star", "Primordial Jade Cutter", "Primordial Jade Winged Spear", "Redhorn Stonethresher", "Silvershower Heartstrings", "Skyward Atlas", "Skyward Blade", "Skyward Harp", "Skyward Pride", "Skyward Spine", "Song Of Broken Pines", "Splendor Of Tranquil Waters", "Staff Of Homa", "Staff Of The Scarlet Sands", "Starcallers Watch", "Summit Shaper", "Surfs Up", "The First Great Magic", "The Unforged", "Thundering Pulse", "Tome Of The Eternal Flow", "Tulaytullah's Remembrance", "Uraku Misugiri", "Verdict", "Vortex Vanquisher", "Wolf's Gravestone"]
                },
                4: {
                    character: ["Amber", "Barbara", "Beidou", "Bennett", "Candace", "Charlotte", "Chevreuse", "Chongyun", "Collei", "Diona", "Dori", "Faruzan", "Fischl", "Freminet", "Gaming", "Gorou", "Kachina", "Kaeya", "Kaveh", "Kirara", "Kujou Sara", "Kuki Shinobu", "Lan Yan", "Layla", "Lisa", "Lynette", "Mika", "Ningguang", "Noelle", "Ororon", "Razor", "Rosaria", "Sayu", "Sethos", "Shikanoin Heizou", "Sucrose", "Thoma", "Xiangling", "Xingqiu", "Xinyan", "Yanfei", "Yaoyao", "Yun Jin"],
                    weapon: ["Akuoumaru", "Alley Hunter", "Dragon's Bane", "Eye Of Perception", "Favonius Codex", "Favonius Greatsword", "Favonius Lance", "Favonius Sword", "Favonius Warbow", "Flower Wreathed Feathers", "Fruitful Hook", "Lion's Roar", "Lithic Blade", "Lithic Spear", "Makhaira Aquamarine", "Mitternachts Waltz", "Mountain Bracing Bolt", "Mouun's Moon", "Portable Power Saw", "Prospector Drill", "Rainslasher", "Range Gauge", "Rust", "Sacrificial Bow", "Sacrificial Fragments", "Sacrificial Greatsword", "Sacrificial Sword", "Sturdy Bone", "The Alley Flash", "The Bell", "The Dockhands Assistant", "The Flute", "The Stringless", "The Widsith", "Wandering Evenstar", "Wavebreaker's Fin", "Waveriding Whirl", "Wine And Song", "Xiphos Moonlight"]
                },
                3: {
                    weapon: ["Black Tassel", "Bloodtained Greatsword", "Cool Steel", "Debate Club", "Emerald Orb", "Ferrous Shadow", "Harbinger Of Dawn", "Magic Guide", "Raven Bow", "Sharpshooter's Oath", "Skyrider Sword", "Slingshot", "Thrilling Tales Of Dragon Slayers"]
                }
            },
            cost: 1
        }
    },
    "honkai star rail": {
        "stellar warp": {
            items: {
                5: {
                    character: ["Firefly", "Rappa", "Fu Xuan", "Robin", "Acheron", "Fugue", "Ruan Mei", "Aglaea", "Gepard", "Seele", "Argenti", "Himeko", "Silver Wolf", "Aventurine", "Huohuo", "Sparkle", "Bailu", "Imbibitor Lunae", "Sunday", "Black Swan", "Jade", "Blade", "Jiaoqiu", "The Herta", "Boothill", "Jing Yuan", "Topaz", "Bronya", "Jingliu", "Welt", "Clara", "Kafka", "Yanqing", "Dr Ratio", "Lingsha", "Yunli", "Feixiao", "Luocha"],
                    cone: ["Moment Of Victory", "Night Of Fright", "A Grounded Ascent", "Night On The Milky Way", "Along The Passing Shore", "Ninjutsu Inscription", "An Instance Before A Gaze", "Past Self In Mirror", "Baptism Of Pure Thought", "Patience Is All You Need", "Before Dawn", "Reforged Remembrance", "Brighter Than The Sun", "Sailing Towards A Second Life", "But The Battle Isnt Over", "Scent Alone Stays True", "Dance At Sunset", "She Already Shut Her Eyes", "Earthly Escapade", "Sleep Like The Dead", "Echoes Of The Coffin", "Something Irreplaceable", "Flowing Nightglow", "I Shall Be My Own Sword", "The Unreachable Side", "I Venture Forth To Hunt", "Those Many Springs", "In The Name Of The World", "Time Waits For No One", "In The Night", "Time Woven Into Gold", "Incessant Rain", "Whereabouts Should Dreams Rest", "Inherently Unjust Destiny", "Worrisome Blissful", "Into The Unreachable Veil", "Yet Hope Is Priceless", "Long Road Leads Home"]
                },
                4: {
                    character: ["Hanya", "Moze", "Herta", "Natasha", "Tingyun", "Arlan", "Hook", "Pela", "Xueyi", "Asta", "Luka", "Qingque", "Yukong", "Dan Heng", "Lynx", "Sampo", "Gallagher", "March 7th", "Serval", "Guinaifen", "Misha", "Sushang"],
                    cone: ["A Secret Vow", "After The Charmony Fall", "Boundless Choreo", "Concert For Two", "Dance Dance Dance", "Day One Of My New Life", "Dreams Montage", "Eyes Of The Prey", "Geniuses Greetings", "Geniuses Repose", "Good Night And Sleep Well", "Indelible Promise", "Landaus Choice", "Make The World Clamor", "Memories Of The Past", "Only Silence Remains", "Perfect Timing", "Planetary Rendezvous", "Poised To Bloom", "Post Op Conversation", "Resolution Shines As Pearls Of Sweat", "Shadowed By Night", "Shared Feeling", "Subscribe For More", "Swordplay", "The Birth Of The Self", "The Moles Welcome You", "Trend Of The Universal Market", "Under The Blue Sky"]
                },
                3: {
                    cone: ["Data Bank", "Passkey", "Defense", "Pioneering", "Adversarial", "Fine Fruit", "Reminiscence", "Amber", "Hidden Shadow", "Sagacity", "Arrows", "Loop", "Shadowburn", "Chorus", "Mediation", "Shattered Home", "Collapsing Sky", "Meshing Cogs", "Cornucopia", "Multiplication", "Void", "Darting Arrow", "Mutual Demise"]
                }
            },
            cost: 1
        }

    }
};
let currentPopupReward = "";
let timeoutNoMoney;
const audioOpen = new Audio(null);
const audioReveal = new Audio(null);


class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            money: 100,
            spent: {
                classic: 0
            },
            openAnimation: "",
            inventory: []
        };
        this.handleBuy = this.handleBuy.bind(this);
        this.storeData = this.storeData.bind(this);
    };
    formatNumber(number, digits){
        const lookup = [
            { value: 1,    symbol: ""  },
            { value: 1e3,  symbol: "K" },
            { value: 1e6,  symbol: "M" },
            { value: 1e9,  symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ];
        const regexDecimals = new RegExp(`^-?\\d+(?:\\.\\d{0,${digits}})?`);
        const regex = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
        const item = lookup.findLast(item => number >= item.value);
        return (item)
            ? (number / item.value)
                .toString()
                .match(regexDecimals)[0]
                .replace(regex, "")
                .concat(item.symbol)
            : "0";
    };    
    handleHotbar(what){
        const elementHotbar = document.querySelectorAll(".hotbar .active");
        if(elementHotbar.length === 1){
            elementHotbar[0].classList.remove("active");
        };
        const buttonHotbar = document.getElementById(`homepage-button-${what}`);
        buttonHotbar.classList.toggle("active");
    };
    handlePopup(what){
        const popup = document.getElementById(what);
        popup.style.visibility = "hidden";
        if(what === "open"){
            this.setState({
                openAnimation: ""
            });
            audioOpen.src = null;
            audioReveal.play()
                .catch(() => { console.log("No reveal audio to play"); });
            const popupReward = document.getElementById(`reward-${currentPopupReward}`);
            popupReward.style.visibility = "visible";    
        }else{
            audioReveal.src = null;       
        };
    };
    handleBuy({ set, type, cost, amount = 1 }){
        if((set !== "classic") && (this.state.money - (cost * amount) < 0)){
            const elementGif = document.createElement("img");
            elementGif.className = "no-money";
            elementGif.src = "/no-money.gif";
            elementGif.alt = "no money gif";
            let randomX = Math.random() * (Math.abs(window.innerWidth - 256)) + window.scrollX;
            let randomY = Math.random() * (Math.abs(window.innerHeight - 256)) + window.scrollY;
            elementGif.style.transform = `translate(${randomX}px, ${randomY}px)`;
            document.body.appendChild(elementGif);
            timeoutNoMoney = setTimeout(() => {
                document.body.removeChild(elementGif);
            }, 2000);
        }else{
            const popupOpen = document.getElementById("open");
            const reformatSet = set.replace(/\s/g, "-");
            let spanReward, popupReward, randomNumber, calculateRate, calculateReward, randomItemType, reformatName;
            let openAnimation = "";
            let rewardMoney = 0;
            let highestReward = 0;
            let forcedPulls = [];
            let inventoryAdd = [];
            /// Get type of popup (single or multi) and set forced pulls
            if((amount > 1) || (set === "classic")){
                popupReward = document.getElementById("reward-multiple");
                popupReward.innerHTML = "";
                popupReward.className = `reward popup ${reformatSet}`;
                currentPopupReward = "multiple";
                switch(set){
                    case "genshin impact":
                    case "honkai star rail":
                        let types = Object.keys(shop[set][type].items[4]);
                        let randomType = types[Math.floor(Math.random() * types.length)];
                        let randomItem = shop[set][type].items[4][randomType][Math.floor(Math.random() * shop[set][type].items[4][randomType].length)];
                        forcedPulls.push({
                            [randomType]: randomItem
                        });
                        calculateRate = 4;
                        break;
                    default: break;
                };    
            }else{
                popupReward = document.getElementById(`reward-${reformatSet}`);
                currentPopupReward = reformatSet;
            };
            /// Create reward items
            for(let i = 0; i < amount; i++){
                if(forcedPulls.length === 0){ randomNumber = Math.random(); };
                switch(set){
                    case "classic":
                        spanReward = document.createElement("span");
                        calculateRate = (randomNumber <= 0.75)
                            ? 1
                            : (randomNumber <= 0.95)
                                ? 5
                                : 10;
                        rewardMoney += calculateRate;
                        spanReward.innerText = `$${calculateRate}`;
                        if(calculateRate === 10){ this.createPon(spanReward); };
                        popupReward.appendChild(spanReward);
                        break;
                    case "genshin impact":
                        if(forcedPulls.length !== 0){
                            let forcedPull = forcedPulls.pop();
                            if(forcedPull.character === undefined){
                                calculateReward = forcedPull.weapon;
                                randomItemType = "weapon";
                            }else{
                                calculateReward = forcedPull.character;   
                                randomItemType = "character";
                            };
                        }else{
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
                            .replace(/\s/g, "-")
                            .replace(/'/g, "");
                        if(amount > 1){
                            spanReward = document.createElement("span");
                            spanReward.style.backgroundImage = `url(/genshin-impact/reward/${randomItemType}/${reformatName}.webp)`;
                            const elementName = document.createElement("span");
                            elementName.innerText = calculateReward;
                            spanReward.appendChild(elementName);
                            const elementStars = document.createElement("span");
                            const imageStar = document.createElement("img");
                            imageStar.src = "/genshin-impact/star.webp";
                            imageStar.alt = "star";
                            for(let i = 0; i < calculateRate; i++){
                                elementStars.appendChild(imageStar.cloneNode());
                            };
                            spanReward.appendChild(elementStars);
                            if(calculateRate === 5){ this.createPon(spanReward); };
                            popupReward.appendChild(spanReward);
                        }else{
                            const checkPon = popupReward.querySelectorAll(".pon");
                            if(checkPon.length !== 0){
                                popupReward.removeChild(checkPon[0]);
                            };
                            const elementName = document.getElementById("reward-genshin-impact-name");
                            elementName.innerText = calculateReward;
                            const elementStars = document.getElementById("reward-genshin-impact-stars");
                            let starAmount = elementStars.childElementCount;
                            if(starAmount > calculateRate){
                                let counter = starAmount - calculateRate;
                                do{
                                    elementStars.removeChild(elementStars.firstChild);
                                    counter--;
                                }while(counter > 0);
                            }else if(starAmount < calculateRate){
                                const imageStar = document.createElement("img");
                                imageStar.src = "/genshin-impact/star.webp";
                                imageStar.alt = "star";
                                for(let i = 0; i < calculateRate - starAmount; i++){
                                    elementStars.appendChild(imageStar.cloneNode());
                                };
                            };
                            const elementImage = document.getElementById("reward-genshin-impact-image");
                            elementImage.src = `/genshin-impact/reward/${randomItemType}/${reformatName}.webp`;
                            if(calculateRate === 5){ this.createPon(popupReward); };
                        };
                        inventoryAdd.push([set, randomItemType, calculateReward, calculateRate]);
                        break;
                    case "honkai star rail":
                        if(forcedPulls.length !== 0){
                            let forcedPull = forcedPulls.pop();
                            if(forcedPull.character === undefined){
                                calculateReward = forcedPull.cone;
                                randomItemType = "cone";
                            }else{
                                calculateReward = forcedPull.character;   
                                randomItemType = "character";
                            };
                        }else{
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
                            .replace(/\s/g, "-")
                            .replace(/'/g, "");
                        if(amount > 1){
                            spanReward = document.createElement("span");
                            const elementInformation = document.createElement("span");
                            const elementStars = document.createElement("span");
                            const imageStar = document.createElement("img");
                            imageStar.src = "/honkai-star-rail/star.webp";
                            imageStar.alt = "star";
                            for(let i = 0; i < calculateRate; i++){
                                elementStars.appendChild(imageStar.cloneNode());
                            };
                            elementInformation.appendChild(elementStars);
                            const elementName = document.createElement("span");
                            elementName.innerText = calculateReward;
                            elementInformation.appendChild(elementName);
                            spanReward.appendChild(elementInformation);
                            if(randomItemType === "character"){
                                spanReward.style.backgroundImage = `url(/honkai-star-rail/reward/${randomItemType}/${reformatName}.webp)`;
                            }else{
                                const elementImage = document.createElement("img");
                                elementImage.src = `/honkai-star-rail/reward/${randomItemType}/${reformatName}.webp`;
                                elementImage.alt = `${calculateReward} ${i}`;
                                spanReward.appendChild(elementImage);
                            };
                            if(calculateRate === 5){ this.createPon(spanReward); };
                            popupReward.appendChild(spanReward);
                        }else{
                            const checkPon = popupReward.querySelectorAll(".pon");
                            if(checkPon.length !== 0){
                                popupReward.removeChild(checkPon[0]);
                            };
                            const elementName = document.getElementById("reward-honkai-star-rail-name");
                            elementName.innerText = calculateReward;
                            const elementStars = document.getElementById("reward-honkai-star-rail-stars");
                            let starAmount = elementStars.childElementCount;
                            if(starAmount > calculateRate){
                                let counter = starAmount - calculateRate;
                                do{
                                    elementStars.removeChild(elementStars.firstChild);
                                    counter--;
                                }while(counter > 0);
                            }else if(starAmount < calculateRate){
                                const imageStar = document.createElement("img");
                                imageStar.src = "/honkai-star-rail/star.webp";
                                imageStar.alt = "star";
                                for(let i = 0; i < calculateRate - starAmount; i++){
                                    elementStars.appendChild(imageStar.cloneNode());
                                };
                            };
                            const elementImage = document.getElementById("reward-honkai-star-rail-image");
                            elementImage.src = `/honkai-star-rail/reward/${randomItemType}/${reformatName}.webp`;
                            if(calculateRate === 5){ this.createPon(popupReward); };
                        };
                        inventoryAdd.push([set, randomItemType, calculateReward, calculateRate]);
                        break;
                    default: break;
                };
                highestReward = (highestReward < calculateRate) ? calculateRate : highestReward;
            };
            /// Handle open animation
            switch(set){
                case "genshin impact":
                    openAnimation = `${highestReward}star${(amount === 1)
                        ? "-single"
                        : ""}.mp4`;
                    break;
                case "honkai star rail":
                    openAnimation = `${highestReward}star.mp4`;
                    audioOpen.src = `/honkai-star-rail/open/${highestReward}star.ogg`;
                    audioReveal.src = `/honkai-star-rail/open/reveal-${highestReward}star.ogg`;
                    break;
                default: break;
            };
            if(openAnimation.length === 0){
                popupReward.style.visibility = "visible";
            }else{
                popupOpen.style.visibility = "visible";
            };
            this.setState({
                money: (this.state.money - (cost * amount)) + rewardMoney,
                openAnimation: `/${set.replace(/\s/g, "-")}/open/${openAnimation}`,
                inventory: [...this.state.inventory, ...inventoryAdd]
            }, () => {
                inventoryAdd.length = 0;
            });
        };
    };
    handleAnimationStart(){
        audioOpen.play()
            .catch(() => { console.log("No open audio to play"); });
        if(!audioReveal.paused){
            audioReveal.pause()
                .catch(() => { console.log("No reveal audio to pause"); });
        };
    };
    handleEnded(){
        const popupOpen = document.getElementById("open");
        popupOpen.style.visibility = "hidden";
        const popupReward = document.getElementById(`reward-${currentPopupReward}`);
        popupReward.style.visibility = "visible";
    };
    handleAudioEnded(){
        audioOpen.src = null;
        audioReveal.play()
            .catch(() => { console.log("No reveal audio to play"); });
    };
    createPon(element){
        const elementPon = document.createElement("img");
        elementPon.className = "pon";
        elementPon.src = "/pon.webp";
        elementPon.alt = "pon";
        element.appendChild(elementPon);
    };
    storeData(){
        localStorage.setItem("money", this.state.money);
        localStorage.setItem("inventory", JSON.stringify(this.state.inventory));
    };
    componentDidMount(){
        window.addEventListener("beforeunload", this.storeData);
        audioOpen.addEventListener("ended", this.handleAudioEnded);
        const popupDisclaimer = document.getElementById("disclaimer");
        popupDisclaimer.style.visibility = "visible";
        const elementShopItems = document.getElementById("shop-items");
        for(let set of Object.keys(shop)){
            for(let capsule of Object.keys(shop[set])){
                const elementCapsule = document.createElement("span");
                let reformatSet = set.replace(/\s/g, "-");
                elementCapsule.className = `group-item ${reformatSet}`;
                elementCapsule.key = `${set} ${capsule}`;
                elementCapsule.innerHTML = `
                    <img src="/${reformatSet}/${capsule.replace(/\s/g, "-")}.webp"
                        alt="${set} ${capsule}"/>
                    <span>${capsule.replace(/^./, (char) => char.toUpperCase())
                        .replace(/\s(.)/g, (char) => char.toUpperCase())}</span>
                    <span>$${shop[set][capsule].cost}</span>
                `;
                const buttonBuy = document.createElement("button");
                let buttonBuyText;
                buttonBuy.className = "buy";
                switch(reformatSet){
                    case "genshin-impact":
                        buttonBuyText = "Wish";
                        break;
                    case "honkai-star-rail":
                        buttonBuyText = "Warp";
                        break;
                    default:
                        buttonBuyText = "Buy";
                };
                buttonBuy.innerText = buttonBuyText;
                buttonBuy.onclick = () => this.handleBuy({
                    set: set,
                    type: capsule,
                    cost: shop[set][capsule].cost
                });
                const buttonBuyClone = buttonBuy.cloneNode();
                buttonBuyClone.innerText = `${buttonBuyText} x10`;
                buttonBuyClone.onclick = () => this.handleBuy({
                    set: set,
                    type: capsule,
                    cost: shop[set][capsule].cost,
                    amount: 10
                });
                const elementSet = document.createElement("span");
                elementSet.innerText = set.replace(/\s(.)/g, (char) => char.toUpperCase())
                    .replace(/^./, (char) => char.toUpperCase());
                elementCapsule.appendChild(buttonBuy);
                elementCapsule.appendChild(buttonBuyClone);
                elementCapsule.appendChild(elementSet);
                elementShopItems.appendChild(elementCapsule);
            };
        };
        if(localStorage.getItem("money") !== null){
            this.setState({
                money: localStorage.getItem("money")
            });
        };
        if(localStorage.getItem("inventory") !== null){
            this.setState({
                inventory: JSON.parse(localStorage.getItem("inventory"))
            });
        };
    };
    componentWillUnmount(){
        window.removeEventListener("beforeunload", this.storeData);
        this.storeData();
        clearTimeout(timeoutNoMoney);
        audioOpen.src = "";
        audioReveal.src = "";
    };
    render(){
        return <section>
            <section id="disclaimer"
                className="popup"
                onClick={() => this.handlePopup("disclaimer")}>
                <span>x</span>
                <span>
                    <FaExclamationTriangle/>
                    Disclaimer
                    <FaExclamationTriangle/>
                </span>
                <span>All product names, logos, characters, brands, trademarks and registered trademarks are property of their respective owners and unrelated to Gachapon.</span>
            </section>
            <section id="money">${this.formatNumber(this.state.money, 2)}</section>
            <section className="hotbar">
                <div className="title">
                    <img src="/favicon-96x96.png"
                        alt="title icon"></img>
                    <img src="/title.webp"
                        alt="title"></img>
                </div>
                <div className="hotbar-buttons">
                    <button id="homepage-button-home"
                        className="active"
                        onClick={() => this.handleHotbar("home")}>Home</button>
                    <button id="homepage-button-shop"
                        onClick={() => this.handleHotbar("shop")}>Shop</button>
                    <button id="homepage-button-inventory"
                        onClick={() => this.handleHotbar("inventory")}>Inventory</button>
                    <button id="homepage-button-about"
                        onClick={() => this.handleHotbar("about")}>About</button>
                </div>
            </section>
            <section className="influence">
                <img src="/gamblers-quit.webp"
                    alt="gamblers quit"></img>
                <img src="/successful-people.webp"
                    alt="successful people vs unsuccessul people"></img>
                <ReactPlayer className="player"
                    url={"https://www.youtube.com/watch?v=IPFiKEm-oNI"}
                    height={"25rem"}
                    width={"36.5rem"}
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
            <fieldset className="group">
                <legend>Shop</legend>
                <SimpleBar style={{ maxHeight: 855 }}>
                    <div id="shop-items"
                        className="group-items"></div>
                </SimpleBar>
            </fieldset>
            <section id="open"
                onClick={() => this.handlePopup("open")}>
                <ReactPlayer url={this.state.openAnimation}
                    width={"100%"}
                    height={"100%"}
                    playing={true}
                    onStart={this.handleAnimationStart}
                    onEnded={() => this.handleEnded()}
                    onReady={() => {}}/>
            </section>
            <section id="reward-multiple"
                className="reward popup"
                onClick={() => this.handlePopup("reward-multiple")}></section>
            <section id="reward-genshin-impact"
                className="reward popup"
                onClick={() => this.handlePopup("reward-genshin-impact")}>
                <div>
                    <span id="reward-genshin-impact-name"></span>
                    <span id="reward-genshin-impact-stars"></span>
                </div>
                <img id="reward-genshin-impact-image"
                    alt="reward"/>
            </section>
            <section id="reward-honkai-star-rail"
                className="reward popup"
                onClick={() => this.handlePopup("reward-honkai-star-rail")}>
                <div>
                    <span id="reward-honkai-star-rail-name"></span>
                    <span id="reward-honkai-star-rail-stars"></span>
                </div>
                <img id="reward-honkai-star-rail-image"
                    alt="reward"/>
            </section>
            <fieldset className="group">
                <legend>Inventory</legend>
                <SimpleBar style={{ maxHeight: 655 }}>
                    <div className="group-items inventory">
                        {this.state.inventory.map((item, index) => {
                            return <span key={`item ${index}`}
                                className={`group-item inventory-item ${item[0].replace(/\s/g, "-")}-${item[3]}`}
                                style={{ backgroundImage: `url(/${item[0].replace(/\s/g, "-")}/${item[3]}-bg.webp)` }}>
                                <img src={`/${item[0].replace(/\s/g, "-")}/inventory/${item[1]}/${item[2].toLowerCase().replace(/\s/g, "-").replace(/'/g, "")}.webp`}/>
                                <span>{item[2]}</span>
                            </span>
                    })}
                    </div>
                </SimpleBar>
            </fieldset>
            <footer>
                <span>All product names, logos, characters, brands, trademarks and registered trademarks are property of their respective owners and unrelated to Gachapon</span>
                <div>
                    <span>Created by <a href="https://github.com/KyleBuii" referrerPolicy="no-referrer">Kyle Bui</a></span>
                    &#8226;
                    <span className="icon-link"
                        onClick={() => { window.location.href = "https://github.com/KyleBuii/Gachapon"; }}>
                        <FaGithub/>
                    </span>
                    &#8226;
                    <span>Attribution</span>
                </div>
            </footer>
        </section>
    };
};


export default memo(Homepage);
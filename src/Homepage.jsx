import { Component, memo } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import ReactPlayer from "react-player";


/// Gacha Rates
/*
Classic
$1 - 75%
$5 - 20%
$10 - 5%

Genshin Impact
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
        "beginners' wish": {
            items: {
                5: ["Keqing", "Mona", "Qiqi", "Diluc", "Jean"],
                4: ["Sucrose", "Chongyun", "Bennett", "Fischl", "Ningguang", "Xingqiu", "Beidou", "Xiangling", "Razor", "Barbara"],
                3: ["Slingshot", "Sharpshooter's Oath", "Raven Bow", "Jade Orb", "Thrilling Tales of Dragon Slayers", "Magic Guide", "Black Tassel", "Debate Club", "Bloodtainted Greatsword", "Ferrous Shadow", "Skyrider Sword", "Harbinger of Dawn", "Cool Steel"]
            },
            cost: 1
        },
        "moment of bloom": {
            items: {
                5: ["Hu-Tao"],
                4: ["Thoma", "Diona", "Sayu"]
            }
        }
    }
};
let currentPopupReward = "";


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
            const popupReward = document.getElementById(`reward-${currentPopupReward}`);
            popupReward.style.visibility = "visible";    
        };
    };
    handleBuy({ set, type, cost, amount = 1, force = false }){
        const popupOpen = document.getElementById("open");
        const reformatSet = set.replace(/\s/, "-");
        let spanReward, popupReward, randomNumber, calculateRate, calculateReward;
        let openAnimation = "";
        let rewardMoney = 0;
        let highestReward = 0;
        let forcedPulls = [];
        let inventoryAdd = [];
        if((amount > 1) || (set === "classic")){
            popupReward = document.getElementById("reward-multiple");
            popupReward.innerHTML = "";
            popupReward.className = `reward popup ${reformatSet}`;
            currentPopupReward = "multiple";
            switch(type){
                case "beginners' wish":
                    forcedPulls.push("Noelle");
                    calculateRate = 4;
                    break;
                default: break;
            };    
        }else{
            popupReward = document.getElementById(`reward-${reformatSet}`);
            currentPopupReward = reformatSet;
        };
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
                    popupReward.appendChild(spanReward);
                    break;
                case "genshin impact":
                    if(forcedPulls.length !== 0){
                        let forcedPull = forcedPulls.pop();
                        calculateReward = forcedPull;
                    }else{
                        calculateRate = (randomNumber <= .943)
                            ? 3
                            : (randomNumber <= .994)
                                ? 4
                                : 5;
                        highestReward = (highestReward < calculateRate) ? calculateRate : highestReward;
                        calculateReward = shop[set][type].items[calculateRate][Math.floor(Math.random() * shop[set][type].items[calculateRate].length)];
                    };
                    const reformatName = calculateReward.toLowerCase()
                        .replace(/\s/g, "-")
                        .replace(/'/g, "");
                    if(amount > 1){
                        spanReward = document.createElement("span");
                        if(calculateRate !== 3){ spanReward.classList.add("character"); };
                        spanReward.style.backgroundImage = `url(/genshin-impact/reward/${(calculateRate === 3) ? "weapon" : "character"}/${reformatName}.png)`;
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
                        popupReward.appendChild(spanReward);
                    }else{
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
                        elementImage.src = `/genshin-impact/reward/${(calculateRate === 3) ? "weapon" : "character"}/${reformatName}.png`;
                    };
                    inventoryAdd.push(calculateReward);
                    break;
                default: break;
            };
        };
        switch(set){
            case "genshin impact":
                openAnimation = `${((highestReward === 3) && (amount > 1)) ? 4 : highestReward}starwish${(amount === 1)
                    ? "-single"
                    : ""}.mp4`;
                break;
            default: break;
        };
        if(openAnimation.length === 0){
            popupReward.style.visibility = "visible";
        }else{
            popupOpen.style.visibility = "visible";
        };
        this.setState({
            money: (rewardMoney !== 0)
                ? (this.state.money - cost) + rewardMoney
                : this.state.money,
            openAnimation: `/${set.replace(/\s/, "-")}/open/${openAnimation}`,
            inventory: [...this.state.inventory, ...inventoryAdd]
        }, () => {
            inventoryAdd.length = 0;
        });
    };
    handleEnded(){
        const popupOpen = document.getElementById("open");
        popupOpen.style.visibility = "hidden";
        const popupReward = document.getElementById(`reward-${currentPopupReward}`);
        popupReward.style.visibility = "visible";
    };
    storeData(){
        localStorage.setItem("money", this.state.money);
        localStorage.setItem("inventory", JSON.stringify(this.state.inventory));
    };
    componentDidMount(){
        window.addEventListener("beforeunload", this.storeData);
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
                <div id="shop-items"
                    className="group-items"></div>
            </fieldset>
            <section id="open"
                onClick={() => this.handlePopup("open")}>
                <ReactPlayer id="test"
                    url={this.state.openAnimation}
                    width={"100%"}
                    height={"100%"}
                    playing={true}
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
            <fieldset className="group">
                <legend>Inventory</legend>
                <div className="group-items inventory">
                    {this.state.inventory.map((item, index) => {
                        return <span key={`item ${index}`}
                            className="group-item inventory-item">
                            <img src={`/inventory/${item.toLowerCase().replace(/\s/g, "-").replace(/'/g, "")}.png`}/>
                            <span>{item}</span>
                        </span>
                    })}
                </div>
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
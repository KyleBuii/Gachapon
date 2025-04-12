import { memo, useEffect } from 'react';
import ReactPlayer from 'react-player';

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
let currentWalkthroughStep = -1;
let lockWalkthrough = false;
let homepageShop = {};

const Homepage = ({ renderShopItems, shopItems, inventoryRecent }) => {
    useEffect(() => {
        let firstSetItemName = '';
        for (let set of Object.keys(shopItems)) {
            if (set === 'classic') {
                for (let i = 0; i < 3; i++) {
                    firstSetItemName = Object.keys(shopItems[set])[i];
                    homepageShop[set] = {
                        ...homepageShop[set],
                        [firstSetItemName]: {
                            ...shopItems[set][firstSetItemName]
                        }
                    };    
                };
            } else {
                firstSetItemName = Object.keys(shopItems[set])[0];
                homepageShop[set] = {
                    [firstSetItemName]: {
                        ...shopItems[set][firstSetItemName]
                    }
                };
            };
        };
        renderShopItems('shop-items', homepageShop);
    }, []);
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
                        cloneCapsuleClassic.scrollIntoView({
                            block: 'center'
                        });
                        const targetScroll = cloneCapsuleClassic.offsetTop - (window.innerHeight / 2 - cloneCapsuleClassic.getBoundingClientRect().height / 2);
                        document.body.style.position = 'fixed';
                        document.body.style.top = `-${targetScroll}px`;
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
                        document.body.style.position = 'unset';
                        document.body.style.top = 'unset';
                        elementCapsuleClassic.scrollIntoView({
                            block: 'center'
                        });
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
    return (
        <section>
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
            <fieldset className='group'>
                <legend>Recently Obtained</legend>
                <div className='group-items inventory'>
                    {inventoryRecent.map((item, index) => (
                        <span key={`item ${index}`}
                            className={`group-item inventory-item ${item.set.replace(/\s/g, '-')}-${item.rate}`}
                            style={{ backgroundImage: `url(/${item.set.replace(/\s/g, '-')}/${item.rate}-bg.webp)` }}>
                            <img src={`/${item.set.replace(/\s/g, '-')}/inventory/${item.type}/${item.name.toLowerCase().replace(/\s/g, '-').replace(/'/g, '')}.webp`}
                                alt={`inventory item ${index}`}
                                loading='lazy'
                                decoding='async'/>
                            <span className='item-name'>{item.name}</span>
                        </span>
                    ))}
                </div>
            </fieldset>
        </section>
    );
};


export default memo(Homepage);
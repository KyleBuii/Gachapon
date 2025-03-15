import { memo } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import About from "../About";
import Homepage from "../Homepage";
import Inventory from "../Inventory";
import Shop from "../Shop";

const Hotbar = ({ references, renderShopItems, homepageShop, shopItems, shopBanners, inventory, inventoryRecent = [] }) => {
    const handleHotbar = (what) => {
        const elementHotbar = document.querySelectorAll('.hotbar .active');
        if (elementHotbar.length === 1) {
            elementHotbar[0].classList.remove('active');
        };
        const buttonHotbar = document.getElementById(`homepage-button-${what}`);
        buttonHotbar.classList.toggle('active');
    };
    return (
        <BrowserRouter>
            <section className='hotbar'>
                <div className='title'>
                    <img src='/favicon-96x96.png'
                        alt='title icon'
                        decoding='async'></img>
                    <img src='/title.webp'
                        alt='title'
                        decoding='async'></img>
                </div>
                <div className='hotbar-buttons'>
                    <Link to='/'>
                        <button id='homepage-button-home'
                            className='active'
                            onClick={() => handleHotbar('home')}>Home</button>
                    </Link>
                    <Link to='/shop'>
                        <button id='homepage-button-shop'
                            onClick={() => handleHotbar('shop')}>Shop</button>
                    </Link>
                    <Link to='/inventory'>
                        <button id='homepage-button-inventory'
                            onClick={() => handleHotbar('inventory')}>Inventory</button>
                    </Link>
                    <Link to='/about'>
                        <button id='homepage-button-about'
                            onClick={() => handleHotbar('about')}>About</button>
                    </Link>
                </div>
            </section>
            <Routes>
                <Route
                    path='/'
                    element={<Homepage
                        renderShopItems={renderShopItems}
                        homepageShop={homepageShop}
                        inventoryRecent={inventoryRecent}/>}></Route>
                <Route
                    path='/shop'
                    element={<Shop
                        renderShopItems={renderShopItems}
                        shopItems={shopItems}
                        shopBanners={shopBanners}/>}></Route>
                <Route
                    path='/inventory'
                    element={<Inventory inventory={inventory}/>}></Route>
                <Route
                    path='/about'
                    element={<About references={references}/>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default memo(Hotbar);
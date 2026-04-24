import { memo, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Keyboard, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Shop = ({ renderShopItems, shopItems, shopBanners, inventoryRecent, handleItemClicked }) => {
    const [randomBanners, setRandomBanners] = useState({});
    const [selectedSet, setSelectedSet] = useState('classic');

    useEffect(() => {
        handleSidebarSet('classic');
        renderShopItems('shop-items', shopItems);

        let populateRandomBanners = {};

        Object.entries(shopBanners).forEach(([set, maxAmount]) => {
            let randomBanner = Math.floor(Math.random() * maxAmount) + 1;
            let creditName = shopItems[set][Object.keys(shopItems[set])[0]].credit;
            populateRandomBanners[creditName] = `/${set.replace(/\s/g, '-')}/banner/banner-${String(randomBanner).padStart(3, '0')}.webp`;
        });

        setRandomBanners(populateRandomBanners);
    }, []);

    const handleSidebarSet = (set) => {
        setSelectedSet(set);

        const elementHighlighted = document.querySelectorAll('.highlight-sidebar');
        if (elementHighlighted.length >= 0) {
            for (let capsule of elementHighlighted) {
                capsule.classList.remove('highlight-sidebar');
            };
        };

        const elementSet = document.querySelectorAll(`.${set.replace(/\s/g, '-')}`);
        for (let capsule of elementSet) {
            capsule.classList.add('highlight-sidebar');
        };
    };

    return (
        <section className='flex-column'
            style={{ margin: '1.5rem' }}>
            <Swiper className='image-corousel'
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                pagination={{
                    clickable: true,
                }}
                keyboard={{
                    enabled: true,
                }}
                grabCursor={true}
                modules={[Autoplay, Pagination, Keyboard]}>
                {Object.entries(randomBanners).map(([credit, banner]) => {
                    return <SwiperSlide key={`slide ${credit} ${banner}`}>
                        <img src={banner}
                            alt={`slide ${credit} ${banner}`}/>
                        <span className='slide-credit'>&#169; {credit}</span>
                    </SwiperSlide>
                })}
            </Swiper>
            <section className='flex-row'
                style={{ width: '100%', alignItems: 'flex-start' }}>
                <section className='flex-column'
                    style={{ gap: '1rem' }}>
                    <section className='sidebar'>
                        <span>Set</span>
                        {Object.keys(shopItems).sort().map((set) => {
                            return <div key={`checkbox ${set}`}
                                className='sidebar-option'>
                                <input id={`checkbox-${set}`}
                                    className='sidebar-input'
                                    name='capsule-set'
                                    type='radio'
                                    value={set}
                                    checked={selectedSet === set}
                                    onChange={(event) => handleSidebarSet(event.target.value)}/>
                                <label htmlFor={`checkbox-${set}`}>
                                    <span>{set.replace(/^.|\s./g, (char) => char.toUpperCase())}</span>
                                    <span>({Object.keys(shopItems[set]).length})</span>
                                </label>
                            </div>
                        })}
                    </section>
                    <section className='sidebar'>
                        <span>Recently Obtained</span>
                        <section className='sidebar-recently-obtained'>
                            {inventoryRecent.map((item, index) => {
                                let imageArt, imageFace;

                                switch (item.set) {
                                    case 'blue archive': {
                                        const itemName = item.name.toLowerCase().replace(/\s|\./g, '-').replace(/'/g, '');
                                        imageArt = `/${item.set.replace(/\s/g, '-')}/${item.type}/${itemName}/${itemName}-view-000.webp`;
                                        imageFace = `/${item.set.replace(/\s/g, '-')}/${item.type}/${itemName}/${itemName}.webp`;
                                        break;
                                    };
                                    default: {
                                        imageArt = `/${item.set.replace(/\s/g, '-')}/${item.type}/${item.name.toLowerCase().replace(/\s|\./g, '-').replace(/'/g, '')}-view.webp`;
                                        imageFace = `/${item.set.replace(/\s/g, '-')}/${item.type}/${item.name.toLowerCase().replace(/\s|\./g, '-').replace(/'/g, '')}.webp`;
                                        break;
                                    };
                                };

                                return <span key={`item ${index}`}
                                    className={`group-item inventory-item ${item.set.replace(/\s/g, '-')}-${item.rate}`}
                                    style={{ backgroundImage: `url(/${item.set.replace(/\s/g, '-')}/${item.rate}-bg.webp)` }}
                                    onClick={() => handleItemClicked(imageArt, imageFace, item.set)}>
                                    <img src={imageFace}
                                        alt={`inventory item ${index}`}
                                        loading='lazy'
                                        decoding='async'
                                        onError={(event) => {
                                            event.currentTarget.onerror = null;
                                            event.currentTarget.src = imageArt;
                                        }}/>
                                    <span className='item-name'>{item.name}</span>
                                </span>
                            })}
                        </section>
                    </section>
                </section>
                <section id='shop-items'
                    style={{ width: '100%', margin: '0 0 0 1rem' }}></section>
            </section>
        </section>
    );
};

export default memo(Shop);
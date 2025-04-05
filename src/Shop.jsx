import { memo, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Keyboard, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Shop = ({ renderShopItems, shopItems, shopBanners }) => {
    const [randomBanners, setRandomBanners] = useState([]);
    useEffect(() => {
        renderShopItems('shop-items');
        let populateRandomBanners = [];
        for (let set of Object.keys(shopBanners)) {
            let banners = shopBanners[set];
            populateRandomBanners.push(`/${set.replace(/\s/g, '-')}/banner/${banners[Math.floor(Math.random() * banners.length)]}.webp`);
        };
        setRandomBanners(populateRandomBanners);
    }, []);
    const handleSidebarSet = (set) => {
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
        <section className='flex-column'>
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
                {randomBanners.map((banner, index) => {
                    return <SwiperSlide key={`slide ${index}`}>
                        <img src={banner}
                            alt={`slide ${index}`}/>
                    </SwiperSlide>
                })}
            </Swiper>
            <section className='flex-row'
                style={{ alignItems: 'flex-start' }}>
                <section className='sidebar'>
                    <div className='sidebar-options'>
                        <span>Set</span>
                        {Object.keys(shopItems).map((set) => {
                            return <div key={`checkbox ${set}`}
                                className='sidebar-option'>
                                <input id={`checkbox-${set}`}
                                    name='capsule-set'
                                    type='radio'
                                    value={set}
                                    onClick={(event) => handleSidebarSet(event.target.value)}/>
                                <label htmlFor={`checkbox-${set}`}>
                                    <span>{set.replace(/^.|\s./g, (char) => char.toUpperCase())}</span>
                                    <span>({Object.keys(shopItems[set]).length})</span>
                                </label>
                            </div>
                        })}
                    </div>
                </section>
                <section id='shop-items'
                    className='group-items'></section>
            </section>
        </section>
    );
};

export default memo(Shop);
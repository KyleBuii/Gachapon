import { memo, useEffect } from "react";

const Shop = ({ renderShopItems }) => {
    useEffect(() => {
        renderShopItems('shop-items');
    }, []);
    return (
        <section className='flex-column'>
            {/* TOOD: Image Corousel */}
            <section></section>
            <section className='flex-row'>
                {/* TODO: Filter sidebar thing */}
                <section></section>
                <section className='flex-column'>
                    <input/>
                    {/* TOOD: Shop items */}
                    <section id='shop-items'
                        className='group-items'></section>
                </section>
            </section>
        </section>
    );
};

export default memo(Shop);
import { memo } from 'react';

const About = ({ references }) => {
    return (
        <section id='page-about'>
            <h1>About</h1>
            <p>Dive into the world of gacha with an ultimate pull simulator! Experience the thrill of pulling characters and weapons from your favorite games like Genshin Impact. Perfect for gacha enthusiasts!</p>
            <p>All product names, logos, characters, brands, trademarks and registered trademarks are property of their respective owners and unrelated to Gachapon.</p>
            <h1>Credit</h1>
            <div className='references'>
                {Object.keys(references).sort().map((name) => {
                    return <span className='flex-column'
                        key={name}>
                        <a href={references[name].url}>{name}</a>
                        <span>{references[name].author}</span>
                    </span>
                })}
            </div>
        </section>
    );
};

export default memo(About);
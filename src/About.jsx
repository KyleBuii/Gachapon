import { memo } from 'react';

const About = ({ references }) => {
    return (
        <section id='page-about'>
            <h1>About</h1>
            <p>Dive into the world of gacha with an ultimate pull simulator! Experience the thrill of pulling characters and weapons from your favorite games like Genshin Impact. Perfect for gacha enthusiasts!</p>
            <p>All product names, logos, characters, brands, trademarks and registered trademarks are property of their respective owners and unrelated to Gachapon.</p>
            <h1>References</h1>
            <ul>
                {Object.keys(references).sort().map((name) => {
                    return <li key={name}>
                        <a href={references[name].url}>{name}</a> - {references[name].author}
                    </li>
                })}
            </ul>
        </section>
    );
};

export default memo(About);
import { memo } from 'react';
import { FaGithub } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer>
            <span>All product names, logos, characters, brands, trademarks and registered trademarks are property of their respective owners and unrelated to Gachapon</span>
            <div>
                <span>Created by <a href='https://github.com/KyleBuii' referrerPolicy='no-referrer'>Kyle Bui</a></span>
                &#8226;
                <span className='icon-link'
                    onClick={() => { window.location.href = 'https://github.com/KyleBuii/Gachapon'; }}>
                    <FaGithub/>
                </span>
            </div>
        </footer>
    );
};

export default memo(Footer);